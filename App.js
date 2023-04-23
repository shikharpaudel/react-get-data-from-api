import React,{useState,useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[showMovie,setShowMovie] = useState([]);
  const[isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
 
  const clickHandler =useCallback(async function() {
    setIsLoading(true);
    setError(null);
  
    
  try{
    const response = await fetch('https://swapi.dev/api/films');
    if(!response.ok){
      throw new Error('something went wrong!!!');
    }
    const data =await response.json();
   
      const transfrredMovie = data.results.map(movieData =>{
        return{
        id:movieData.id,
        title:movieData.title,
        openingText:movieData.opening_crawl,
        releaseDate:movieData.release_date,
      };
      });
      setShowMovie(transfrredMovie);
      setIsLoading(false);
  }catch(error){
setError(error.message);
setIsLoading(false);
  }
},[]);
useEffect(()=>{
  clickHandler();
 },[clickHandler]);
{/*let content  =<p>Found no movies !</p>
if(showMovie.length > 0){
  content = <MoviesList movies={showMovie} />;
}
if(error){
  content = <p>{error}</p>;
}
if(isLoading){
  content =<p></p>
}*/}

  return (
    <React.Fragment>
      <section>
        <button onClick = {clickHandler}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading  && showMovie.length > 0 && <MoviesList movies={showMovie} />}
       {!isLoading && showMovie.length === 0 && !error && <p>No movies In List</p>}
       {isLoading &&  <p>Loading...</p>}
       {error && !isLoading &&  <p>{error}</p>}
      </section>
    </React.Fragment>
  );

  }
export default App;
