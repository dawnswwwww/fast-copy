import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from 'lit/directives/repeat.js';

import '../../components/copy'
import '../../components/tabs'

@customElement('main-home')
export class Home extends LitElement {

  constructor () {
    super();
  }

  static styles = css`
    :host {
      width: 350px;
      height: 200px;
      display: block;
      border-radius: 10px;
      box-shadow: 2px 2px 10px #00000011
    }

    .container::-webkit-scrollbar {
      color: lightgreen;
    }

    .container {
      height: 100%;
      width: 100%;
      padding: 5px;
      overflow-y: scroll;
      overflow-x: hidden;
      border-radius: 10px;
      box-sizing: border-box;
    }

    .list-item:not(:last-child) {
      margin-bottom: 10px;
    }

    .list-item {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
    }

    .list-item:hover .edit {
        display: block;
    }

    .copy-item {
      flex: 1
    }
    .remove {
      color: red;
      margin-left: 10px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-conents: center;
      font-size: 12px;
      cursor: pointer;
    }
    .remove .btn {
      display: inline-block;
      border-radius: 5px;
      padding: 2px 5px;
      cursor: pointer;
    }
    .remove .btn:hover {
      background-color: #cccccc44;
    }

    .add {
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: blue;
    }
    .add .btn {
      display: inline-block;
      width: 50%;
      border-radius: 10px;
      cursor: pointer;
    }

    .add .btn:hover {
      background-color: #cccccc44;
    }
  `

  getSync() {
    chrome?.storage?.sync.get(['copyList'], (result: any) =>  {
      console.log('Value is set to ' + result.copyList);
      this.copyList = result.copyList ?? [{}];
    });
  }

  setSync () {
    chrome?.storage?.sync.set({['copyList']: this.copyList}, function() {
      console.log('Value is set to ' + this.copyList);
    });
  }

  updateData (data, index) {
    // this.copyList[index] = data
    this.setSync()
  }

  connectedCallback () {
    super.connectedCallback();
    // this.getSync()
  }

  addOne() {
    // this.copyList = [...this.copyList, '']
    this.setSync()
    console.log(this.copyList)
  }

  removeOne(index) {
    this.copyList.splice(index, 1)
    this.copyList = [...this.copyList]
    this.setSync()
  }

  renderList() {
      return this.copyList.map((item: any, index: Number) => {
        console.log(item)
        return html`
          <lt-tabs-pane label="${item.name}">
          ${item.list.map((val: String, index: Number) => html`
            <div class="list-item">
              <my-copy .updateFn=${(data) => this.updateData(data, index)} class="copy-item" .val=${val} ></my-copy>
                <div class="remove" @click=${() => this.removeOne(index)} ><span class="btn">删除</span></div>
              </div>
            `)}
          </lt-tabs-pane>
        `
      })
    }

  @state()
  copyList: Array<any> = [{name: '标签1', list: ['asd']}, {name: '标签2', list: ['asd111']}, {name: '标签2', list: ['asd111']}, {name: '标签2', list: ['asd111']}]

  render() {
    return html`
        <div class="container">
          <lt-tabs tabWidth="100px" >
            ${this.renderList()}
          </lt-tabs>
        </div>
    `
  }
}