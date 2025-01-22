import { useState, useEffect } from "react";
import "./CardVideos.css";
import { useParams } from "react-router-dom";

const CardVideos = () => {
  const { movie_id } = useParams();
  const [apiMovie, setApiMovie] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
    }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch videos.');
        return res.json();
      })
      .then((data) => setApiMovie(data.results)) 
      .catch((err) => setError(err.message)); 
  }, [movie_id]);

  return (
    <div className="trailer-cont">
      {error && <p className="error-message">{error}</p>}
      <div className="trailer">
        {apiMovie.map((movie) => (
          <div key={movie.key}>
            <h1>{movie.type}</h1>
            <iframe
              src={`https://www.youtube.com/embed/${movie.key}`}
              width={300}
              height={200}
              title={movie.type}
              allowFullScreen
            ></iframe>
          </div>
        ))}
        {apiMovie.length === 0 && !error && <p>No videos available</p>}
      </div>
    </div>
  );
};

export default CardVideos;