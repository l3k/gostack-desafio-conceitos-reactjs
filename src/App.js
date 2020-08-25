import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'https://github.com/l3k',
      techs: ['Node.js', 'ReactJS', 'React Native']
    })

    const repository = response.data

    setRepositories([
      ...repositories,
      repository
    ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(response => {
      if (response.status === 204) {
        setRepositories(repositories.filter(repository => repository.id !== id ))
      }
    })  
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response)
      setRepositories(response.data)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
    
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
