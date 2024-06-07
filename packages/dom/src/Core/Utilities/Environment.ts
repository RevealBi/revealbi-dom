const isBrowserEnvironment: boolean = typeof window !== 'undefined' && typeof window.document !== 'undefined';
//const isNodeEnvironment: boolean =  typeof process !== "undefined" &&  process.versions != null &&  process.versions.node != null;

export { isBrowserEnvironment };