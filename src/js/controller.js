// **********************************************************
// *                   Imports                              *
// **********************************************************
import searchView from "./view/search.js";
import recipeView from "./view/views.js";
import resultsView from "./view/results.js";
import pagination from "./view/pagination.js";
import * as model from "./model.js";
import "core-js/stable"; // pollyfilling all in general to be suitable for old browsers
import "regenerator-runtime/runtime"; // making asyncs works

// HOT MODULE
// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector(".recipe");

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log("Testing");

// We fetch the recipe url, then store the result of the promise in response, then we wait for json data from the fetch and store it in data variable
// we do guardclause here, if the response from the fetch is not ok, then we throw Error
const controlRecipes = async function () {
  try {
    // Getting the hash - ID of the recipe
    const id = window.location.hash.slice(1);

    if (!id || document.querySelector(".search__field").value === "") {
    } else {
      recipeView.renderSpinner();
    }

    // Loading recipe
    await model.loadRecipe(id);
    // const recipe = model.state.recipe;

    // rendering
    recipeView.render(model.state.recipe);

    // const recipeView = new RecipeView(model.state.recipe); // same as above
  } catch (error) {
    recipeView.renderError(`${error} 🚗🚗🚗`);
  }
};

const controlSearchResults = async function () {
  try {
    if (document.querySelector(".search__field").value === "") {
      alert("Search is empty, please enter a recipe name");
      return;
    }
    resultsView.renderSpinner();

    // console.log(resultsView);
    // Get search results
    const query = searchView.getQuery();
    if (!query) return;
    // Load search results
    await model.loadSearchResults(query);
    // Render results
    resultsView.render(model.getSearchResultsPage());
    // rendering pagination btns
    pagination.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (gotoPage) {
  console.log("Pagination");
  console.log(gotoPage);
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(gotoPage));
  // Rendering NEW pagination btns
  pagination.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);

  searchView.addHandlerSearch(controlSearchResults);
  pagination.addHandlerClick(controlPagination);
};
init();
