import React, { useState, useEffect } from 'react';
import Listing from './components/Listing';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [initialData, setInitialData] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(10);
  const [totalCharacters, setTotalCharacters] = useState(0);

  useEffect(() => {

    setLoading(true)
    fetch(`/characters?currentPage=${currentPage}`,).then(
      response => response.json())
      .then((data) => checkResponse(data))
      .catch((e) => console.log("error", e))

    if (localStorage.hasOwnProperty('selectedCharactersStorage')) {
      let currentSelectedCharacters = {}
      currentSelectedCharacters = localStorage.getItem('@app-currentSelectedCharacters');
      currentSelectedCharacters = JSON.parse(currentSelectedCharacters);
      if (currentSelectedCharacters !== null) {
        setSelectedCharacters(currentSelectedCharacters)
      }
    }

  }, [currentPage]);

  const checkResponse = response => {
    if (response && response.code == 200) {
      setTotalCharacters(response.data.total);
      filterSelected(response.data.results);
    }
    else {
      alert("Erro ao conectar com o servidor");
    }
  };

  const filterSelected = (newCharacters, characterId) => {
    for (let i = 0; i < newCharacters.length; i++) {
      let found = selectedCharacters.findIndex(x => x.id === newCharacters[i].id);
      if (found !== -1) {
        newCharacters[i].blocked = true;
      }
      else if (characterId) {
        let characterRemoved = newCharacters.find(x => x.id === characterId);
        if (characterRemoved) characterRemoved.blocked = false;
      }
      else {
        newCharacters[i].blocked = false;
      }
    }

    setCharacters(newCharacters)
    setLoading(false);
  }



  const paginate = pageNumber => {
    window.scrollTo(0, 0)
    setCurrentPage(pageNumber.selected + 1);
  }

  const addToSelectedCharacters = characterId => {
    let index = characters.findIndex(x => x.id === characterId);
    if (characters[index].blocked) return;
    let modifiedSelected = [...selectedCharacters, characters[index]];
    setSelectedCharacters(modifiedSelected);
    localStorage.setItem('@app-currentSelectedCharacters', JSON.stringify(modifiedSelected));
    characters[index].blocked = true;
    setCharacters(characters);
  };

  const removeFromSelectedCharacters = characterId => {
    filterSelected(characters, characterId);
    let modifiedSelectedCharacters = selectedCharacters.filter(character => character.id !== characterId);
    setSelectedCharacters(modifiedSelectedCharacters);
    localStorage.setItem('@app-currentSelectedCharacters', JSON.stringify(modifiedSelectedCharacters))
  };


  return (
    <div className="App">
      <div className='container mt-5'>
        <h1 className='mb-3' style={{ color: 'red' }}>Marvel Characters</h1>
        <div className="row">
          <div className="col-6">
            <h3 className="mb-3">Available Characters</h3>
            <Listing characters={characters} addToSelectedCharacters={addToSelectedCharacters} loading={loading} />
            {!loading &&
              <Pagination
                charactersPerPage={charactersPerPage}
                totalCharacters={totalCharacters}
                paginate={paginate}
                currentPage={currentPage}

              />
            }
          </div>
          <div className="col-6">
            <h3 className="mb-3">Selected Characters</h3>
            <ul className='list-group mb-4'>
              {selectedCharacters.map(characterSelected => (
                <li key={characterSelected.id} className='list-group-item'>
                  <div className="row">
                    <div className="col-11">
                      {characterSelected.name}
                    </div>


                    <div onClick={() => removeFromSelectedCharacters(characterSelected.id)} className="col-1 page-link"
                      style={{ color: "white", background: "red", borderRadius: "5px", cursor: "pointer" }}>-</div>

                  </div>
                </li>

              ))}

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
