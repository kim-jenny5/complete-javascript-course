const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
// API key: 6cc043c1-7f8c-40dc-8239-e0366986d266
// const APIKey = "6cc043c1-7f8c-40dc-8239-e0366986d266";
///////////////////////////////////////
const showRecipe = async ()=>{
    try {
        const resp = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");
        const data = await resp.json();
        // console.log(resp, data);
        if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);
        let { recipe  } = data.data;
        const { id , title , publisher , servings , ingredients  } = recipe;
        recipe = {
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
        console.log(err);
        alert(err);
    }
};
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
