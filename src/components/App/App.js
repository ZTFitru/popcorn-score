import './App.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Routes, Route } from "react-router-dom";
import CardVideos from '../CardVideos/CardVideos';
import Title from '../Title/Title.js';
import CardDetail from '../CardDetails/CardDetails';
import ErrorCard from '../ErrorCard/ErrorCard';
import { useState, useEffect } from 'react';

const App = () => {

  const [apiMovies, setApiMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
    }
    })
    .then(res => res.json())
    .then(res => setApiMovies(res.results))
    .catch(err => setError(err));
  },[])

  return (
    <main className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Title apiMovies={apiMovies} error={error}/>}/>
        <Route path='/movies/:id' element={<CardDetail  />}/>
        <Route path='/movies/:movie_id/videos' element={<CardVideos />}/>
        <Route path='*' element={<ErrorCard />} />
      </Routes>
      <Footer />
    </main>
  )

};

export default App;
