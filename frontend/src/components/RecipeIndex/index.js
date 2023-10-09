import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, getRecipes } from "../../store/recipe";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const RecipeIndex = () => {
    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const recipes = useSelector(getRecipes);

    const [cuisine, setCuisine] = useState(false);
    const [meal, setMeal] = useState(false);
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
    console.log(cuisine)
    let recipeIndex;
    if (filtered_recipes) {
        recipeIndex = (<div>
            <ul id='recipe-list'>
                {
                Object.values(filtered_recipes).map(recipe => {
                    // console.log(recipe)
                    return(
                        <li key={recipe.id}>
                            <NavLink to={`/recipes/${recipe.id}`}>
                                {recipe.name}
                            </NavLink>
                        </li>
                    )
                })
                }
            </ul>
        </div>)
    } else {
        recipeIndex = (<div>
            <h1>Loading</h1>
        </div>
        )
    }
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

    return (
        <div id='index'>
            <div className='page-title'>
                <h1>Recipes</h1>
            </div>
            <div id='filter-section'>
                <div id='filter-title'>
                    <h3>Filter Results</h3>
                    <p>{recipes.length} items</p>
                </div>
                <div id='filter-dropdowns'>
                    <label>
                        <select onChange={(e)=>setCuisine(e.target.value)} id="cuisine-select">
                            <option value={false}>Cuisine</option>
                            {
                                cuisineOptions.map(cuisine=>{
                                    return <option value={cuisine} key={cuisine}>{cuisine}</option>
                                })
                            }
                        </select>
                    </label>
                    <label>
                        <select onChange={(e)=>setMeal(e.target.value)} id="meal-select">
                            <option value={false}>Meal</option>
                            {
                                mealOptions.map(meal=>{
                                    return <option value={meal} key={meal}>{meal}</option>
                                })
                            }
                        </select>
                    </label>
                    <label>
                        <select onChange={(e)=>setDish(e.target.value)} id="dish-select">
                            <option value={false}>Dish</option>
                            {
                                dishOptions.map(dish=>{
                                    return <option value={dish} key={dish}>{dish}</option>
                                })
                            }
                        </select>
                    </label>
                    <button onClick={resetFilter}>Reset</button>
                </div>
            </div>
            {recipeIndex}
        </div>
    )
}

export default RecipeIndex;