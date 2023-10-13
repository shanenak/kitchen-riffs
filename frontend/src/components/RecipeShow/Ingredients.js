export default function Ingredients({recipe}){
    return (
        <div id='ingredients'>
            <h2 className='section-title'>Ingredients</h2>
            <p id='servings'>{recipe.servings} servings</p>
            <table>
                <tbody>
                    { recipe.ingredients.map(ingredient=>{
                        const metricFormatted = ingredient.metric ? ingredient.metric.replace("_", " ") : ""
                        const nameFormatted = ingredient.name ? ingredient.name.replace("_", " ") : ""
                        const ingredientFormatted = ingredient.amount ? (metricFormatted + " " + nameFormatted) : (nameFormatted+ ", " + metricFormatted)
                        return(
                            <tr key={ingredient.name}>
                                <td className='right-align'>{ingredient.amount}</td>
                                <td className='left-align'>{ingredientFormatted}</td>
                            </tr>
                        ) 
                    })}
                </tbody>
            </table>
        </div>
    )
}