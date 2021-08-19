import View from "./View.js"
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {

    _parentElement = document.querySelector('.bookmarks__list');
    _massageError = 'No bookmarks yet. Find a nice recipe and bookmarks'
    _massege = '';

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');   
    }
    
    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkupPreview(result) {

         return`
        <li class="preview">
            <a class="preview__link" href="#" data-url="${result.selfLink || ""}" data-id="${result.id}" >
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                </div>
                <div class="preview__user-generated ${
                    result.key ? true : 'hidden'
                    }">
                    <svg>
                    <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
            </a>
         </li>
        `
    }
 
    addHandlerBookmarkRecipeRender(handler) {
        const handleWithParentUrl = (element, handler) => {
            if (element == null || element.className == "preview") {
                return;
            }
            if (element.className == "preview__link") {
                handler(element.dataset.url, element.dataset.id);
            }
            handleWithParentUrl(element.parentElement, handler);
        };
        this._parentElement.addEventListener('click', (e)=> {
            e.preventDefault();
            handleWithParentUrl(e.target, handler);
        });
    };
}

export default new BookmarksView();

