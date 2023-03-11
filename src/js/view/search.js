class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    if (!query) {
      alert("Enter product or recipe name");
      return;
    }
    this._clearInput();
    console.log(query, "query");
    return query;
  }

  _clearInput() {
    return (this._parentElement.querySelector(".search__field").value = "");
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
