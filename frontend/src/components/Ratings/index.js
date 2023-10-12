import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createRating, getRecipe } from "../../store/recipe";

import './Ratings.css'
import { useState } from "react";

const Ratings = () => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [starValue, setStarValue] = useState(0);

    const sessionUser = useSelector(state => state.session.user)

    const { recipeId } = useParams();

    const recipe = useSelector(getRecipe(recipeId))

    const ratingsWithComments = recipe.ratings.filter((rating)=> rating.comment)
    
    const allRatings =  ratingsWithComments.map((rating)=> {
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
                rating: starValue, 
                recipe_id: recipeId, 
                user_id: sessionUser.id
            }
        }
        setComment("")
        setStarValue(0)
        // const eleStars = document.getElementsByName("stars");
        // for(var i=0;i<eleStars.length;i++) {
        //     eleStars[i].checked = false;
        // }

        document.getElementById('confirm-submission').className="";

        document.getElementById('comment-input').className="to-show"

        document.getElementById('submit-rating-button').className="to-show"

        return dispatch(createRating(rating))
    }
    const clickStar = (e)=>{
        setStarValue(e.target.value)
    }

    let formRating = (
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
                <input type='text' placeholder='Tell us what you think' id='comment-input' value={comment} onChange={(e)=>setComment(e.target.value)}></input>
            </label>
            <div id='confirm-submission' className='to-show'>
                <h1>Thanks for your feedback, {sessionUser.name}!</h1>
            </div>
            <div id='submit-rating'>
                <button id='submit-rating-button' type='submit' disabled={starValue<1}>SUBMIT RATING</button>
                {/* <script> 
                    
                    console.log(starInput);
                    document.querySelector('#submit-rating').disabled = starInput ? true : false;
                </script> */}
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