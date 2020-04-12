// import _Tab from './modules/tab';
// _Tab();

class Tab {
  tabContainerName: string;
  tabContainerElement:HTMLElement;
  tabButtons:HTMLElement[];
  tabContents:HTMLElement[];
  constructor(test) {
    this.tabContainerName = test;
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
    console.log(element);
    console.log(index);
  }
  isFirstItem(index:number):boolean {
    return index === 0;
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

new Tab('test');