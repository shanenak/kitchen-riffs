import { useDispatch, useSelector } from "react-redux"
import { getSavedRecipes } from "../../store/session";
import { useState } from "react";

import '../Modal/Modal.css'
import { deleteSave, updateSave } from "../../store/saved";
import { closeModal } from "../../store/modal";

export default function SavedForm() {
    const {form, id} = useSelector(state=> state.modal)
    const dispatch = useDispatch();
    const savedRecipes = useSelector(getSavedRecipes);
    const savedRecord = Object.values(savedRecipes).find(record=>{
            return record.id === id
        })

    const [notes, setNotes] = useState(savedRecord.notes);
    const [tag, setTag] = useState(savedRecord.tag);

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
                <h3> {savedRecord.recipe.name} </h3>
                <div id='saved-notes'>
                    <label for='notes'>Notes</label>
                    <textarea name="notes" id="notes" cols="30" rows="10" value={notes} onChange={(e)=>setNotes(e.target.value)}></textarea>
                </div>
                {/* TODO: Add logic for tags */}
                <div id='saved-tags'>
                    <label for='tag'>Tag</label>
                    <select>
                        <option>Default</option>
                    </select>
                </div>
                <button type="submit" onClick={handleSubmit}>Update</button>
                <button onClick={handleDelete}>Remove from Saved Recipes</button>
            </form>
        </div>
    )
}