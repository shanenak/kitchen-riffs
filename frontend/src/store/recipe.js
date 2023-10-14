import csrfFetch from "./csrf";

export const RECEIVE_RECIPE = 'recipe/RECEIVE_RECIPE';
export const RECEIVE_RECIPES = 'recipe/RECEIVE_RECIPES';


// actions

const receiveRecipe = recipe => {
    return {
        type: RECEIVE_RECIPE,
        recipe
    }
}

const receiveRecipes = recipes => {
    return {
        type: RECEIVE_RECIPES,
        recipes
    }
}

// selectors

export const getRecipe = recipeId => state => {
    return state?.recipes[recipeId] ? state.recipes[recipeId] : null
}

export const getRecipes = state => {
    return state?.recipes ? Object.values(state.recipes) : [];
}

// thunks

export const fetchRecipes = () => async(dispatch) => {
    const response = await fetch (`/api/recipes`);
    if (response.ok) {
        const recipes = await response.json();
        dispatch(receiveRecipes(recipes));
    }
}

export const fetchRecipe = recipeId => async(dispatch) => {
    const response = await fetch (`/api/recipes/${recipeId}`)
    if (response.ok) {
        const recipe = await response.json();
        dispatch(receiveRecipe(recipe));
        return recipe
    }
}

export const createRating = rating => async(dispatch) => {
    const response = await csrfFetch("/api/ratings", {
        method: "POST",
        body: JSON.stringify(rating)
    });
    if (response.ok) {
        const payload = await response.json();
        console.log('createRating',payload)
        dispatch(receiveRecipe(payload))
    } else {
        return response.json();
    }
}

export const updateRating = rating => async(dispatch) => {
    const response = await csrfFetch(`/api/ratings/${rating.id}`, {
        method: "PATCH",
        body: JSON.stringify(rating)
    });
    if (response.ok) {
        const payload = await response.json();
        dispatch(receiveRecipe(payload))
    } else {
        return response.json();
    }
}

const recipesReducer = (state= {}, action) => {
    switch (action.type) {
        case RECEIVE_RECIPE:
            return {...state, [action.recipe.id]:action.recipe};
        case RECEIVE_RECIPES:
            return {...action.recipes};
        default:
            return state;
    }
}

export default recipesReducer;