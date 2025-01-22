import './Title.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RandomScroller from '../RandomScroller/RandomScroller';
import PropTypes from 'prop-types'

function Title({apiMovies, error}) {

  const [movieInput, setMovieInput] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([])
  

  useEffect(() => {
      if(movieInput) {
          const result = apiMovies.filter(movie => 
              movie.title.toLowerCase().includes(movieInput.toLowerCase())
          )
          setFilteredMovies(result)
      } else {
          setFilteredMovies(apiMovies)
      }
  }, [movieInput, apiMovies])

  return (
    <main className="App">
      {error && <p className='error-message'>{error}</p>}
      <section className="main-page-cont">
        <RandomScroller apiMovies={ apiMovies }/>
        <div className='search-input'>
          <label htmlFor='input-search'>
            <p  className='visually-hidden'>Search Bar</p>
            <input 
              type='text' 
              className='input-search'
              title='search-bar'
              placeholder='Search Movie...' 
              value={movieInput} onChange={(event) => setMovieInput(event.target.value)}/>
          </label>
        </div>
        <div className='movie-list'>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Link to={`/movies/${movie.id}`} className='movie' key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} alt={`Poster of the movie ${movie.title}`} />
                <p>{movie.title}</p>
                <p>⭐️ {movie.vote_average.toFixed(1)}</p>
              </Link>
            ))
          ) : (
            <p className='no-movie-message'>Sorry, can't find that movie.</p>
          )}
        </div>
      </section>
    </main>
  );
};

Title.propTypes = {
  apiMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired
    })
  ).isRequired,
  error: PropTypes.string
};

export default Title;