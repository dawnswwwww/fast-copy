import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('my-test')
export class TestElement extends LitElement {
  constructor() {
    super();
  };

  render() {
    return html`
      <div class="container">this is a container</div>
    `
  }
}