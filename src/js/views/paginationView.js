import icons from 'url:../../img/icons.svg';
import { View } from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    //     page: 2
    // query: "pizza"
    // results: (59) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // searchResultsNumber: 10
    // searchResultsPerPage:

    const numPages = Math.ceil(
      this._data.results.length / this._data.searchResultsNumber
    );

    const curPage = this._data.page;

    //   cases

    //2.results are on page 1 but they are other pages
    if (curPage === 1 && numPages > curPage) {
      return `
            <button data-goto = "${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
          `;
    }
    //3.other pages apart from 1 and last page
    if (curPage !== 1 && numPages > curPage) {
      return `
            <button data-goto = "${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            <button data-goto = "${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }
    //4.last page
    if (curPage === numPages) {
      return `
            <button data-goto = "${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
          `;
    }
    //1. when results are only page long
    return '';
  }
  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
}

export default new PaginationView();
