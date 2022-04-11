import React, { useEffect } from 'react';

const Listing = ({ characters, loading, addToSelectedCharacters, removeFromSelectedCharacters, listingType }) => {
    useEffect(() => {
    }, [characters])
    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <ul className='list-group mb-4'>
            {characters.map(character => (
                <li key={character.id} className='list-group-item'>
                    <div className="row">
                        <div className="col-11">
                            {character.name}
                        </div>
                        {listingType !== "selected" ?
                            <div onClick={() => addToSelectedCharacters(character.id)} className="col-1 page-link"
                                style={{ color: "white", background: character.blocked === true ? "gray" : "green", borderRadius: "5px", cursor: !character.blocked ? "pointer" : "default" }}>+</div>
                            :
                            <div onClick={() => removeFromSelectedCharacters(character.id)} className="col-1 page-link"
                                style={{ color: "white", background: "red", borderRadius: "5px", cursor: "pointer" }}>-</div>
                        }
                    </div>
                </li>

            ))}

        </ul>
    );
};

export default Listing;