export class Tablist {
  _rootElement = null;
  _tabs = [];
  _panelActiveClass = null;
  _tabActiveClass = null;
  _activeTab = {};

  constructor(targetElement, options = { panelActiveClass: 'active', tabActiveClass: 'active' }) {
    this._rootElement = targetElement;
    this._panelActiveClass = options.panelActiveClass;
    this._tabActiveClass = options.tabActiveClass;
    this._tabs = [...this._rootElement.querySelectorAll('[data-toggle="tab"')].map(element => ({
      id: element.id,
      element: element,
      target: element.getAttribute('aria-controls'),
      active: element.getAttribute('aria-selected') === 'true'
    }));

    this._activeTab = this._tabs.find(tab => tab.active);
    this._tabs.forEach(tab =>
      tab.element.addEventListener('click', event => {
        event.preventDefault();
        this.openTab(tab.id);
      })
    );
  }

  openTab(tabId) {
    /* Close previous active tab and tabpanel */
    const activeTargetPanel = document.getElementById(this._activeTab.target);
    if (activeTargetPanel) {
      activeTargetPanel.classList.remove(this._panelActiveClass);
      this._updateTabHeader(this._activeTab, false);
    }

    /* Open target tab and tabpanel */
    const targetTab = this._tabs.find(tab => tab.id === tabId);
    if (targetTab) {
      const targetPanel = document.getElementById(targetTab.target);
      if (targetPanel) {
        targetPanel.classList.add(this._panelActiveClass);
        this._updateTabHeader(targetTab, true);
        this._activeTab = targetTab;
      }
    }
  }

  _updateTabHeader(tab, isActive) {
    tab.element.setAttribute('aria-selected', isActive);
    tab.element.classList.toggle(this._tabActiveClass);
    tab.active = isActive;
  }
}

export function tablist(targetId, activeClass) {
  const target = document.getElementById(targetId);
  if (!target) {
    console.error(`Tablist with ${targetId} not found.`);
    return null;
  }

  return new Tablist(target, activeClass);
}
