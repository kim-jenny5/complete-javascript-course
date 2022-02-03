import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";

// const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

// https://forkify-api.herokuapp.com/v2
// API key: 6cc043c1-7f8c-40dc-8239-e0366986d266
// const APIKey = "6cc043c1-7f8c-40dc-8239-e0366986d266";

///////////////////////////////////////
const controlRecipes = async () => {
	try {
		const id = window.location.hash.slice(1);
		console.log(id);

		if (!id) return;
		recipeView.renderSpinner();

		// loading recipe
		await model.loadRecipe(id);

		// rendering recipe
		recipeView.render(model.state.recipe);
	} catch (err) {
		console.log(err);
		alert(err);
	}
};

// controlRecipes();

// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
["hashchange", "load"].forEach((e) =>
	window.addEventListener(e, controlRecipes)
);
