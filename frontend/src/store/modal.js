export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (form, id) => {
    return {
        type: OPEN_MODAL,
        form,
        id
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

export default function modalReducer(state = null, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {form: action.form, id: action.id};
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
}