import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { fetchRecipe, getRecipe } from "../../store/recipe";
import { useEffect } from "react";
import './RecipeShow.css'

import Ratings from "../Ratings";
import Preparation from "./Preparation";
import Ingredients from "./Ingredients";
import RecipeHead from "./RecipeHead";

const RecipeShow = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(getRecipe(recipeId));
    const sessionUser = useSelector(state => state.session.user)
    
    useEffect(()=> {
        dispatch(fetchRecipe(recipeId));
    }, [dispatch, recipeId])
    
    return ( recipe ? 
        (
            <div id='show'>
                <div id='show-head'>
                    <RecipeHead recipe={recipe} />
                    <div id='show-image'>
                        <img src={recipe.photoUrl} alt='recipe-result'></img>
                    </div>
                </div>
                <div id='show-body'>
                    <Ingredients recipe={recipe} />
                    <Preparation recipe={recipe} />
                </div>
                <Ratings recipe={recipe} sessionUser={sessionUser} />
            </div>

        ) : (
            <div>
                <h1>Loading</h1>
            </div>
        )
    )

}

export default RecipeShow;