import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render (data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
      this._parentElement.innerHTML = '';
  }

  spinner () {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>    
      `
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);  
  };

  error( message = this._massageError) {
    const markup = `
      <div class="error">
        <div class>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
          <p>${message}</p>
      </div> 
      `
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  message ( message = this._massege ) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
          <p>${message}</p>
      </div> 
      `
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}