import icons from "url:../../img/icons.svg"; // loading svg icons

export default class ViewClass {
  _data;

  // **********************************************************
  // *Method           Render                                 *
  // **********************************************************

  render(data) {
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderError();
    // If the data is existing, if its array and empty array
    this._data = data;
    const markupHTML = this._generateMarkUp();
    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markupHTML);
  }

  // **********************************************************
  // *Method                 Render error                     *
  // **********************************************************

  renderError(message = this._errorMessage) {
    const markupHTML = `<div class="error">
    <div>
    <svg>
    <use href="${icons}#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markupHTML);
  }

  // **********************************************************
  // *Method                 Render Success                   *
  // **********************************************************
  renderMessage(message = this._message) {
    const markupHTML = `<div class="message">
  <div>
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markupHTML);
  }

  // **********************************************************
  // *Method                 Render spinnner                  *
  // **********************************************************

  renderSpinner() {
    const markupHTML = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
  </div>`;
    // this._clear;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markupHTML);
  }

  // **********************************************************
  // *Method                 Clearing inner html              *
  // **********************************************************

  _clear() {
    this._parentElement.innerHTML = ""; // removed all inner html elements in recipeContainer so that other unrelated elements will not appear
  }
}
