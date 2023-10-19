const RECEIVE_IDEA = 'idea/RECEIVE_IDEA';
const RECEIVE_IDEAS = 'idea/RECEIVE_IDEAS';

export const receiveIdea = idea => {
    return {
        type: RECEIVE_IDEA,
        idea
    }
}

export const receiveIdeas = ideas => {
    return {
        type: RECEIVE_IDEAS,
        ideas
    }
}

// selectors

export const getIdea = ideaId => state => {
    return state?.ideas[ideaId] ? state.ideas[ideaId] : null
}

export const getIdeas = state => {
    return state?.ideas ? Object.values(state.ideas) : [];
}

// thunks

export const fetchIdeas = ingredients => async(dispatch) => {
    const url = 'https://tasty.p.rapidapi.com/recipes/list';

    const params = new URLSearchParams();
    params.set("size", 6);
    params.set("q", ingredients.join(', '));
    const urlWithParams = url + '?' + params.toString();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    const response = await fetch(urlWithParams, options);
    if (response.ok) {
        const ideas = await response.json();
        dispatch(receiveIdeas(ideas['results']))
    } else {
        console.log(response.json())
    }
}

const ideasReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_IDEAS:
            return {...action.ideas};
        default:
            return state;
    }
}

export default ideasReducer