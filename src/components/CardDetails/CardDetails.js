import './CardDetails.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const CardDetail = () => {
  const { id } = useParams();
  const [apiMovie, setApiMovie] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
    }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch movie details.');
        return res.json();
      })
      .then((data) => setApiMovie(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const showVideo = () => {
    navigate(`/movies/${id}/videos`);
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!apiMovie) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="movie-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${apiMovie.backdrop_path})`,
      }}
    >
      <div className="movie-wrap">
        <div className="movies">
          <img
            src={`https://image.tmdb.org/t/p/w200${apiMovie.poster_path}`}
            alt={apiMovie.title}
          />
        </div>
        <div className="movie-details">
          <h2>{apiMovie.title}</h2>
          <p>
            <span>Rating: </span>
            {apiMovie.vote_average}
          </p>
          <p>
            <span>Overview: </span>
            {apiMovie.overview}
          </p>
          <p>
            <span className="tag">Genre: </span>
            {apiMovie.genres.map((genre) => genre.name).join(', ')}
          </p>
          <p>
            <span>Release Date: </span>
            {apiMovie.release_date}
          </p>
          <p>
            <span>Runtime: </span>
            {apiMovie.runtime} Minutes
          </p>
          <p>
            <span>Tagline: </span>
            {apiMovie.tagline}
          </p>
          <button onClick={showVideo}>Trailers & Clips</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;