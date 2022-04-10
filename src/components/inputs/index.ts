import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from 'lit/directives/ref.js';


@customElement('my-inputs')
export class Myinputs extends LitElement {
  static styles = css`
  :host {
    height: 30px;
    max-width: 100%;
    color: red; 
  }
  .my-input {
    max-width: 100%;
  }
  `

  @property({type: 'string'})
  value: String  = ''
  val = this.value

  @property()
  onBlur: (value) => void

  public getValue () {
    return this.val
  }

  isComposition = false

  updateVal ({target}) {
    if (this.isComposition) return
    this.val = target.value
  }

  handleCompositionstart() {
    this.isComposition = true
  }

  handleCompositionend(event) {
    this.isComposition = false
    this.updateVal(event)
  }

  public select(){
    this.inputRef.value.select()
  }



  inputRef: any = createRef<HTMLInputElement>()

  render() {
    return html`
      <input
        class="my-input"
        ${ref(this.inputRef)} 
        type="text" 
        value=${this.value}
        @blur=${() => {
          this.onBlur?.(this.val)
        }}
        @input=${this.updateVal}
        @compositionstart=${this.handleCompositionstart}
        @compositionend=${this.handleCompositionend}
      />
    `
  }
}