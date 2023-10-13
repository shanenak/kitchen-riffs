import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { createSave, deleteSave } from "../../store/saved";
import { getUser } from "../../store/session";

export default function RecipeHead ({recipe}) {
    const sumRating = recipe.ratings.reduce((curr, acc)=> curr+acc.rating, 0);
    const avgRating = (sumRating/recipe.ratings.length).toFixed(1);
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(getUser)

    const signedIn = sessionUser ? true : false;
    const saved = (signedIn && sessionUser.savedRecipes) ? Object.values(sessionUser?.savedRecipes).find(save=>save.recipeId===recipe.id) : false;

    const handleSave = () => {
        const payload = {
            save: {
                userId: sessionUser.id,
                recipeId: recipe.id,
                notes: "",
                tag: ""
            }
        } 
        dispatch(createSave(payload))
    }

    const handleRemove = () => {
        const saveId = Object.values(sessionUser.savedRecipes).find(save=>save.recipeId===recipe.id).id
        console.log(saveId)
        dispatch(deleteSave(saveId))
    }

    return (
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
            {/* TODO: ADD OPTION IF ALREADY SAVED */}
            <div id='recipe-save' onClick={saved ? handleRemove : handleSave} className={signedIn ? "" : "disable"}>
                <i className={saved ? "fa fa-bookmark" : "fa-regular fa-bookmark"}></i>
                <p>{signedIn ? (saved ? "SAVED" : "SAVE RECIPE") : "SIGN IN TO SAVE RECIPE"}</p>
            </div>
            <div id='recipe-ave-rating'>
                <h1 id='ave-rating'>{avgRating}</h1>
                <div id='stars'>
                    {
                        [1, 2, 3, 4, 5].map((i)=> {
                            if (i <= avgRating) {
                                return <p className="fa fa-star"></p>
                            } else {
                                return <p className="fa-regular fa-star"></p> 
                            }
                            
                        })
                    }
                </div>
                <h3 id='num-rating'>({recipe.ratings.length})</h3>
            </div>
        </div>

    )
}