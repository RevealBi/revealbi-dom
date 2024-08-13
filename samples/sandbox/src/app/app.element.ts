import { RdashDocument } from '@revealbi/dom';
import './app.element.css';
import { DashboardFactory } from '../dashboards/DashboardFactory';

declare const $: any;

$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");

export class AppElement extends HTMLElement {
  public static observedAttributes = [];
  document: RdashDocument | undefined;

  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = `<div id="viewer" style="height: 100%;">Hello, World!</div>`;

    const viewer = this.querySelector('#viewer');
    if (viewer) {

      //const dashboard = await $.ig.RVDashboard.loadDashboard("Sales");

      const dashboard = await DashboardFactory.createCustomDashboard().toRVDashboard();
      const revealView = new $.ig.RevealView(viewer);
      revealView.dashboard = dashboard;

    }
  }

  createDashboardViewerWithRVDashboard = async (name: string) => {
    const dashboard = await $.ig.RVDashboard.loadDashboard(name);
  }

  createCustomDashboard = async () => {
    const document = await DashboardFactory.createCustomDashboard();
  }
}
customElements.define('app-root', AppElement);
