import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { openModal } from "../../store/modal";
import { deleteSave, getSaves } from "../../store/saved";

export default function SavedRecipeItem ({recipe}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const savedRecipes = useSelector(getSaves);
    const savedRecord = Object.values(savedRecipes).find(record=>{
            return record['recipe'].id === recipe.id
        })

    const editNotes = () => {
        dispatch(openModal("saved", savedRecord.id))
    }

    const deleteNotes = () => {
        const currentUrl = window.location.href
        dispatch(deleteSave(savedRecord.id))
        window.location.href = currentUrl
    }

    let tagInclude;
    if(savedRecord?.tag){
        tagInclude = (<div id='tag'>
            <p>{savedRecord.tag}</p>
        </div>)
    }else {<></>};
    const imageIcons = (<div id='photo-icons'>
                            {tagInclude}
                            <i className="fa-solid fa-circle-xmark" onClick={deleteNotes}></i>
                        </div>)
    const routeRecipeShow = () => {
       return history.push(`/recipes/${recipe.id}`)
    }

    return(
        <div id='index-item' key={recipe.id}>
            <div id='grid-image' onClick={routeRecipeShow}>
                <img src={recipe.photoUrl} alt='recipe-result'></img>
                {imageIcons}
            </div>
            <div id='recipe-item'>
                <div id='recipe-item-title'>
                    <p onClick={routeRecipeShow}>{recipe.name}</p>
                    <i className="fas fa-edit" onClick={editNotes}></i>
                </div>
                <div id='recipe-notes' onClick={editNotes}>
                    <p>{savedRecord.notes}</p>
                </div>
            </div>
        </div>
    )
}
