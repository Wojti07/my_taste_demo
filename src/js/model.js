import { async } from "regenerator-runtime";
import { API_URL } from './config.js'
import { AJAX } from "./helper.js";

// Application state 
export const state = {
  recipe: {},
  search: {
    query: '',
    results:[],
    },
  bookmarks: []
  };

// Recipe is loaded 
export const loadRecipe = async function (url, id) {
  try {
    if (url) {
      state.recipe = await loadRecipeFromUrl(url);
    }
    else {
      state.recipe = loadRecipeFromLocalStorage(id);
    }
    if(state.bookmarks.some( book => book.id == state.recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
      console.log(state.recipe);
  } catch (err) {
      console.error(`${err}`)
      throw err;
    }    
}

// Search results are loaded 
export const loadSearchReultas = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}&q=${query}`);
    state.search.results = data.hits.map( (rec) => {
      return {
        url: rec._links.self.href,
        title: rec.recipe.label,
        image: rec.recipe.image, 
      };
    });    
  } catch (err) {
      console.error(`${err}`);
    throw err;
  }
};

// Creating local storage 
const localBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmarked
  if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;
  localBookmark();
}

export const deletBookmark = function (recipe) {
  // Dellet bookmark
  const index = state.bookmarks.findIndex( el => el.id === recipe.id);
  state.bookmarks.splice(index, 1);
  //  Mark current recipe as NOT bookmarked
  if (recipe.id == state.recipe.id) state.recipe.bookmarked = false;
  localBookmark();
}

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// local storage removal 
export const clearBookmarks = function () {
  localStorage.removeItem('bookmarks');
};
// clearBookmarks();

// Adding a private recipe
export const addPrivateRecipe = function (newRecipe) {
  const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(
    ing => {
      const  description = ing[1];
      return { text: description };
    }
  );
  const recipe = {
    id: newRecipe.id,
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image: newRecipe.image,
    publisher: newRecipe.publisher,
    time: +newRecipe.time,
    serving: +newRecipe.servings,
    ingredients,
    key: true
  };
  addBookmark(recipe);
};


async function loadRecipeFromUrl(url) {
  const {recipe} = await AJAX(url);
  return {
    id: recipe.uri,
    title: recipe.label,
    image: recipe.image,
    sourceUrl: recipe.url,
    time: recipe.totalTime,
    serving: recipe.yield,
    ingredients: recipe.ingredients,
    selfLink: url,
  };
}

function loadRecipeFromLocalStorage(id) {
  return state.bookmarks.find(recipe => recipe.id == id);
}