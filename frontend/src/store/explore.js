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

export const fetchIdeas = (prefix) => async(dispatch) => {
    const url = 'https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2ef454ecc2msh631bcc09204bdfep1b4530jsnb8d5d2cb302d',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
    } catch (error) {
        console.error(error)
    }
}