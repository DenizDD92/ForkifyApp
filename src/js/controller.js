// **********************************************************
// *                   Imports                              *
// **********************************************************
import searchView from "./view/search.js";
import recipeView from "./view/views.js";
import resultsView from "./view/results.js";
import * as model from "./model.js";
import "core-js/stable"; // pollyfilling all in general to be suitable for old browsers
import "regenerator-runtime/runtime"; // making asyncs works

// console.log(icons);

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

    if (!id) {
      return;
    }
    recipeView.renderSpinner();

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
    resultsView.renderSpinner();
    // console.log(resultsView);
    // Get search results
    const query = searchView.getQuery();
    if (!query) return;
    // Load search results
    await model.loadSearchResults(query);
    // Render results
    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
