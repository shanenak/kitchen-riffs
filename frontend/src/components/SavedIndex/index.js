import { useDispatch, useSelector } from "react-redux"
import FilterIndex from "../RecipeIndex/FilterIndex"
import { fetchUser, getSavedRecipes, getUser } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import RecipeItem from "../RecipeIndex/RecipeItem";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

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
    // TODO: style if no recipes have been saved
    if (!recipes) return <h1>No recipes have been saved yet.</h1>

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
                console.log(recipe)
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
                <h1>Saved Recipes</h1>
            </div>
            {sessionUser.savedRecipes ? <FilterIndex filtered_recipes={filtered_recipes}/> : <h1>No Recipes</h1>}
            {recipeIndex}
        </div>
    )
}

export default SavedIndex