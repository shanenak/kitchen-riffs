import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSavedRecipes } from "../../store/session";

export default function RecipeItem ({recipe}) {
    const history = useHistory()
    const saved = window.location.pathname === '/saved'

    const savedRecipes = useSelector(getSavedRecipes);

    const time = recipe.timeRequired.replace(/[^0-9]/g, '');
    const quickTag = (<div id='tag'>
                    <p>Quick</p>
                </div>)
    const tagInclude = (time<30)&(time>=5) ? quickTag : <></>;

    const getNotes = (recipe)=> {
        return (<p>{Object.values(savedRecipes).filter(record=>{
                        return record.recipe.id === recipe.id
                    }).notes}</p>)
    }

    return(
        <div id='index-item' key={recipe.id} onClick={()=>history.push(`/recipes/${recipe.id}`)}>
            <div id='grid-image'>
                <img src={recipe.photoUrl} alt='recipe-result'></img>
                {tagInclude}
            </div>
            <div id='recipe-item'>
                <p>{recipe.name}</p>
                <i class="fas fa-edit"></i>
            </div>
            {saved ? getNotes(recipe) : <p>"No notes"</p>}
        </div>
    )
}
