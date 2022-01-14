import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    fetch(`https://api.github.com/search/repositories?q=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setRepos(data.items)
      });

  }, [inputValue])
  return (
    <div>
      <form onSubmit={evt => {
        evt.preventDefault()
        setInputValue(evt.target.elements.query.value)
      }}>
        <input
          type="text"
          name="query"
          placeholder="Search"
        />
      </form>
      <ul>
        {repos.map(repo => {
          return <li key={repo.id}>
            <a href={repo.url}>{repo.name}</a>
            <p>{repo.description}</p>
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;
