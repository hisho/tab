import merge from "deepmerge";

interface TabOptions {
  id?: string
  firstShowIndex?: number,
  hash?: boolean
}

export default class Tab {
  tabContainerName: string;
  tabContainerElement:HTMLElement;
  tabButtons:HTMLElement[];
  tabContents:HTMLElement[];
  options: TabOptions;
  constructor(tabContainerName:string,options:TabOptions = {}) {
    this.tabContainerName = tabContainerName;
    const defaultOptions:TabOptions = {
      id: `${this.tabContainerName}-tab`,
      firstShowIndex: 0,
      hash: true
    };
    this.options = merge(defaultOptions, options);
    this.tabContainerElement = document.getElementById(this.tabContainerName);
    this.tabButtons = [...this.tabContainerElement.querySelectorAll<HTMLElement>('[role="tab"]')];
    this.tabContents = [...this.tabContainerElement.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
    this.init();
  }
  init() {
    if(this.options.hash) this.addHash(this.options.firstShowIndex);
    this.tabButtons.forEach((tabButton, index) => {
      this.setAriaControls(tabButton,index);
      this.setAriaSelected(tabButton,this.isFirstShowItem(index));
      tabButton.addEventListener('click', () => this.click(tabButton,index));
    });
    this.tabContents.forEach((tabContent, index) => {
      this.setID(tabContent,index);
      this.setAriaHidden(tabContent,!this.isFirstShowItem(index));
    });
  }
  click(element:HTMLElement,index:number) {
    const isSelected:boolean = element.getAttribute('aria-selected') === 'true';
    if (isSelected) return;
    if(this.options.hash) this.addHash(index);
    const hideTabButtons:HTMLElement[] = this.tabButtons.filter((x,i) => i !== index);
    const hideTabContainers:HTMLElement[] = this.tabContents.filter((x,i) => i !== index);
    this.show(element,this.tabContents[index]);
    this.hide(hideTabButtons,hideTabContainers);
  }
  isFirstShowItem(index:number):boolean {
    return index === this.options.firstShowIndex;
  }
  show(tabButton:HTMLElement,tabContainer:HTMLElement) {
    this.setAriaSelected(tabButton,true);
    this.setAriaHidden(tabContainer,false);
  }
  hide(tabButtons:HTMLElement[],tabContainers:HTMLElement[]) {
    tabButtons.forEach(x => this.setAriaSelected(x,false));
    tabContainers.forEach(x => this.setAriaHidden(x,true));
  }
  addHash(index:(number|string)) {
    index = String(index).padStart(2, '0');
    history.replaceState(undefined, undefined, `#${this.options.id}${index}`);
    //ヒストリーに残す場合の処理
    // window.location.hash = `#${this.options.id}${index}`;
  }
  setAriaControls(element:HTMLElement,value:(number|string)) {
    value = String(value).padStart(2, '0');
    element.setAttribute('aria-controls', `${this.options.id}${value}`);
  }
  setID(element:HTMLElement,value:(number|string)) {
    value = String(value).padStart(2, '0');
    element.setAttribute('id', `${this.options.id}${value}`);
  }
  setAriaHidden(element:HTMLElement,value:boolean) {
    element.setAttribute('aria-hidden', `${value}`);
  }
  setAriaSelected(element:HTMLElement,value:boolean) {
    element.setAttribute('aria-selected', `${value}`);
  }
}