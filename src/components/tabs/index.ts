import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';

const tabsTagName = 'lt-tabs'
const paneTagName = 'lt-tabs-pane'

// declare function onEditProp (type: 'update', index: number, value: string): void;
// declare function onEditProp (type: 'update', index: number, value: string): void

type EditType = 'add' | 'remove' | 'update'

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
      /* width: 100%; */
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
      min-height: 100%;
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

    .edit-plus {
      display: inline-block;
      height: 100%;
      user-select:none;
      width: 30px;
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

  @property()
  editable: boolean = false

  @property()
  onEdit: (type: EditType, index: number, value: string) => void = () => {}
  
  private childrenLength: number

  @state()
  private currentTab: number

  private contentsChildren: Array<HTMLElement>

  @state()
  private listState: Array<{editable: boolean, label: string}> = []

  private editTab (index: number) {
    this.listState[index].editable = true
    this.listState = [...this.listState]
  }

  connectedCallback() {
    super.connectedCallback();
    this.currentTab = this.defaultIndex
    this.changeContnet()
  }

  changeCurrentTab(tab: number, event: MouseEvent): void {
    this.currentTab = tab;
    (event.currentTarget as HTMLElement).scrollIntoView()
    this.changeContnet()
  }

  onTabEdit (index: number, value: string): void {
    value = value || this.listState[index].label
    this.listState[index].editable = false
    this.listState[index].label = value
    this.listState = [...this.listState]
    this.onEdit('update', index, value)
  }

  private renderTabs () {
    const styles = { width: this.tabWidth }
    return Array.from(this.children).map((ele: TabsPane, index: number) => 
      this.listState[index]?.editable 
        ? html`<my-inputs value=${ele.label} .onBlur=${(value: string) => this.onTabEdit(index, value)} />`
        : html`
          <span
            @click=${(event) => this.changeCurrentTab(index, event)} 
            class=${`${this.currentTab === index ? 'current-tab' : ''} tab-item`}
            style=${styleMap(styles)}
            @dblclick=${() => this.editable ? this.editTab(index) : () => {}}
          >
            ${this.listState[index]?.label}
          </span>`
      )
  }

  private changeContnet () {
    Array.from(this.children).forEach((ele: HTMLElement , index) => {
      if(index === this.currentTab) ele.style.display = ''
      else ele.style.display = 'none'
    })
  }

  handleSlotchange(e) {
    this.listState = Array.from(this.children).map((element) => ({
      editable: false,
      label: (element as any).label
    }))
  }

  render() {
    return html`
      <div class="tab-container">
        ${this.renderTabs()}
        ${this.editable ? html`<span class="edit-plus">123</span>` : null}
      </div>
      <div class="content-container">
        <slot @slotchange=${this.handleSlotchange}></slot>
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
  }
  
  render() {

    return html`
    <slot></slot>
    `
  } 
}