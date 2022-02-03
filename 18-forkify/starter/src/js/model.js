import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
	recipe: {}
};

export const loadRecipe = async (id) => {
	try {
		const data = await getJSON(`${API_URL}/${id}`);

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
		// alert(err);
		console.log(`${err} 💥💥💥💥`);
	}
};
