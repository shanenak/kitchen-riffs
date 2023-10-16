import { useDispatch, useSelector } from "react-redux"
import FilterIndex from "../RecipeIndex/FilterIndex"
import { fetchUser, getSavedRecipes, getUser } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import RecipeItem from "../RecipeIndex/RecipeItem";
import { useEffect } from "react";

const SavedIndex = ()=> {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUser())
    })

    const sessionUser = useSelector(getUser);
        
    const filtered_recipes = useSelector(getSavedRecipes);
    console.log(filtered_recipes)
        
    if (!sessionUser) return <Redirect to="/" />;
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
                <h1>Recipes</h1>
            </div>
            {sessionUser.savedRecipes ? <FilterIndex filtered_recipes={filtered_recipes}/> : <h1>No Recipes</h1>}
            {recipeIndex}
        </div>
    )
}

export default SavedIndex