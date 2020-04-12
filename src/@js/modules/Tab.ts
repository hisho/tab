export default class Tab {
  tabContainerName: string;
  tabContainerElement:HTMLElement;
  tabButtons:HTMLElement[];
  tabContents:HTMLElement[];
  constructor(tabContainerName:string) {
    this.tabContainerName = tabContainerName;
    this.tabContainerElement = document.getElementById(this.tabContainerName);
    this.tabButtons = [...this.tabContainerElement.querySelectorAll<HTMLElement>('[role="tab"]')];
    this.tabContents = [...this.tabContainerElement.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
    this.init();
  }
  init() {
    this.tabButtons.forEach((tabButton, index) => {
      this.setAriaControls(tabButton,index);
      this.setAriaSelected(tabButton,this.isFirstItem(index));
      tabButton.addEventListener('click', () => this.click(tabButton,index));
    });
    this.tabContents.forEach((tabContent, index) => {
      this.setID(tabContent,index);
      this.setAriaHidden(tabContent,!this.isFirstItem(index));
    });
  }
  click(element:HTMLElement,index:number) {
    const isSelected = element.getAttribute('aria-selected') === 'true';
    if (isSelected) return;
    const hideTabButtons = this.tabButtons.filter((x,i) => i !== index);
    const hideTabContainers = this.tabContents.filter((x,i) => i !== index);
    this.show(element,this.tabContents[index]);
    this.hide(hideTabButtons,hideTabContainers);
  }
  isFirstItem(index:number):boolean {
    return index === 0;
  }
  show(tabButton:HTMLElement,tabContainer:HTMLElement) {
    this.setAriaSelected(tabButton,true);
    this.setAriaHidden(tabContainer,false);
  }
  hide(tabButtons:HTMLElement[],tabContainers:HTMLElement[]) {
    tabButtons.forEach(x => this.setAriaSelected(x,false));
    tabContainers.forEach(x => this.setAriaHidden(x,true));
  }
  setAriaControls(element:HTMLElement,value:(number|string)) {
    element.setAttribute('aria-controls', `${this.tabContainerName}-tab${value}`);
  }
  setID(element:HTMLElement,value:(number|string)) {
    element.setAttribute('id', `${this.tabContainerName}-tab${value}`);
  }
  setAriaHidden(element:HTMLElement,value:boolean) {
    element.setAttribute('aria-hidden', `${value}`);
  }
  setAriaSelected(element:HTMLElement,value:boolean) {
    element.setAttribute('aria-selected', `${value}`);
  }
}