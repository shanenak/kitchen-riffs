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

    const filterOptions = {};
    ['cuisine', 'meal', 'dish'].forEach((category) => {
        filterOptions[category] = [...new Set(Object.values(recipes).map(recipe => recipe[category].toLowerCase()))];
    })
    
    const filteredRecipes = Object.values(recipes).filter(recipe => {
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
                return <RecipeItem recipe={recipe} key={recipe.name}/>
            })}
        </div>)
    } else if (searchParams.getAll('search').length) {
        const combined = searchParams.getAll('search').concat(searchParams.getAll('cuisine'), searchParams.getAll('meal'), searchParams.getAll('dish'))
        recipeIndex = <Idea ingredients={combined}/>
    } else {
        recipeIndex = <h1 className='recipes-on-load'>{Object.values(recipes).length ? "No recipes found. Search for an ingredient to generate recipe inspiration." : "Opening up the recipe books"}</h1>
    }
    

    return (
        <div id='index'>
            <div className='page-title'>
                <h1>Recipes</h1>
            </div>
            <FilterIndex filteredRecipes={filteredRecipes} filterOptions={filterOptions}/>
            {recipeIndex}
        </div>
    )
}

export default RecipeIndex;