import { useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function FilterIndex({filtered_recipes}) {
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const [searchText, setSearchText] = useState('');

    const filters = {};

    ['cuisine', 'meal', 'dish'].forEach((category)=>{
        filters[category] = searchParams.has("cuisine") ? searchParams.get("cuisine").toLowerCase() : null 
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

    const options = {};
    ['cuisine', 'meal', 'dish'].forEach((category)=>{
        options[category] = [...new Set(filtered_recipes.map(recipe => recipe[category].toLowerCase()))];
    })

    const setSearchParams = (e) => {
        e.preventDefault();
        if (e.target.name==="reset") {
            searchParams.delete(e.target.name)
        } else if (e.target.name==="search") {
            searchParams.set(e.target.name, searchText)
        } else {
            searchParams.set(e.target.name, e.target.value)
        }
        history.replace({ search: searchParams.toString() });
    }      

    const deleteText = (e) => {
        e.preventDefault();
        setSearchText("")
        searchParams.delete("search")
        history.replace({ search: searchParams.toString() });
    }

    return (
        <div id='filter-section'>
            <div id='filter-title'>
                <h3>Filter Results</h3>
                <p>{filtered_recipes.length} items</p>
            </div>
            <div id='filter-body'>
                <div id='filter-dropdowns'>
                    {Object.keys(filters).map(category=> {
                        return (
                            <label className="filter-inputs">
                                <select name={category} onChange={setSearchParams} id={`${category}-select`} defaultValue={category}>
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
                            <input className='input-box' type='text' onChange={(e)=>setSearchText(e.target.value)} placeholder='Search' value={searchText}></input>
                            <div id='search-icon'>
                                {searchText ? <i onClick={deleteText} className="fa-solid fa-x"></i> : <i className="fas fa-search"></i>}
                            </div>
                        </div>
                        <button id='hidden-submit' type='submit' className="hide"></button>
                    </form>
                </div>
            </div>
        </div>
    )
}