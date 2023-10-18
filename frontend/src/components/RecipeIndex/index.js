import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, getRecipes } from "../../store/recipe";
import { useEffect} from "react";

import './RecipeIndex.css'
import RecipeItem from "./RecipeItem";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import FilterIndex from "./FilterIndex";

const RecipeIndex = () => {

    const dispatch = useDispatch();
    
    // UNCOMMENT WHEN READY TO SEE RECIPES
    // useEffect(()=> {
    //     dispatch(fetchRecipes());
    // }, [dispatch]);

    const recipes = useSelector(getRecipes);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const filtered_recipes = recipes.filter(recipe => {
        const categoryCheck = ['cuisine', 'meal', 'dish'].every((category)=>{
            return !searchParams.get(category) || (searchParams.get(category).toLowerCase() === recipe[category].toLowerCase());
        })
        // return early if first check returns false
        const ingredientOrNameCheck = !categoryCheck || searchParams.getAll('search').every(searchText=>{
            const ingredCheck = recipe['ingredients'].some(ingredient=>{
                return ingredient.name.toLowerCase().includes(searchText.toLowerCase())
            })
            const nameCheck = recipe['name'].toLowerCase().includes(searchText.toLowerCase())
            return (ingredCheck || nameCheck)
        })
        return categoryCheck && ingredientOrNameCheck
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
            {/* UNCOMMENT when you want recipes to load! */}
            {/* {recipeIndex} */}
        </div>
    )
}

export default RecipeIndex;