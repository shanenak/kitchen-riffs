import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, getRecipes } from "../../store/recipe";
import { useEffect} from "react";

import './RecipeIndex.css'
import RecipeItem from "./RecipeItem";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import FilterIndex from "./FilterIndex";
import Idea from "../Idea";

const RecipeIndex = () => {

    const dispatch = useDispatch();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    
    const recipes = useSelector(getRecipes);
    
    const filteredRecipes = recipes.filter(recipe => {
        const categoryCheck = ['cuisine', 'meal', 'dish'].every((category)=>{
            return !searchParams.get(category) || (searchParams.get(category).toLowerCase() === recipe[category].toLowerCase());
        })

        const ingredientOrNameCheck = !categoryCheck || searchParams.getAll('search').every(searchText=>{
            const ingredCheck = recipe['ingredients'].some(ingredient=>{
                return ingredient.name.toLowerCase().includes(searchText.toLowerCase())
            })
            const nameCheck = recipe['name'].toLowerCase().includes(searchText.toLowerCase())
            return (ingredCheck || nameCheck)
        })
        return categoryCheck && ingredientOrNameCheck
    })

    useEffect(()=> {
        dispatch(fetchRecipes());
    }, [dispatch]);
    
    let recipeIndex;
    if (filteredRecipes.length) {
        recipeIndex = (
        <div id='recipe-list'>
            { Object.values(filteredRecipes).map(recipe => {
                return <RecipeItem recipe={recipe} key={recipe.id}/>
            })}
        </div>)
    } else if (searchParams.getAll('search').length) {
        recipeIndex = <Idea ingredients={searchParams.getAll('search')}/>
    } else {
        recipeIndex = <h1>No results</h1>
    }
    

    return (
        <div id='index'>
            <div className='page-title'>
                <h1>Recipes</h1>
            </div>
            <FilterIndex filteredRecipes={filteredRecipes}/>
            {recipeIndex}
        </div>
    )
}

export default RecipeIndex;