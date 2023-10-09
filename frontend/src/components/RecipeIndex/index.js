import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, getRecipes } from "../../store/recipe";
import { useEffect } from "react";

const RecipeIndex = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(getRecipes);

    useEffect(()=> {
        dispatch(fetchRecipes);
    }, [dispatch]);

    return (
        <>
        <ul>
            {
                recipes.map(recipe => {
                    return(
                        <li>{recipe.name}</li>
                    )
                })
            }
        </ul>
        </>
    )
}

export default RecipeIndex;