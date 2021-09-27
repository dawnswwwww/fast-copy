import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';

const tabsTagName = 'lt-tabs'
const paneTagName = 'lt-tabs-pane'


@customElement(tabsTagName)
export class Tabs extends LitElement {

  constructor() {
    super();
    this.init()
  }

  static styles = css`
    :host {
      width:100%;
      height: 100%;
      display: block;
      display: flex;
      flex-direction: column;
    }

    .tab-container {
      min-width: 100%;
      width: auto;
      height: 30px;
      overflow-x: auto;
      overflow-y: hidden;
      white-space:nowrap;
    }

    .tab-container::-webkit-scrollbar {
      display: none;
    }

    .tab-item {
      background-color: #ececec;
      /* flex: 1; */
      text-align: center;
      height: 100%;
      display: inline-block;
      user-select: none;
    }

    .tab-item.current-tab {
      background-color: #ffffff;
      border-bottom: 2px solid #1c2e4d;
    }

    .content-container {
      flex: 1;
    }
    
  `

  init() {
    // this.filterChildren()
  }


  filterChildren () {
    const children = Array.from(this.childNodes)
    const filter = children.filter((ele: any) => {
      if (ele?.tagName?.toLowerCase() === paneTagName) return true;
      return false;
    })
    if (filter.length !== children.length)
    this.childrenLength = filter.length
    this.contentsChildren = filter as Array<HTMLElement>
  }

  @property({ type: Number })
  defaultIndex: number = 0

  @property({ type: String })
  tabWidth: String = ''
  
  private childrenLength: number

  @state()
  private currentTab: number

  private contentsChildren: Array<HTMLElement>


  connectedCallback() {
    super.connectedCallback();
    // init index
    this.currentTab = this.defaultIndex
    this.changeContnet()
  }

  changeCurrentTab(tab: number, event: MouseEvent): void {
    this.currentTab = tab;
    (event.currentTarget as HTMLElement).scrollIntoView()
    this.changeContnet()
  }

  private renderTabs () {
    const styles = { width: this.tabWidth }
    return Array.from(this.children).map((ele: TabsPane, index: number) => html`
      <span
        @click=${(event) => this.changeCurrentTab(index, event)} 
        class=${`${this.currentTab === index ? 'current-tab' : ''} tab-item`}
        style=${styleMap(styles)}
      >
        ${ele.label}
      </span>
    `)
  } 

  private changeContnet () {
    Array.from(this.children).forEach((ele: HTMLElement , index) => {
      if(index === this.currentTab) ele.style.display = ''
      else ele.style.display = 'none'
    })
  }

  render() {
    return html`
      <div class="tab-container">
        ${this.renderTabs()}
      </div>
      <div class="content-container">
        <slot></slot>
      </div>
  `
  }
}



@customElement(paneTagName)
export class TabsPane extends LitElement {

  @property({ type: String })
  public width: String = '20px'
  
  constructor() {
    super()
  }

  @property()
  public label = ''

  connectedCallback() {
    console.log(this.label)
  }
  
  render() {

    return html`
    <slot></slot>
    `
  } 
}