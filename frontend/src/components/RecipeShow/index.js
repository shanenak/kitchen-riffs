import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { fetchRecipe, getRecipe } from "../../store/recipe";
import { useEffect } from "react";
import './RecipeShow.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const RecipeShow = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchRecipe(recipeId));
    }, [dispatch, recipeId])
    
    const recipe = useSelector(getRecipe(recipeId));

    let showPage;
    if (recipe) {
        showPage = (        
        <div id='show'>
            <div id='show-head'>
                <div id='show-description'>
                    <div id='recipe-meal'>
                        <NavLink to={`/meal/${recipe.meal}`}>{recipe.meal}</NavLink>
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
                        <h1 id='ave-rating'>4.6</h1>
                        <div id='stars'>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                        </div>
                        <h3 id='num-rating'>(28)</h3>
                    </div>
                </div>
                <div id='show-image'>
                    <img src={recipe.photoUrl} alt='recipe-result'></img>
                </div>
            </div>
            <div id='show-body'>
                <div id='ingredients'>
                    <h2 className='section-title'>Ingredients</h2>
                    <p id='servings'>{recipe.servings} servings</p>
                    <table>
                        <tbody>
                            { recipe.ingredients.map(ingredient=>{
                                const metricFormatted = ingredient.metric ? ingredient.metric.replace("_", " ") : ""
                                const nameFormatted = ingredient.name ? ingredient.name.replace("_", " ") : ""
                                const ingredientFormatted = ingredient.amount ? (metricFormatted + " " + nameFormatted) : (nameFormatted+ ", " + metricFormatted)
                                return(
                                    <tr key={ingredient.name}>
                                        <td>{ingredient.amount}</td>
                                        <td>{ingredientFormatted}</td>
                                    </tr>
                                ) 
                            })}
                        </tbody>
                    </table>
                </div>
                <div id='preparation'>
                    <h2 className='section-title'>Preparation</h2>
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