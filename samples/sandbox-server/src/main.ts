import express from 'express';
import cors from "cors";
import reveal, { IRVUserContext, RevealOptions } from 'reveal-sdk-node';
import fs from "fs";
import { Readable } from 'stream';
import { unzip, zipSync, strFromU8, strToU8 } from 'fflate';
import path from 'path';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 5111;
const dashboardDirectory: string = 'samples/sandbox-server/src/dashboards';

const app = express();
app.use(cors());

const dashboardProvider = async (userContext: IRVUserContext | null, dashboardId: string) => {

	// Read the content of Dashboard.json from the file
	const dashboardJsonPath = `${dashboardDirectory}/${dashboardId}.json`;
	const dashboardJson = await fs.promises.readFile(dashboardJsonPath, 'utf-8');

	// Create a zip containing the Dashboard.json file
	const zipped = zipSync({
		'Dashboard.json': strToU8(dashboardJson), // Convert string to Uint8Array
	});

	// Convert the zipped data into a stream
	const zipStream = new Readable(); // Create an in-memory stream
	zipStream.push(Buffer.from(zipped)); // Push the zip content as buffer
	zipStream.push(null); // End the stream

	return zipStream as fs.ReadStream;
}

const dashboardStorageProvider = async (userContext: IRVUserContext | null, dashboardId: string, stream: fs.ReadStream) => {

	let dashboardJson: string | null = null;

	// Collect the stream data into a buffer
	const chunks: Buffer[] = [];
	stream.on('data', (chunk: any) => chunks.push(chunk));
	await new Promise((resolve, reject) => {
		stream.on('end', resolve);
		stream.on('error', reject);
	});

	// Concatenate the collected stream chunks into a single buffer
	const zipBuffer = Buffer.concat(chunks);

	// Unzip the buffer using fflate
	unzip(new Uint8Array(zipBuffer), async (err: any, files: any) => {
		if (err) {
			throw new Error('Error unzipping the file');
		}

		// Find and extract the Dashboard.json file
		const dashboardFile = files['Dashboard.json'];
		if (dashboardFile) {
			dashboardJson = strFromU8(dashboardFile); // Convert Uint8Array to string

			// Save the dashboardJson to a file on disk
			const savePath = `${dashboardDirectory}/${dashboardId}.json`; // File path to save JSON
			await fs.promises.writeFile(savePath, dashboardJson, 'utf-8');
		} else {
			console.error('Dashboard.json not found in the zip file');
		}
	});
}

const options: RevealOptions = {
	dashboardProvider: dashboardProvider,
	dashboardStorageProvider: dashboardStorageProvider,
}

app.use("/", reveal(options));

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
