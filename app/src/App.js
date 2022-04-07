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

    setTimeout(() => {
      setLoading(false);
    }, 1000)
    // .then(data => 
    //   console.log("data", data)
    //   // setCharacters(data)
    // )




  }, [currentPage, selectedCharacters]);



  const indexOfLastPost = currentPage * charactersPerPage;
  const indexOfFirstPost = indexOfLastPost - charactersPerPage;
  // const currentCharacters = characters.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  const addToSelectedCharacters = chacarterId => {
    let index = characters.findIndex(x => x.id === chacarterId);
    selectedCharacters.push(characters[index]);
    characters.splice(index, 1);
    setCharacters(characters);
    setSelectedCharacters(selectedCharacters);
    console.log("characters", characters)
    console.log("selectedCharacters", selectedCharacters)
  };

  const removeFromSelectedCharacters = chacarterId => {
    let index = selectedCharacters.findIndex(x => x.id === chacarterId);
    selectedCharacters.splice(index, 1);
    // setCharacters(characters);
    setSelectedCharacters(selectedCharacters);
    // console.log("characters", characters)
    // console.log("selectedCharacters", selectedCharacters)
  };

  const filterSelected = newCharacters => {
    for (let i = 0; i < newCharacters.length; i++) {
      let found = selectedCharacters.findIndex(x => x.id === newCharacters[i].id);
      if (found !== -1) {
        newCharacters.splice(i, 1);
        i++;
      }
    }
    console.log("newCharacters", newCharacters)
    // return newCharacters;
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
            <Listing characters={selectedCharacters} listingType={"selected"}
              removeFromSelectedCharacters={removeFromSelectedCharacters} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
