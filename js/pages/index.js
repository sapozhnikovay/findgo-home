import { modal } from '../../blocks/modal/modal.js';
import { tablist } from '../../blocks/modal/tablist.js';

const buttonGoUp = document.getElementsByClassName('footer__button-up').item(0);

buttonGoUp.addEventListener('click', event => {
  window.scrollTo({ top: 0 });
});

const signInModal = modal('signInModal');
const signInTablist = tablist('signInTabs', {
  panelActiveClass: 'modal__tabpanel_show',
  tabActiveClass: 'modal__tab_active'
});

signInModal.onOpen = () => {
  signInTablist.openTab('tab-signin');
};
