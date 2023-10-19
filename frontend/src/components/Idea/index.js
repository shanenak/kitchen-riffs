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
                    <div id='idea-image'>
                        <img src={idea.thumbnail_url} alt='recipe-result'></img>
                    </div>
                    <div id='idea-item'>
                        <div id='idea-item-title'>
                            <p>{idea.name}</p>
                        </div>
                        <div id='idea-notes'>
                            <p>{idea.description}</p>
                        </div>
                        {/* <div id='direction'>
                            <h2 className='section-title'>Directions</h2>
                            { Object.values(idea.instructions).map((step, index)=> {
                                return (
                                    <div id='step-wrapper' key={index}>
                                        <h3 className='step-title'>Step {index+1}</h3>
                                        <p className='body-text'>{step['display_text']}</p>
                                    </div>
                                )
                            })}
                        </div> */}
                    </div>
                </div>
                )
            })
            
    }
    return (
        <div id='idea-page'>
            <h1 id='idea-intro'>We don't have exactly what you're looking for, so here's some inspiration based on your search selections.</h1>
            
            <div id='idea-list'>
            {renderPage}
            </div>
        </div>
    )
}