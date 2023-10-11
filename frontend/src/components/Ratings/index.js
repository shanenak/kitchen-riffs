import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipe } from "../../store/recipe";

const Ratings = () => {
    const { recipeId } = useParams();

    const recipe = useSelector(getRecipe(recipeId))
    
    const ratingsElement =  recipe.ratings.map((rating)=> {
        return (
                <div id='rating-wrapper' key={rating.id}>
                    <div id='comment'>
                        <p>{rating.comment}</p>
                    </div>
                    <div id='rating-footer'>
                        <h3 id='user-name'>{rating.user.name}</h3>
                        <h3 id='user-rating'>{rating.rating}</h3>
                    </div>
                </div>

        )
    })
    return (
        <div id='ratings'>
            <h1>Reviews ({recipe.ratings.length})</h1>
            {ratingsElement}
        </div>
    )
}

export default Ratings;