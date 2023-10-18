export default function Preparation ( {recipe}) {
    let pageRender = <></>
    if (recipe?.directions){
        pageRender = (
            <div id='preparation'>
                <h2 className='section-title'>Preparation</h2>
                { recipe.directions.map((step, index)=> {
                    return (
                        <div id='step-wrapper' key={index}>
                            <h3 className='step-title'>Step {index+1}</h3>
                            <p className='body-text'>{step}</p>
                        </div>
                    )
                })}
            </div>
        )
    } 
    return (
        pageRender
    )
}