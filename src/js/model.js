import 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { SEARCH_RESULTS_NUMBER } from './config.js';

export const state = {
  recipe: [],
  search: {
    results: [],
    query: '',
    searchResultsPerPage: [],
    page: '',
    searchResultsNumber: SEARCH_RESULTS_NUMBER,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = recipe;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    const { recipes } = data.data;
    //console.log(recipes);
    state.search.results = recipes;
  } catch (err) {
    throw err;
  }
};

export const searchResultsPerPage = function (page = 1) {
  state.search.page = page;

  const { searchResultsNumber } = state.search;

  const start = (page - 1) * searchResultsNumber;
  const end = page * searchResultsNumber;
  state.search.searchResultsPerPage = state.search.results.slice(start, end);
  return state.search.searchResultsPerPage;
};

export const updateServings = function (newServings) {
  //const oldServings = state.recipe.servings;

  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
