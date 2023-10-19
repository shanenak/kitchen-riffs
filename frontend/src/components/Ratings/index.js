import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ViewRating from "./ViewRating";
import FormRating from "./FormRating";
import './Ratings.css'

export default function Ratings ({recipe, sessionUser}) {

    const { recipeId } = useParams();

    let pageRender = <></>;
    if (recipe?.ratings) {
        const ratingsWithComments = recipe.ratings.filter((rating)=> rating.comment).sort(function(a,b){
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        pageRender = (
        <div id='ratings'>
            <div className='section-title'>
                <h1 id='review-form-title'>{sessionUser ? "Leave a Review" : "Sign in to leave a review"}</h1>
                <FormRating recipeId={recipeId}/>
            </div>

            <h1 id='reviews-title'>Reviews ({recipe.ratings.length})</h1>
            {
                ratingsWithComments.map((rating)=> {
                    return <ViewRating rating={rating} key={rating.id}/>
                })
            }
        </div>
        )
    }
    return (
        pageRender
    )
}