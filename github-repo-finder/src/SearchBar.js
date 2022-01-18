import React, { useState, useEffect } from 'react';
import './App.css';

function SearchBar() {
    const [inputValue, setInputValue] = useState("");
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)


    useEffect(() => {
        if (!inputValue) {
            return;
        }
        setIsLoading(true);

        //fetching the data
        fetch(`https://api.github.com/search/repositories?q=${inputValue}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setIsLoading(false)
                setRepos(data.items)
            })
            // catching the error
            .catch(err => {
                setIsLoading(false);
                setError(true)
                console.log(err)
            });
    }, [inputValue])

    return (
        <div>
            <form onSubmit={evt => {
                evt.preventDefault()
                setInputValue(evt.target.elements.query.value)
            }}>
                <div className="search-bar">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                    /></div>
            </form>

            {isLoading && <h2 className="loading">Loading...</h2>}
            {error && <div>Unexpected error occured while fetching data</div>}

            <ul>
                {/* maping over the results */}
                {repos.map(repo => {
                    return <li className="list" key={repo.id}>
                        <a className="repo-name" href={repo.url}>{repo.name}</a>
                        <p className="description">{repo.description}</p>
                        <h6>{repo.language}</h6>
                    </li>
                })}
            </ul>


        </div>
    );
}

export default SearchBar;