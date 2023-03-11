import ViewClass from "./view.js";
import icons from "url:../../img/icons.svg"; // loading svg icons

class ResultsView extends ViewClass {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found 🚨 Try again!";
  _message = "";

  _generateMarkUp() {
    console.log(this._data, "data");

    return this._data
      .map((result) => this._generateMarkUpView(result))
      .join(" ");
  }

  _generateMarkUpView(result) {
    return `<li class="preview">
    <a class="preview__link " href="#${result.id}">
    <figure class="preview__fig">
    <img src="${result.image}" alt="Test" />
    </figure>
    <div class="preview__data">
    <h4 class="preview__title">${result.title}</h4>
    <p class="preview__publisher">${result.publisher}</p>
    
    </div>
    </a>
    </li>`;
  }
}

export default new ResultsView();
