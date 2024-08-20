import { RdashDocument } from '@revealbi/dom';
import './app.element.css';

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

      // const dashboard = await 
      // const revealView = new $.ig.RevealView(viewer);
      // revealView.dashboard = dashboard;

    }
  }
}
customElements.define('app-root', AppElement);
