import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipe } from "../../store/recipe";

import './Ratings.css'

const Ratings = () => {
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
                                        return <p className="fa fa-star"></p>
                                    } else {
                                        return <p className="fa-regular fa-star"></p> 
                                    }
                                    
                                })
                            }
                        </div>
                    </div>
                </div>
        )
        return ratingElement
    })


    return (
        <div id='ratings'>
            <h1 id='reviews-title'>Reviews ({recipe.ratings.length})</h1>
            {allRatings}
        </div>
    )
}

export default Ratings;