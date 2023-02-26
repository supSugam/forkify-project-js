import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1)
      return this._generateButton(curPage + 1, 'next');

    if (curPage === numPages && numPages > 1)
      return this._generateButton(curPage - 1, 'prev');

    if (curPage < numPages) return this._generateButton(curPage);
    else return `End of Results!`;
  }

  //next, prev
  _generateButton(targetPageNum, btnType = 'both') {
    if (btnType === 'prev')
      return this._generateMarkupButton(targetPageNum, 'prev');
    if (btnType === 'next')
      return this._generateMarkupButton(targetPageNum, 'next');
    if (btnType === 'both') {
      let markup = this._generateMarkupButton(targetPageNum - 1, 'prev');
      markup += this._generateMarkupButton(targetPageNum + 1, 'next');
      return markup;
    }
  }

  _generateMarkupButton(targetPageNum, btnType) {
    return `
    <button data-goto="${targetPageNum}" class="btn--inline pagination__btn--${btnType}">
            ${
              btnType === 'next'
                ? `
            <span>Page ${targetPageNum}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
                    btnType === 'next' ? 'right' : 'left'
                  }"></use>
                    </svg>
            `
                : `
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
                    btnType === 'next' ? 'right' : 'left'
                  }"></use>
            </svg>
            <span>Page ${targetPageNum}</span>`
            }
    </button>
`;
  }
}

export default new PaginationView();
