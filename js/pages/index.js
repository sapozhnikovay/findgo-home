import { signInMode } from '../constants/constants.js';

const profileButton = document.getElementsByClassName('header__profile-link').item(0);
const buttonGoUp = document.getElementsByClassName('footer__button-up').item(0);

profileButton.addEventListener('click', event => {
  openSignInModal(signInMode.SIGN_IN);
  event.preventDefault();
});

const openSignInModal = function(mode) {};

buttonGoUp.addEventListener('click', event => {
  window.scrollTo({ top: 0 });
});
