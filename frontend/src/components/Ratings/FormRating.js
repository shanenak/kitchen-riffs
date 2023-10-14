import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../../store/recipe";
import { createRating } from "../../store/rating";

export default function FormRating ( {recipeId}) {

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [starValue, setStarValue] = useState(0);

    const sessionUser = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rating = {'rating':
            {
                comment,
                rating: starValue, 
                recipe_id: recipeId, 
                user_id: sessionUser.id
            }
        }
        setComment("")
        setStarValue(0)

        document.getElementById('confirm-submission').className="";
        document.getElementById('comment-input').className="hide"
        document.getElementById('submit-rating-button').className="hide"

        dispatch(createRating(rating))
        dispatch(fetchRecipe(recipeId));
    }
    const clickStar = (e)=>{
        setStarValue(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} id='new-rating'>
            <div id='stars' className="rating">
                <label>
                    <input type="radio" name="stars" value="1" onChange={clickStar}/>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="2" onChange={clickStar}/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="3" onChange={clickStar}/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>   
                </label>
                <label>
                    <input type="radio" name="stars" value="4" onChange={clickStar}/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="5" onChange={clickStar}/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
            </div>
            <label>
                <input type='text' placeholder='Tell us what you think' id='comment-input' value={comment} onChange={(e)=>setComment(e.target.value)} disabled={sessionUser ? false : true}></input>
            </label>
            <div id='confirm-submission' className='hide'>
                <h1>Thanks for your feedback, {sessionUser?.name}!</h1>
            </div>
            <div id='submit-rating'>
                <button id='submit-rating-button' type='submit' disabled={starValue<1 || !sessionUser}>SUBMIT RATING</button>
            </div>
        </form>
    )
}  