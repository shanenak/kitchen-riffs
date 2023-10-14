export const RECEIVE_RATING = 'receive/RATING';
export const EDIT_RATING = 'edit/RATING';


// actions

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