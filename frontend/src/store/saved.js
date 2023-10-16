import csrfFetch from "./csrf";
import { fetchUser } from "./session";


export const fetchSaves = () => async(dispatch) => {
    const response = await fetch(`/api/saved_recipes`);
    if (response.ok) {
        dispatch(fetchUser())
    }
}

export const fetchSave = saveId => async(dispatch) => {
    const response = await fetch(`/api/saved_recipes/${saveId}`)
    if (response.ok) {
        dispatch(fetchUser())
    }
}

export const createSave = save => async(dispatch) => {
    const response = await csrfFetch(`/api/saved_recipes`, {
        method: "POST",
        body: JSON.stringify(save)
    });
    if (response.ok) {
        dispatch(fetchUser())
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
        dispatch(fetchUser())
    } else {
        return response.json();
    }
}

export const deleteSave = saveId => async(dispatch) => {
    const response = await csrfFetch(`/api/saved_recipes/${saveId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(fetchUser())
    } else {
        return response.json();
    }
}
