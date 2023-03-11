import ViewClass from "./view.js";
import icons from "url:../../img/icons.svg"; // loading svg icons

class Pagination extends ViewClass {
  _parentElement = document.querySelector(".pagination");

  //    //////////////////////////////////////////

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      console.log(btn);
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);
      handler(gotoPage);
    });
  }

  //    //////////////////////////////////////////
  _generateMarkUp() {
    // Dividing array of results by per page results to get the total number of pages to render
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages, "total number of pages");
    console.log(this._data, "is the actual data");
    console.log(this._data.resultsPerPage, "recipes per page");

    // page 1 , and there are some pages
    if (this._data.page === 1 && numPages > 1) {
      return `<button data-goto='${
        currentPage + 1
      }' class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
    }

    // last page
    if (this._data.page === numPages && numPages > 1) {
      return `<button data-goto='${
        currentPage - 1
      }' class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
    }
    // other page
    if (this._data.page < numPages) {
      return `<button data-goto='${
        currentPage - 1
      }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button> 
      <button data-goto='${
        currentPage + 1
      }' class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // page 1 , and there are NO some pages
    return " ";
  }
}
export default new Pagination();
