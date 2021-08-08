//allow polyfilling for your site
import 'core-js/stable';
import 'regenerator-runtime';

//import model
import * as model from './model.js';

//import views
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//load spinner

///Fetch forkify api
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //1.render spinner
    recipeView.renderSpinner();

    //2.get data
    await model.loadRecipe(id);

    //3.show data on DOM
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
    //console.log(typeof model.state.recipe.servings);
  } catch (err) {
    recipeView.renderError(err);
    console.log(err);
  }
};
controlRecipes();

const controlSearchResults = async function () {
  try {
    //1.render spinner
    resultsView.renderSpinner();

    //2. get query
    const query = searchView.getQuery();
    await model.loadSearchResults(query);

    if (
      !model.state.search.results ||
      (Array.isArray(model.state.search.results) &&
        model.state.search.results.length === 0)
    )
      throw new Error('check searched recipe and try again');

    //3.render u.i
    resultsView.render(model.searchResultsPerPage());

    console.log(model.state);

    //4.render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err);
    console.error(err);
  }
};

const returnPaginationNumber = function (pagination) {
  resultsView.render(model.searchResultsPerPage(pagination));

  paginationView.render(model.state.search);
};

const returnServingsNumber = function (servings) {
  model.updateServings(servings);
  recipeView.render(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(returnServingsNumber);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(returnPaginationNumber);
};

init();
