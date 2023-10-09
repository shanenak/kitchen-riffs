import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { fetchRecipe, getRecipe } from "../../store/recipe";
import { useEffect } from "react";

const RecipeShow = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchRecipe(recipeId));
    }, [dispatch, recipeId])
    
    const recipe = useSelector(getRecipe(recipeId))

    let showPage;
    if (recipe) {
        showPage = (        
        <div>
            <h2>{recipe.name}</h2>
            <h3>{recipe.servings}</h3>
            <ul>
                {recipe.directions.map(step=> <li>{step}</li>)}
            </ul>
        </div>
        )
    } else {
        showPage = (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
    
    return (
        showPage
    )

}

export default RecipeShow;