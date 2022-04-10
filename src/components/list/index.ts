import { LitElement, css, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("d-list")
export class DList extends LitElement {
  constructor() {
    super();
  }

  @property()
  datasSource: unknown[];

  @property()
  renderItem: () => TemplateResult;

  @property()
  editable: boolean = false;

  @property()
  onUpdate: (updatedData: unknown[]) => void;

  public delete(index: number): void {
    const temp = [...this.datasSource]
    temp.splice(index, 1)
    this.onUpdate?.(temp);
  }

  @state()
  list: unknown[] = [];


  render() {
    return html`
      <div class="container">
        <div>${this.datasSource?.map?.((item, index: number) =>
          html`<div class="list-item">
                ${this.renderItem?.()}
                ${this.editable ? html`<div class="edit" @click=${() => this.delete(index)}>x</div>` : ''}
              </div>`
        )}</div>
      </div>
    `;
  }
}
