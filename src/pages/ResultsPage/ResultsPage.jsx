import React ,{ useContext} from 'react'
import GameLoader from '../../components/GameLoader/GameLoader.jsx'
import { SearchContext } from '../../context/SearchContext.jsx'


const ResultsPage = () => {

  const { hasSearched } = useContext(SearchContext);

  return ( 
    <main>
      {hasSearched ? (
        <GameLoader />
      ) : (
        <h1>Search for a game:</h1>
      )}
    </main>
   )
}

export default ResultsPage