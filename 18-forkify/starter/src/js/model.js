import { async } from "regenerator-runtime";
import { API_URL } from "./config";

export const state = {
	recipe: {}
};

export const loadRecipe = async (id) => {
	try {
		const resp = await fetch(`${API_URL}/${id}`);
		const data = await resp.json();

		// console.log(resp, data);

		if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);

		let { recipe } = data.data;
		const { id, title, publisher, servings, ingredients } = recipe;

		state.recipe = {
			id,
			title,
			publisher,
			servings,
			ingredients,
			sourceURL: recipe.source_url,
			image: recipe.image_url,
			cookingTime: recipe.cooking_time
		};

		console.log(recipe);
	} catch (err) {
		alert(err);
	}
};
