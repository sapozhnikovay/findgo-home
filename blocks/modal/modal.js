export class Modal {
  _rootElement = null;
  _isVisible = false;
  _backdropElement = null;
  _options = {}
  onOpen = null;
  onClose = null;

  constructor(targetElement, options = { backdrop: true, keyboard: true, show: false }) {
    this._rootElement = targetElement;
    this._options = options;

    /* Add listeners to open buttons */
    [...document.querySelectorAll('[data-toggle="modal"]')]
      .filter(element => element.getAttribute('data-target').slice(1) === targetElement.id)
      .forEach(element => {
        element.addEventListener('click', event => {
          event.preventDefault();
          this.open();
        });
      });

    /* Add listeners to close buttons */
    [...this._rootElement.querySelectorAll('[data-dismiss="modal"]')].forEach(element =>
      element.addEventListener('click', event => {
        event.preventDefault();
        this.close();
      })
    );

    if (options.show) {
      this.open();
    }

    if (options.keyboard) {
      document.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
          this.close();
        }
      });
    }
  }

  open = function() {
    if (this._options.backdrop) {
      this._backdropElement = document.createElement('div');
      this._backdropElement.classList.add('modal__backdrop', 'modal__backdrop_show');
      document.getElementsByTagName('body').item(0).appendChild(this._backdropElement);
    }

    this._rootElement.classList.add('modal_show');
    this._isVisible = true;
    if (typeof this.onOpen === 'function') {
      this.onOpen(this);
    }
  };

  close = function() {
    if (this._options.backdrop) {
      document.getElementsByTagName('body').item(0).removeChild(this._backdropElement);
    }

    this._rootElement.classList.remove('modal_show');
    this._isVisible = false;
    if (typeof this.onClose === 'function') {
      this.onClose(this);
    }
  };

  toggle = function() {
    this._rootElement.classList.toggle('modal_show');
    this._isVisible = !this._isVisible;
  };
}

export function modal(modalID) {
  const target = document.getElementById(modalID);
  if (!target) {
    console.error(`Modal with ${modalID} not found.`);
    return null;
  }

  return new Modal(target);
}
