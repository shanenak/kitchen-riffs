import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function RecipeItem ({recipe}) {
    const time = recipe.timeRequired.replace(/[^0-9]/g, '');
    const quickTag = (<div id='tag'>
                    <p>Quick</p>
                </div>)
    const tagInclude = (time<30)&(time>=5) ? quickTag : <></>;
    return(
        <div id='recipe-item' key={recipe.id}>
            <div id='grid-image'>
                <img src={recipe.photoUrl} alt='recipe-result'></img>
                {tagInclude}
            </div>
            <NavLink to={`/recipes/${recipe.id}`}>
                {recipe.name}
            </NavLink>
        </div>
    )
}
