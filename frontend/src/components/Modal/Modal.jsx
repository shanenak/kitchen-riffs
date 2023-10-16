import { useDispatch, useSelector } from "react-redux";
import SavedForm from "../SavedIndex/SavedForm";
import { closeModal } from "../../store/modal";

import './Modal.css'

export default function Modal () {
    const modal = useSelector(state=> state.modal)
    const dispatch = useDispatch();

    if (!modal){
        return null;
    }

    let component;
    switch (modal?.form) {
        case 'saved':
            component = <SavedForm />;
            break;
        case 'other':
            break;
        default:
            return null;
    }

    const handleClick = (e) => {
        dispatch(closeModal())
    }

    return (
        <div className="modal-background" onClick={handleClick}>
            <div className="modal-child" onClick={e=>e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
}