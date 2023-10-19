import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchIdeas, getIdeas } from "../../store/idea";
import './Idea.css'

export default function Idea({ingredients}) {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchIdeas(ingredients))
    }, [dispatch])

    const ideas = useSelector(getIdeas)

    console.log('inside component', ideas)
    let renderPage = <></>;
    if(ideas){
        renderPage = ideas.map((idea)=>{
                return (
                <div id='index-item' key={idea.id}>
                    <div id='grid-image'>
                        <img src={idea.thumbnail_url} alt='recipe-result'></img>
                    </div>
                    <div id='recipe-item'>
                        <div id='recipe-item-title'>
                            <p>{idea.name}</p>
                        </div>
                        <div id='recipe-notes'>
                            <p>{idea.description}</p>
                        </div>
                    </div>
                </div>
                )
            })
            
    }
    return (
        <div id='idea-page'>
            <h1>We don't have exactly what you're looking for, so we've curated the list below based on your search selections.</h1>
            
            <div id='idea-list'>
            {renderPage}
            </div>
        </div>
    )
}