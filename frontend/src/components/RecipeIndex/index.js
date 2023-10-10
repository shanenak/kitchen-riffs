import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, getRecipes } from "../../store/recipe";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import './RecipeIndex.css'

const RecipeIndex = () => {
    let { mealName } = useParams();

    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const recipes = useSelector(getRecipes);

    const [cuisine, setCuisine] = useState(false);
    const [meal, setMeal] = useState(mealName);
    const [dish, setDish] = useState(false);

    const filtered_recipes = recipes.filter(recipe => {
        let cuisineCheck = true;
        let mealCheck = true;
        let dishCheck = true;
        if (cuisine) {cuisineCheck = recipe.cuisine === cuisine;}
        if (meal) {mealCheck = recipe.meal === meal;}
        if (dish) {dishCheck = recipe.dish === dish}
        return cuisineCheck && mealCheck && dishCheck
    })

    let mealOptions = [];
    let cuisineOptions = [];
    let dishOptions = [];
    recipes.forEach(recipe => {
        if (!mealOptions.includes(recipe.meal)) {mealOptions.push(recipe.meal)}
        if (!cuisineOptions.includes(recipe.cuisine)) {cuisineOptions.push(recipe.cuisine)}
        if (!dishOptions.includes(recipe.dish)) {dishOptions.push(recipe.dish)}
    })

    const resetSelect = (name) => {
        const selectElement = document.getElementById(`${name}-select`)
        selectElement.selectedIndex = 0;
    }

    const resetFilter = (e) => {
        setCuisine(false)
        setMeal(false)
        setDish(false)
        resetSelect('cuisine')
        resetSelect('meal')
        resetSelect('dish')
    }

    let recipeIndex;
    if (filtered_recipes) {
        recipeIndex = (
        <div id='recipe-list'>
                {
                Object.values(filtered_recipes).map(recipe => {
                    return(
                        <NavLink to={`/recipes/${recipe.id}`}>
                            {recipe.name}
                        </NavLink>
                    )
                })
                }
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
            <div id='filter-section'>
                <div id='filter-title'>
                    <h3>Filter Results</h3>
                    <p>{filtered_recipes.length} items</p>
                </div>
                <div id='filter-dropdowns'>
                    <label>
                        <select onChange={(e)=>setCuisine(e.target.value)} id="cuisine-select" defaultValue={cuisine}>
                            <option value={false}>Cuisine</option>
                            {
                                cuisineOptions.map(cuisineOption=>{
                                    return <option value={cuisineOption} key={cuisineOption}>{cuisineOption}</option>
                                })
                            }
                        </select>
                    </label>
                    <label>
                        <select onChange={(e)=>setMeal(e.target.value)} id="meal-select" defaultValue={meal}>
                            <option value={false}>Meal</option>
                            {
                                mealOptions.map(mealOption=>{
                                    return <option value={mealOption} key={mealOption}>{mealOption}</option>
                                })
                            }
                        </select>
                    </label>
                    <label>
                        <select onChange={(e)=>setDish(e.target.value)} id="dish-select" defaultValue={dish}>
                            <option value={false}>Dish</option>
                            {
                                dishOptions.map(dishOption=>{
                                    return <option value={dishOption} key={dishOption}>{dishOption}</option>
                                })
                            }
                        </select>
                    </label>
                    <button onClick={resetFilter}>RESET</button>
                </div>
            </div>
            {recipeIndex}
        </div>
    )
}

export default RecipeIndex;