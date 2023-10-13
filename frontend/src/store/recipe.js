import csrfFetch from "./csrf";

export const RECEIVE_RECIPE = 'recipe/RECEIVE_RECIPE';
export const RECEIVE_RECIPES = 'recipe/RECEIVE_RECIPES';
export const RECEIVE_RATING = 'receive/RATING';
export const EDIT_RATING = 'edit/RATING';

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

const receiveRating = rating => {
    return {
        type: RECEIVE_RATING,
        rating
    }
}

const editRating = rating => {
    return {
        type: EDIT_RATING,
        rating
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
        const rating = await response.json();
        dispatch(receiveRating(rating))
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
        dispatch(editRating(payload));
    } else {
        return response.json();
    }
}

const recipesReducer = (state= {}, action) => {
    const newState = Object.assign({}, Object.freeze(state))
    switch (action.type) {
        case RECEIVE_RECIPE:
            return {...state, [action.recipe.id]:action.recipe};
        case RECEIVE_RECIPES:
            return {...action.recipes};
        case RECEIVE_RATING:
            newState[action.rating.recipe_id]['ratings'] = [...newState[action.rating.recipe_id]['ratings'], action.rating]
            return newState
        case EDIT_RATING:
            const idToUpdate = newState[action.rating.recipe_id]['ratings'].findIndex((rating)=> rating.id===action.rating.id)
            newState[action.rating.recipe_id]['ratings'][idToUpdate] = action.rating;            
            return newState
        default:
            return state;
    }
}

export default recipesReducer;