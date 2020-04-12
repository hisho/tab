const ariaName = {
  expanded: 'aria-expanded',
  hidden: 'aria-hidden',
  selected: 'aria-selected',
};

//TODO
// リファクタリング
// jQuery依存の削除

export default function _Tab(): void {
  const tabContainerName = '[data-tablist]';
  const tabHeaderName = '[role="presentation"]';
  const tabContentName = '[role="tabpanel"]';

  const tabContainers = [...document.querySelectorAll<HTMLElement>(tabContainerName)];
  const tabHeaders = [...document.querySelectorAll<HTMLElement>(tabHeaderName)];
  const tabContents = [...document.querySelectorAll<HTMLElement>(tabContentName)];

  const tabContainerTabHeaders = tabContainers.map(x => [...x.querySelectorAll<HTMLElement>(tabHeaderName)]);
  const tabContainerTabContents = tabContainers.map(x => [...x.querySelectorAll<HTMLElement>(tabContentName)]);

  function toggleAriaSelected(element: HTMLElement): void {
    const isCurrentAriaSelected = element.getAttribute(ariaName.selected) === 'false';
    if (isCurrentAriaSelected) {
      element.setAttribute(ariaName.selected, 'true');
    } else {
      element.setAttribute(ariaName.selected, 'false');
    }
  }
  function toggleAriaHidden(element: HTMLElement): void {
    const isCurrentAriaHidden = element.getAttribute(ariaName.hidden) === 'false';
    if (isCurrentAriaHidden) {
      element.setAttribute(ariaName.hidden, 'true');
    } else {
      element.setAttribute(ariaName.hidden, 'false');
    }
  }

  function init(): void {
    tabContainers.forEach((tabContainer, tabContainerIndex) => {
      tabContainerTabHeaders[tabContainerIndex].forEach((tabContainerTabHeader, tabContainerTabHeaderIndex) => {
        if (tabContainerTabHeaderIndex === 0) {
          tabContainerTabHeader.setAttribute(ariaName.selected, 'true');
        } else {
          tabContainerTabHeader.setAttribute(ariaName.selected, 'false');
        }
      });
      tabContainerTabContents[tabContainerIndex].forEach((tabContainerTabContent, tabContainerTabContentIndex) => {
        if (tabContainerTabContentIndex === 0) {
          tabContainerTabContent.setAttribute(ariaName.hidden, 'false');
          tabContainerTabContent.style.display = 'block';
        } else {
          tabContainerTabContent.setAttribute(ariaName.hidden, 'true');
          tabContainerTabContent.style.display = 'none';
        }
      });
    });
    tabHeaders.forEach((x, i) => x.setAttribute('aria-controls', `tab${i}`));
    tabContents.forEach((x, i) => x.setAttribute('id', `tab${i}`));
  }

  function accordion(): void {
    tabContainers.forEach((tabContainer, tabContainerIndex) => {
      tabContainerTabHeaders[tabContainerIndex].forEach((tabContainerTabHeader, tabContainerTabHeaderIndex, tabContainerTabHeadersArray) => {
        tabContainerTabHeader.addEventListener('click', () => {
          const currentStatus = tabContainerTabHeader.getAttribute(ariaName.selected) === 'true';
          if (currentStatus) return;
          tabContainerTabHeadersArray.forEach(x => toggleAriaSelected(x));
          tabContainerTabContents[tabContainerIndex].forEach((tabContainerTabContent, tabContainerTabContentIndex) => {
            toggleAriaHidden(tabContainerTabContent);
            if (tabContainerTabHeaderIndex !== tabContainerTabContentIndex) {
              tabContainerTabContent.style.display = 'none';
            } else {
              tabContainerTabContent.style.display = 'block';
            }
          });
        });
      });
    });
  }
  if (tabContainers) {
    init();
    accordion();
  }
}
