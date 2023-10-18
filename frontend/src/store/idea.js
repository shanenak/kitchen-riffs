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

export const fetchIdeas = prefix => async(dispatch) => {
    const url = 'https://tasty.p.rapidapi.com/recipes/auto-complete';

    const params = new URLSearchParams();
    params.set("prefix", prefix)

    const urlWithParams = url + '?' + params.toString();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2ef454ecc2msh631bcc09204bdfep1b4530jsnb8d5d2cb302d',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    const response = await fetch(urlWithParams, options);
    if (response.ok) {
        const ideas = await response.json();
        console.log(ideas)
        dispatch(receiveIdeas(ideas))
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