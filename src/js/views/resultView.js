import View from "./View.js"

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _massageError = 'No recipes found for your query! Please try again !'
    _massege = '';

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');   
    }   
    _generateMarkupPreview(result) {
        console.log(result);
        return`
        <li class="preview">
            <a class="preview__link" href="#" data-url="${result.url}" >
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                </div>
            </a>
         </li>
        `
    }

    addHandlerResult(handler) {      
        const handleWithParentUrl = (element) => {
            if (element == null || element.className == "preview") {
                return;
            }
            if (element.className == "preview__link") {

                handler(element.dataset.url);
            }
            handleWithParentUrl(element.parentElement, handler);
        }
        this._parentElement.addEventListener('click', (e)=> {
            e.preventDefault();
            handleWithParentUrl(e.target, handler);
        });

    };
}

export default new ResultView();

