import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createRating, getRecipe } from "../../store/recipe";

import './Ratings.css'
import { useState } from "react";

const Ratings = () => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const sessionUser = useSelector(state => state.session.user)

    const { recipeId } = useParams();

    const recipe = useSelector(getRecipe(recipeId))
    
    const allRatings =  recipe.ratings.map((rating)=> {
        const ratingElement = (
                <div id='rating-wrapper' key={rating.id}>
                    <div id='comment'>
                        <p className='body-text' >{rating.comment}</p>
                    </div>
                    <div id='rating-footer'>
                        <h3 id='user-name'>{rating.user.name}</h3>
                        <div id='stars'>
                            {
                                [1, 2, 3, 4, 5].map((i)=> {
                                    if (i <= rating.rating) {
                                        return <p className="fa fa-star" key={`star-${i}`}></p>
                                    } else {
                                        return <p className="fa-regular fa-star" key={`star-${i}`}></p> 
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
        )
        return ratingElement
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rating = {
            comment,
            rating: 2, // document.querySelector('input[name="stars"]:checked').value, 
            recipe_id: 2, //recipeId, 
            user_id:2 //sessionUser.id
        }
        console.log(rating)
        return dispatch(createRating(rating))
    }

    const formRating = (
        <form onSubmit={handleSubmit}>
            <div id='stars' className="rating">
                <label>
                    <input type="radio" name="stars" value="1" />
                    <span class="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="2" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="3" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>   
                </label>
                <label>
                    <input type="radio" name="stars" value="4" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="5" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                </label>
            </div>
            <label>
                <input type='text' placeholder='Tell us what you think' id='comment-input' value={comment} onChange={(e)=>setComment(e.target.value)}></input>
            </label>
            <div id='submit-rating'>
                <button type='submit'>SUBMIT RATING</button>
            </div>
        </form>
    )


    return (
        <div id='ratings'>
            <div className='section-title'>
                <h1 id='review-form-title'>Leave a Review</h1>
                {formRating}
            </div>

            <h1 id='reviews-title'>Reviews ({recipe.ratings.length})</h1>
            {allRatings}
        </div>
    )
}

export default Ratings;