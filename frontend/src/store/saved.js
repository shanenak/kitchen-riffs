import csrfFetch from "./csrf";

export const RECEIVE_SAVE = 'saved/RECEIVE_SAVE';
export const RECEIVE_SAVES = 'saved/RECEIVE_SAVES';
export const REMOVE_SAVE = 'saved/REMOVE_SAVE';

// actions

const receiveSave = save => {
    return {
        type: RECEIVE_SAVE,
        save
    }
}

const receiveSaves = saves => {
    return {
        type: RECEIVE_SAVES,
        saves
    }
}

const removeSave = saveId => {
    return {
        type: REMOVE_SAVE,
        saveId
    }
}

// selectors

export const getSave = saveId => state => {
    return state?.saves[saveId] ? state.saves[saveId] : null
}

export const getSaves = state => {
    return state?.saves ? Object.values(state.saves) : [];
}

// thunks

export const fetchSaves = () => async(dispatch) => {
    const response = await fetch(`/api/saved_recipes`);
    if (response.ok) {
        const saves = await response.json();
        dispatch(receiveSaves(saves));
    }
}

export const fetchSave = saveId => async(dispatch) => {
    const response = await fetch (`/api/saved_recipes/${saveId}`)
    if (response.ok) {
        const save = await response.json();
        dispatch(receiveSave(save));
        return save
    }
}

export const createSave = save => async(dispatch) => {
    const response = await csrfFetch(`/api/saved_recipes`, {
        method: "POST",
        body: JSON.stringify(save)
    });
    if (response.ok) {
        const payload = await response.json();
        dispatch(receiveSave(payload))
    } else {
        return response.json();
    }
}

export const updateSave = save => async(dispatch) => {
    const response = await csrfFetch(`/api/saved_recipes/${save.id}`, {
        method: "PATCH",
        body: JSON.stringify(save)
    });
    if (response.ok) {
        const payload = await response.json()
        dispatch(receiveSave(payload));
    } else {
        return response.json();
    }
}

export const deleteSave = saveId => async(dispatch) => {
    const response = await csrfFetch(`/api/saved_recipes/${saveId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeSave(saveId));
    } else {
        return response.json();
    }
}

export default function savedRecipesReducer (state={}, action) {
    const newState = Object.assign({}, Object.freeze(state)) 
    switch (action.type) {
        case RECEIVE_SAVE:
            return {...state, [action.save.id]:action.save}
        case RECEIVE_SAVES:
            return {...action.saves}
        case REMOVE_SAVE:
            delete newState[action.saveId]
            return newState
        default:
            return state;
    }
}