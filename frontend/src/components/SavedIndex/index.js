import { useDispatch, useSelector } from "react-redux"
import FilterIndex from "../RecipeIndex/FilterIndex"
import { fetchUser, getSavedRecipes, getUser } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import RecipeItem from "../RecipeIndex/RecipeItem";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import './SavedIndex.css'
const SavedIndex = ()=> {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUser())}
        , [dispatch])

    const { search } = useLocation();
    const sessionUser = useSelector(getUser);
    const savedRecipes = useSelector(getSavedRecipes);

    const recipes = Object.values(savedRecipes).map(record=>{
        return record["recipe"]
      })
        
    if (!sessionUser) return <Redirect to="/" />;

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
            { filtered_recipes.map(recipe => {
                return <RecipeItem recipe={recipe}/>
            })}
        </div>)
    } else {
        recipeIndex = (<div>
            <h1>Loading</h1>
        </div>
        )
    }

    const noRecipeRender = (
        <div id='no-saved'>
            <h1 id='no-saved-text'>No recipes have been saved</h1>
            <NavLink id='no-saved-nav' to='/'>Back to Recipes</NavLink>
        </div>
    )

    return (
        <div id='index'>
            <div className='page-title'>
                <h1>Saved Recipes</h1>
            </div>
            {sessionUser.savedRecipes ? <FilterIndex filtered_recipes={filtered_recipes}/> : noRecipeRender}
            {recipeIndex}
        </div>
    )
}

export default SavedIndex