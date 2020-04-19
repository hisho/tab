import merge from "deepmerge";

interface TabOptions {
  id?: string
  firstShowIndex?: number,
  hash?: boolean
}

class Tab {
  tabContainerName: string;
  tabContainerElement:HTMLElement;
  tabButtons:HTMLElement[];
  tabContents:HTMLElement[];
  idList:string[];
  currentHash: string;
  options: TabOptions;
  constructor(tabContainerName:string,options:TabOptions = {}) {
    this.tabContainerName = tabContainerName;
    const defaultOptions:TabOptions = {
      id: `${this.tabContainerName}-tab`,
      firstShowIndex: 0,
      hash: false
    };
    this.options = merge(defaultOptions, options);
    this.tabContainerElement = document.getElementById(this.tabContainerName);
    this.tabButtons = [...this.tabContainerElement.querySelectorAll<HTMLElement>('[role="tab"]')];
    this.tabContents = [...this.tabContainerElement.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
    this.idList = this.makeIdList();
    this.currentHash = window.location.hash.replace(/^#/,'');
    this.init();
  }
  init() {
    if(this.options.hash) this.initHash();
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
    const hasCurrentHash:number = this.idList.indexOf(this.currentHash);
    const firstShowIndex:number = hasCurrentHash !== -1 ? hasCurrentHash :this.options.firstShowIndex;
    return index === firstShowIndex;
  }
  show(tabButton:HTMLElement,tabContainer:HTMLElement) {
    this.setAriaSelected(tabButton,true);
    this.setAriaHidden(tabContainer,false);
  }
  hide(tabButtons:HTMLElement[],tabContainers:HTMLElement[]) {
    tabButtons.forEach(x => this.setAriaSelected(x,false));
    tabContainers.forEach(x => this.setAriaHidden(x,true));
  }
  initHash() {
    const currentHash:string = window.location.hash;
    if(currentHash === '') this.addHash(this.options.firstShowIndex);
  }
  addHash(index:number) {
    history.replaceState(undefined, undefined, `#${this.idList[index]}`);
    //ヒストリーに残す場合の処理
    // window.location.hash = `#${this.options.id}${index}`;
  }
  makeIdList() {
    return this.tabButtons.map((x,index) => {
      const currentIndex:string = String(index).padStart(2, '0');
      return `${this.options.id}${currentIndex}`;
    });
  }
  setAriaControls(element:HTMLElement,index:number) {
    element.setAttribute('aria-controls', `${this.idList[index]}`);
  }
  setID(element:HTMLElement,index:number) {
    element.setAttribute('id', `${this.idList[index]}`);
  }
  setAriaHidden(element:HTMLElement,value:boolean) {
    element.setAttribute('aria-hidden', `${value}`);
  }
  setAriaSelected(element:HTMLElement,value:boolean) {
    element.setAttribute('aria-selected', `${value}`);
  }
}

export default Tab;