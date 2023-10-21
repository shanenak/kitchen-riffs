import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import '../Modal/Modal.css'
import { deleteSave, getSaves, updateSave } from "../../store/saved";
import { closeModal } from "../../store/modal";
import Ingredients from "../RecipeShow/Ingredients";
import Preparation from "../RecipeShow/Preparation";

export default function SavedForm() {
    const {form, id} = useSelector(state=> state.modal)
    const dispatch = useDispatch();
    const savedRecipes = useSelector(getSaves);
    const savedRecord = savedRecipes[id]
    const recipe = savedRecord.recipe

    const [notes, setNotes] = useState(savedRecord.notes);
    const [tag, setTag] = useState(savedRecord.tag);

    const tagOptions = [...new Set(Object.values(savedRecipes).map(recipe => recipe['tag']))];

    const handleSubmit = (e)=>{
        dispatch(updateSave({save:{...savedRecord, notes, tag}}))
        dispatch(closeModal())
    }

    const handleDelete = (e)=> {
        dispatch(deleteSave(savedRecord.id))
        dispatch(closeModal())
    }

    return (
        <div id='saved-modal'>
            <form id='saved-form'>
                <h3> {recipe.name} </h3>
                <div id='saved-notes'>
                    <label htmlFor='notes'>Notes</label>
                    <textarea name="notes" id="notes" cols="30" rows="10" value={notes} onChange={(e)=>setNotes(e.target.value)}></textarea>
                </div>
                <div id='saved-tags'>
                    <label htmlFor='tags'>Tag</label>
                    <input type="text" list="tags" onChange={(e)=>setTag(e.target.value)} value={tag} maxLength="10"/>
                    <datalist id="tags">
                        {tagOptions.map((tag)=>{
                            return <option key={tag}>{tag}</option>
                        })}
                    </datalist>
                </div>
                <button type="submit" onClick={handleSubmit}>Save</button>
                <button onClick={handleDelete}>Delete</button>
            </form>
            <div id='saved-summary'>
                <Ingredients recipe={recipe}/>
                <Preparation recipe={recipe}/>
            </div>
        </div>
        )
    }
