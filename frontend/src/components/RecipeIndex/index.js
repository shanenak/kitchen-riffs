import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, getRecipes } from "../../store/recipe";
import { useEffect} from "react";

import './RecipeIndex.css'
import RecipeItem from "./RecipeItem";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import FilterIndex from "./FilterIndex";

const RecipeIndex = () => {

    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const recipes = useSelector(getRecipes);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const filtered_recipes = recipes.filter(recipe => {
        return ['cuisine', 'meal', 'dish'].every((category)=>{
            return !searchParams.get(category) || (searchParams.get(category).toLowerCase() === recipe[category].toLowerCase());
        })
    })

    let recipeIndex;
    if (filtered_recipes) {
        recipeIndex = (
        <div id='recipe-list'>
            { Object.values(filtered_recipes).map(recipe => {
                return <RecipeItem recipe={recipe}/>
            })}
        </div>)
    } else {
        recipeIndex = (<div>
            <h1>Loading</h1>
        </div>
        )
    }

    return (
        <div id='index'>
            <div className='page-title'>
                <h1>Recipes</h1>
            </div>
            <FilterIndex filtered_recipes={filtered_recipes}/>
            {recipeIndex}
        </div>
    )
}

export default RecipeIndex;