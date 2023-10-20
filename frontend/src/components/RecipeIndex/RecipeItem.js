import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { openModal } from "../../store/modal";
import { deleteSave, getSaves } from "../../store/saved";

export default function RecipeItem ({recipe}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const saved = window.location.pathname === '/saved'
    // console.log('recipeitem', recipe)
    const savedRecipes = useSelector(getSaves);
    // console.log('savedRecipes',Object.values(savedRecipes))
    const savedRecord = Object.values(savedRecipes).find(record=>{
            return record['recipe'].id === recipe.id
        })
    // console.log('savedRecord', savedRecord)

    const editNotes = () => {
        dispatch(openModal("saved", savedRecord.id))
    }

    const deleteNotes = () => {
        const currentUrl = window.location.href
        // console.log(currentUrl)
        dispatch(deleteSave(savedRecord.id))
        window.location.href = currentUrl
    }

    const time = recipe.timeRequired.replace(/[^0-9]/g, '');

    let tagInclude;
    if ((time<30)&(time>=5) && (!saved)) {
        tagInclude = (<div id='tag'>
                        <p>Quick</p>
                    </div>)
    } else if(savedRecord?.tag && saved){
        tagInclude = (<div id='tag'>
            <p>{savedRecord.tag}</p>
        </div>)
    }else {<></>};
    const imageIcons = (<div id='photo-icons'>
                            {tagInclude}
                            {saved ? <i className="fa-solid fa-circle-xmark" onClick={deleteNotes}></i> : <></>}
                        </div>)// fa-solid fa-x
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
                    {saved ? <i className="fas fa-edit" onClick={editNotes}></i> : <></>}
                </div>
                <div id='recipe-notes' onClick={editNotes}>
                    {saved ? <p>{savedRecord.notes}</p> : <></>}
                </div>
            </div>
        </div>
    )
}
