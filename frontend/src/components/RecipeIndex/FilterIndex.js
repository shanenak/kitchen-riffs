import { useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function FilterIndex({filteredRecipes}) {
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const [searchText, setSearchText] = useState('');

    const filters = {};

    ['cuisine', 'meal', 'dish'].forEach((category)=>{
        filters[category] = searchParams.has(category) ? searchParams.get(category).toLowerCase() : null 
    });
    
    const resetSelect = (name) => {
        const selectElement = document.getElementById(`${name}-select`)
        selectElement.selectedIndex = 0;
    }

    const resetFilter = (e) => {
        if (Object.keys(filters)) {
            Object.keys(filters).forEach((category)=>{
                searchParams.delete(category)
                resetSelect(category)
            })
            history.replace({ search: searchParams.toString() });
        }
    }

    const setSearchParams = (e) => {
        e.preventDefault();
        if (e.target.name==="reset") {
            searchParams.delete(e.target.name)
        } else if (e.target.name==="search") {
            searchParams.append(e.target.name, searchText)
            setSearchText("")
        } else {
            searchParams.append(e.target.name, e.target.value)
        }
        history.replace({ search: searchParams.toString() });
    }      

    const deleteText = (e) => {
        e.preventDefault();
        setSearchText("")
    }

    const deleteSelection = (e) => {
        const prev = searchParams.getAll('search').filter((param)=>param!==e.currentTarget.getAttribute('name'))
        searchParams.delete("search")
        prev.forEach((param)=>searchParams.append('search', param))
        history.replace({ search: searchParams.toString() })
    }

    const options = {};
    let renderPage = <></>
    if (filteredRecipes) {
        ['cuisine', 'meal', 'dish'].forEach((category)=>{
            options[category] = [...new Set(filteredRecipes.map(recipe => recipe[category].toLowerCase()))];
        })

        renderPage = (
            <div id='filter-section'>
            <div id='filter-title'>
                <h3>Filter Results</h3>
                <p>{filteredRecipes.length} items</p>
            </div>
            <div id='filter-body'>
                <div id='filter-dropdowns'>
                    {Object.keys(filters).map(category=> {
                        return (
                            <label className="filter-inputs" key={category}>
                                <select name={category} onChange={setSearchParams} id={`${category}-select`} defaultValue={filters[category] ? filters[category] : category}>
                                    <option name={'reset'} value={"reset"}>{category}</option>
                                    {
                                        options[category].map(categoryOption=>{
                                            return <option value={categoryOption} key={categoryOption}>{categoryOption}</option>
                                        })
                                    }
                                </select>
                            </label>
                            )
                        })
                    }
                    <button onClick={resetFilter}>RESET</button>
                </div>
                <div id='filter-text'>
                    <form name='search' onSubmit={setSearchParams}>
                        <div className='input-container'>
                            <input className='input-box' type='text' onChange={(e)=>setSearchText(e.target.value)} placeholder='Search ingredients' value={searchText}></input>
                            <div id='search-icon'>
                                {searchText ? <i onClick={deleteText} className="fa-solid fa-x"></i> : <i className="fas fa-search"></i>}
                            </div>
                        </div>
                        <button id='hidden-submit' type='submit' className="hide"></button>
                    </form>
                </div>
            </div>
            <div id='filter-selections'>
                {searchParams.getAll('search').map((text)=>{
                    return (
                        <div className='ingred-selection-container' key={text}>
                            <p className='ingred-selection-box'>{text}</p>
                            <div className='delete-icon' onClick={deleteSelection} name={text}>
                                <i className="fa-solid fa-x"></i>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        )

    }


    return (
        renderPage
    )
}