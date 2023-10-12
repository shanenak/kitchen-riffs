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
        const rating = {'rating':
            {
                comment,
                rating: document.querySelector('input[name="stars"]:checked').value, 
                recipe_id: recipeId, 
                user_id: sessionUser.id
            }
        }
        setComment("")
        const eleStars = document.getElementsByName("stars");
        for(var i=0;i<eleStars.length;i++) {
            eleStars[i].checked = false;
        }

        document.getElementById('confirm-submission').className="";

        document.getElementById('new-rating').className="to-show"

        return dispatch(createRating(rating))
    }

    let formRating = (
        <form onSubmit={handleSubmit} id='new-rating'>
            <div id='stars' className="rating">
                <label>
                    <input type="radio" name="stars" value="1" />
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="2" />
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="3" />
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>   
                </label>
                <label>
                    <input type="radio" name="stars" value="4" />
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="5" />
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
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
                <div id='confirm-submission' className='to-show'>
                    <h1>Thank you for your feedback, {sessionUser.name}!</h1>
                    <h3>Check out your review below.</h3>
                </div>
            </div>

            <h1 id='reviews-title'>Reviews ({recipe.ratings.length})</h1>
            {allRatings}
        </div>
    )
}

export default Ratings;