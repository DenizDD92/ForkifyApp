import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./view/helper.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  // Using fetch to access the recipe API
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // console.log(response, data, "line 30");
    // creating recipe variable with let so we can later change it.
    const { recipe } = data.data;

    // here we got the recipe and now will rename the properties.
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state, "Load recipe");
    // console.log(state.recipe, "updated");
  } catch (error) {
    console.log(`${error} 🚕🚕🚕`);
    throw error;
  }
};

// **********************************************************
// *                       Search Results                   *
// **********************************************************

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
    console.log(state.search.results, "Load results");
  } catch (error) {
    console.log(`${error} 🚘🚘🚘`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
