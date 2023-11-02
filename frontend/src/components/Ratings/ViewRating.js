import { useDispatch, useSelector } from "react-redux"
import { deleteRating } from "../../store/rating";

export default function ViewRating ({rating}) {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        dispatch(deleteRating(rating))
        document.getElementById('confirm-submission').className="hide";
        document.getElementById('comment-input').className=""
        document.getElementById('submit-rating-button').className=""
    }

    return (
            <div id='rating-wrapper' key={rating.id}>
                <div id='comment'>
                    <p className='body-text' >{rating.comment}</p>
                </div>
                <div id='rating-footer'>
                    <div className='left-align'>
                        <h3 id='user-name'>{rating.user.name} </h3>
                        <div id='stars'>
                            {
                                [1, 2, 3, 4, 5].map((i)=> {
                                    if (i <= rating.rating) {
                                        return <p className="fa fa-star" key={`star-${i}`}></p>
                                    } else {
                                        return <p className="fa-regular fa-star" key={`star-${i}`}></p> 
                                    }
                                })
                            }
                        </div>
                        <i id='delete-review' className={`fa-solid fa-trash ${sessionUser?.id===rating.user.id ? "show" : "hide"}`} onClick={handleDelete}></i>
                    </div>
                </div>
            </div>
        )
}
