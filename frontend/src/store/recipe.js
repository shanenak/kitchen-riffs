const RECEIVE_RECIPE = 'recipe/RECEIVE_RECIPE';
const RECEIVE_RECIPES = 'recipe/RECEIVE_RECIPES';


// actions

export const receiveRecipe = recipe => {
    return {
        type: RECEIVE_RECIPE,
        recipe
    }
}

export const receiveRecipes = recipes => {
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
    return state?.recipes ? state.recipes : [];
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