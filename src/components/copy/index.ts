import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from 'lit/directives/ref.js';

import '../inputs/index.ts'

@customElement('my-copy')
export class MyCopy extends LitElement {
  static styles = css`
  :host {
    display: block;
  }
  input.readonly {
    outline: none;
    border: none;
  }

  input {
    background-color: #eeeeee88;
    padding: 2px;
    cursor: default;
    flex: 1;
  }

  .wrapper {
    font-size: 12px;
    width: 100%;
    display: flex;
  }

  .copyBtn {
    margin-left: 10px;
    width: 50px;
    font-size: 12px;
  }
  .edit-container {
    display: flex;
    flex: 1;
  }

  .edit-container:hover .edit {
    display: flex;
  }

  .edit {
    display: none;
    background-color: #5ca14f55;
    align-items: center;
    padding: 3px;
    box-sizing: border-box;
    font-size: 12px;
    width: 30px;
    cursor: pointer;
  }
  `

  @property({ attribute: false })
  updateFn: Function = () => {}

  @state()
  isEdit: boolean = false

  @property({ type: String })
  val: string = ''

  inputRef: any = createRef()

  copy() {
    this.inputRef?.value.select();
    document.execCommand('copy');
    this.inputRef?.value.blur()
  }

  edit() {
    this.isEdit = true
  }

  emitUpdate() {
    this.dispatchEvent(new CustomEvent('update'));
  }

  closeEdit() {
    this.isEdit = false
    this.updateFn(this.val)
  }

  isComposition = false

  handleInput ({target}) {
    if (this.isComposition) return
    this.val = target.value
  }

  handleCompositionstart() {
    this.isComposition = true
  }

  handleCompositionend(event) {
    this.isComposition = false
    this.handleInput(event)
  }

  render() {
    return html`
    <div class="wrapper ${this.isEdit ? 'isEdit' : ''}">
      <div class="edit-container" >
        <div @click=${this.edit} class="edit">编辑</div>
        <input 
         @blur=${this.closeEdit} 
         class=${!this.isEdit ? 'readonly' : ''} 
         ${ref(this.inputRef)} ?readonly=${!this.isEdit}  
         value=${this.val}
         @input=${this.handleInput}
         @compositionstart=${this.handleCompositionstart}
         @compositionend=${this.handleCompositionend}
         /></input>
      </div>
      <button class="copyBtn" @click=${this.copy} >复制</button>
    </div>
    `
  }
}