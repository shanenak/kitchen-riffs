import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSavedRecipes } from "../../store/session";
import { openModal } from "../../store/modal";

export default function RecipeItem ({recipe}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const saved = window.location.pathname === '/saved'

    const savedRecipes = useSelector(getSavedRecipes);
    const savedRecord = Object.values(savedRecipes).find(record=>{
            return record.recipe.id === recipe.id
        })

    const time = recipe.timeRequired.replace(/[^0-9]/g, '');
    const quickTag = (<div id='tag'>
                    <p>Quick</p>
                </div>)
    const tagInclude = (time<30)&(time>=5) ? quickTag : <></>;

    const editNotes = () => {
        dispatch(openModal("saved", savedRecord.id))
    }

    const routeRecipeShow = () => {
       return history.push(`/recipes/${recipe.id}`)
    }

    return(
        <div id='index-item' key={recipe.id}>
            <div id='grid-image' onClick={routeRecipeShow}>
                <img src={recipe.photoUrl} alt='recipe-result'></img>
                {tagInclude}
            </div>
            <div id='recipe-item'>
                <p onClick={routeRecipeShow}>{recipe.name}</p>
                <i class="fas fa-edit" onClick={editNotes}></i>
            </div>
            {saved ? <p>{savedRecord.notes}</p> : <p>"No notes"</p>}
        </div>
    )
}
