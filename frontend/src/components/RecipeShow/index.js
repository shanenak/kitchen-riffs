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
        <div id='show'>
            <div id='recipe-meal'>
                <h3>{recipe.meal}</h3>
            </div>
            <div id='recipe-name'>
                <h1>{recipe.name}</h1>
            </div>
            <div id='recipe-author'>
                <h2>BY {recipe.author}</h2>
            </div>
            <div id='recipe-time'>
                <p>{recipe.timeRequired}</p>
            </div>
            <div id='recipe-ave-rating'>
                <span>4.6</span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span>(28)</span>
            </div>
            <div class='ingredients'>
                <h2 class='section-title'>Ingredients</h2>
                <p id='servings'>{recipe.servings}</p>
                <table>
                        { recipe.ingredients.map(ingredient=>{
                            return(
                                <tr>
                                    <td>{ingredient.amount}</td>
                                    <td>{ingredient.metric.replace("_", " ") + " " +ingredient.name.replace("_", " ")}</td>
                                </tr>
                            ) 
                        })}
                </table>
            </div>
            <div class='preparation'>
                <h2 class='section-title'>Preparation</h2>
                { recipe.directions.map((step, index)=> {
                    return (
                        <div key={index}>
                            <h3>Step {index+1}</h3>
                            <p>{step}</p>
                        </div>
                    )
                })}
            </div>

            <ul>
                {recipe.directions.map(step=> <li key={step}>{step}</li>)}
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