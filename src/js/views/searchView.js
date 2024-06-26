import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _data;

  getQuery() {
    const query = document.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.reset();
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
