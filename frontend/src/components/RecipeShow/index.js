import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { fetchRecipe, getRecipe } from "../../store/recipe";
import { useEffect } from "react";
import './RecipeShow.css'

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
                {/* <div class='section-style'>
                </div> */}
            <div id='recipe-ave-rating'>
                <h1 id='ave-rating'>4.6</h1>
                <div id='stars'>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <h3 id='num-rating'>(28)</h3>
            </div>
            <div id='ingredients'>
                <h2 className='section-title'>Ingredients</h2>
                <p id='servings'>{recipe.servings} servings</p>
                <table>
                        { recipe.ingredients.map(ingredient=>{
                            const metricString = ingredient.metric ? ingredient.metric.replace("_", " ") : ""
                            const nameString = ingredient.name ? ingredient.name.replace("_", " ") : ""
                            return(
                                <tr>
                                    <td>{ingredient.amount}</td>
                                    <td>{metricString + " " + nameString}</td>
                                </tr>
                            ) 
                        })}
                </table>
            </div>
            <div id='preparation'>
                <h2 class='section-title'>Preparation</h2>
                { recipe.directions.map((step, index)=> {
                    return (
                        <div key={index}>
                            <h3 className='step-title'>Step {index+1}</h3>
                            <p className='step-text'>{step}</p>
                        </div>
                    )
                })}
            </div>
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