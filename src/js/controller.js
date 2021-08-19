import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import addPrivateRecipeView from './views/addPrivateRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime/runtime';

const controlRecipes= async function (url, id) {
  try { 
  // Loading spinner
  recipeView.spinner();
  // Loading recipe
  await model.loadRecipe(url, id);
  // Rendering recipe
  recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.error();
    console.error(err);
  }
}

const controlSearchResults = async function () {
  try {
    // Loading spinner
    resultView.spinner();
    // Search recipes
    const query = searchView.getQuery();
    if(!query) return;
    // Loading recipes
    await model.loadSearchReultas(query);
    // Rendering recipes
    resultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const controlAddBookmark = function () {
  //  Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deletBookmark(model.state.recipe); 
  // Update recipe view
  recipeView.update(model.state.recipe);
  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function(newRecipe) {
  try {
  // Upload the new recipe data
  model.addPrivateRecipe(newRecipe);
  // Render bookmark view
  bookmarksView.render(model.state.bookmarks);
  // Close form window
  setTimeout(function () {
    addPrivateRecipeView.toggleWindow();
  },  1000);
} catch (err) {
  console.error(err);
  addRecipeView.error(err.message);
}
};

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  resultView.addHandlerResult(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHadlerAddBookmark(controlAddBookmark); 
  bookmarksView.addHandlerBookmarkRecipeRender(controlRecipes);
  addPrivateRecipeView.addHandlerAddPrivateRecipe(controlAddRecipe);
};
init();  
