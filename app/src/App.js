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
  const [charactersPerPage] = useState(55);
  const [totalCharacters, setTotalCharacters] = useState(0);

  useEffect(() => {

    setLoading(true)
    fetch(`/characters?currentPage=${currentPage}`,).then(
      response => response.json())
      .then((data) => [setTotalCharacters(data.data.total), filterSelected(data.data.results)])
      .catch((e) => console.log("error", e))

    // setTimeout(() => {
      setLoading(false);
    // }, 1000)



  }, [currentPage, selectedCharacters]);



  // const indexOfLastPost = currentPage * charactersPerPage;
  // const indexOfFirstPost = indexOfLastPost - charactersPerPage;
  // const currentCharacters = characters.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  const addToSelectedCharacters = characterId => {

    //pegar o elemento do array geral
    let index = characters.findIndex(x => x.id === characterId);
    // copiar o objeto para o array dos selecionados
    let modifiedSelected = [...selectedCharacters, characters[index]];
    setSelectedCharacters(modifiedSelected);

    let modifiedCharacters = characters.filter(character => character.id !== characterId);
    setCharacters(modifiedCharacters);

    // modifiedSelected.push(characters[index]);

    // console.log("modifiedSelected", modifiedSelected.length)
    // console.log("characters", characters)
    // const modifiedCharacters = characters.splice(index, 1);
    // console.log("modifiedCharacters", modifiedCharacters)
    // 
    // console.log("selectedCharacters", selectedCharacters)
    // const oldCharacters = characters;
  };

  const removeFromSelectedCharacters = characterId => {
    let index = selectedCharacters.findIndex(x => x.id === characterId);

    let modifiedSelectedCharacters = selectedCharacters.filter(character => character.id !== characterId);
    // selectedCharacters.splice(index, 1);
    setSelectedCharacters(modifiedSelectedCharacters);
  };

  const filterSelected = newCharacters => {
    for (let i = 0; i < newCharacters.length; i++) {
      let found = selectedCharacters.findIndex(x => x.id === newCharacters[i].id);
      if (found !== -1) {
        newCharacters.splice(i, 1);
        console.log("dound", newCharacters)
        // newCharacters.filter(character => character.id === selectedCharacters[found].id);
        i--;
      }
    }
    // let modifiedCharacters = characters.filter(character => character.id !== characterId);
    // setCharacters(modifiedCharacters);

    // console.log("newCharacters", newCharacters)
    setCharacters(newCharacters)
  }


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
