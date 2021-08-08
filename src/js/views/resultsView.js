import { View } from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');

  _generateMarkup() {
    const markup = this._data.map(this._generateMarkupPreview).join('');

    return markup;
  }
  _generateMarkupPreview(recipe) {
    return `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src=${recipe.image_url} />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
        `;
  }
}

export default new ResultsView();
