import csrfFetch from "./csrf";
import { openModal } from "./modal";

const RECEIVE_SAVE = 'save/RECEIVE_SAVE';
const RECEIVE_SAVES = 'save/RECEIVE_SAVES';
const REMOVE_SAVE = 'save/REMOVE_SAVE';

// actions

export const receiveSave = save => {
    return {
        type: RECEIVE_SAVE,
        save
    }
}

export const receiveSaves = saves => {
    return {
        type: RECEIVE_SAVES,
        saves
    }
}

export const removeSave = saveId => {
    return {
        type: REMOVE_SAVE,
        saveId
    }
}

// selectors

export const getSave = saveId => state => {
    return state?.savedRecipes[saveId] ? state.savedRecipes[saveId] : null
} 

export const getSaves = state => {
    return state?.savedRecipes && Object.keys(state.savedRecipes).length ? state.savedRecipes : null;
}

// thunks

export const fetchSaves = () => async(dispatch) => {
    const response = await fetch(`/api/saved_recipes`);
    if (response.ok) {
        const payload = await response.json();
        dispatch(receiveSaves(payload))
    }
}

export const fetchSave = saveId => async(dispatch) => {
    const response = await fetch(`/api/saved_recipes/${saveId}`)
    if (response.ok) {
        const payload = await response.json();
        dispatch(receiveSave(payload))
        return payload
    }
}

export const createSave = save => async(dispatch) => {
    const response = await csrfFetch(`/api/saved_recipes`, {
        method: "POST",
        body: JSON.stringify(save)
    });
    if (response.ok) {
        const payload = await response.json()
        const saved = await dispatch(receiveSave(payload))
        if (saved) {
            dispatch(openModal("saved", payload.id))
        }
    } else {
        return response.json();
    }
}

export const updateSave = save => async(dispatch) => {
    const response = await csrfFetch(`/api/saved_recipes/${save.save.id}`, {
        method: "PATCH",
        body: JSON.stringify(save)
    });
    if (response.ok) {
        const payload = await response.json()
        dispatch(receiveSave(payload))
    } else {
        return response.json();
    }
}

export const deleteSave = saveId => async(dispatch) => {
    const response = await csrfFetch(`/api/saved_recipes/${saveId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeSave(saveId))
    } else {
        return response.json();
    }
}

// reducer

const savedReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_SAVE:
            return {...state, [action.save.id]:action.save};
        case RECEIVE_SAVES:
            return {...action.saves};
        case REMOVE_SAVE:
            const nextState = Object.assign({}, Object.freeze(state))
            delete nextState[action.saveId];
            return nextState;
        default:
            return state;
    }
}

export default savedReducer;