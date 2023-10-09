import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, getRecipes } from "../../store/recipe";
import { useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const RecipeIndex = () => {
    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const recipes = useSelector(getRecipes);
    console.log(recipes)
    let recipeIndex;
    if (recipes) {
        recipeIndex = (<div>
            <ul>
                {
                Object.values(recipes).map(recipe => {
                    // console.log(recipe)
                    return(
                        <li>
                            <NavLink to={`/recipes/${recipe.id}`}>
                                {recipe.name}
                            </NavLink>
                        </li>
                    )
                })
                }
            </ul>
        </div>)
    } else {
        recipeIndex = (<div>
            <h1>Loading</h1>
        </div>
        )
    }

    return (
        recipeIndex
    )
}

export default RecipeIndex;