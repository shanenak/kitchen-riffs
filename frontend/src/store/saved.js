import csrfFetch from "./csrf";
import { fetchUser } from "./session";


export const fetchSaves = () => async(dispatch) => {
    const response = await fetch(`/api/saved_recipes`);
    if (response.ok) {
        // const saves = await response.json();
        dispatch(fetchUser())
    }
}

export const fetchSave = saveId => async(dispatch) => {
    const response = await fetch (`/api/saved_recipes/${saveId}`)
    if (response.ok) {
        // const save = await response.json();
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
        // dispatch(receiveSave(payload))
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
        // const payload = await response.json()
        // dispatch(receiveSave(payload));
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
        // dispatch(removeSave(saveId));
        dispatch(fetchUser())
    } else {
        return response.json();
    }
}
