import "./RandomScroller.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RandomScroller({ apiMovies }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const [movieList, setMovieList] = useState([]);
    
  function getRandomMovies(array, movie) {
    var index = [...array].sort(() => 0.5 - Math.random());
    return index.slice(0, movie);
  }
  
  useEffect(() => {
    if(apiMovies.length) {
      setMovieList(getRandomMovies(apiMovies, 5));
    }
  }, [apiMovies]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movieList.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [movieList]);

  return(
    <div className="outer-container">
        {movieList.map((movie, index) => (
          <Link to={ `/movies/${movie.id}` } 
            key={index} 
            className={`container ${currentIndex === index ? 
            "currentIndex" : "currentIndex currentIndex-hidden"}`}>
              <img src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path} alt={`Poster of the movie ${movie.title}`} className="random-movie-img"/>
              <h2 className={`random-movie-title ${movie.title}`}>{movie.title}</h2>
          </Link>
        ))}
      <span className="movie-index-dots">
        {movieList.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} 
            className={currentIndex === index ? 
            "index-dot" : "index-dot index-dot-inactive"}><span className="not-visible">*</span></button>
        ))}
      </span>
    </div>
  );
};

export default RandomScroller;