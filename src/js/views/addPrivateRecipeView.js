import View from "./View.js"

class AddPrivateRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindowAddRecipe();
    this._addHandlerHideWindowRecipe();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  // Otwarcie okna do dodania przepisu
  _addHandlerShowWindowAddRecipe() {
    this._buttonOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  // Zamknięcie okna do dodania przepisu
  _addHandlerHideWindowRecipe() {
    this._buttonClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerAddPrivateRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() { };
}

export default new AddPrivateRecipeView();
