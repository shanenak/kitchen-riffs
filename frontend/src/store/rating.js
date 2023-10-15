import csrfFetch from "./csrf";
import { receiveRecipe } from "./recipe";

// thunks
export const createRating = rating => async(dispatch) => {
    const response = await csrfFetch("/api/ratings", {
        method: "POST",
        body: JSON.stringify(rating)
    });
    if (response.ok) {
        const payload = await response.json();
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