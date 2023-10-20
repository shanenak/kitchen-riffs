import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function RecipeItem ({recipe}) {
    const history = useHistory();

    const time = recipe.timeRequired.replace(/[^0-9]/g, '');

    let tagInclude;
    if ((time<30)&(time>=5)) {
        tagInclude = (<div id='tag'>
                        <p>Quick</p>
                    </div>)
    }else {<></>};
    const imageIcons = (<div id='photo-icons'>
                            {tagInclude}
                        </div>)
    const routeRecipeShow = () => {
       return history.push(`/recipes/${recipe.id}`)
    }

    return(
        <div id='index-item' key={recipe.id}>
            <div id='grid-image' onClick={routeRecipeShow}>
                <img src={recipe.photoUrl} alt='recipe-result'></img>
                {imageIcons}
            </div>
            <div id='recipe-item'>
                <div id='recipe-item-title'>
                    <p onClick={routeRecipeShow}>{recipe.name}</p>
                </div>
            </div>
        </div>
    )
}
