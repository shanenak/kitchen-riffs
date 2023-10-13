import { useSelector } from "react-redux"


export default function ViewRating ({rating}) {
    const sessionUser = useSelector(state => state.session.user)
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
                    </div>
                    <div>
                        <button id='edit-button' className={sessionUser?.id===rating.user.id ? "show" : "hide"}>Edit</button>
                    </div>
                </div>
            </div>
        )
}
