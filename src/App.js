import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const options = {
      method: 'GET',
      url: 'https://advance-movie-api.p.rapidapi.com/api/v1/streamitfree/genres/comedy/1',
      headers: {
        'x-rapidapi-key': 'a382e22ad3msh2f0df04d804dc4fp123f1bjsn740c0d9b024a',
        'x-rapidapi-host': 'advance-movie-api.p.rapidapi.com',
        'X-RapidAPI-Proxy-Secret': '4d633e10-2ff4-11ef-a338-672c018612df'
      }
    };

    try {
      const response = await axios.request(options);
      setMovies(response.data.result.data || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const genres = ['Comedy', 'Drama', 'Action', 'Romance', 'Thriller', 'Horror'];

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Movie Finder</h1>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      <div className="movie-grid">
        {movies.filter(movie => selectedGenre === '' || movie.Genre.includes(selectedGenre)).map((movie) => (
          <div key={movie.imdb_id} className="movie-card">
            <img src={movie.Thumbnail} alt={movie.Title} />
            <div className="movie-info">
              <h2>{movie.Title}</h2>
              <p className="genre">{movie.Genre}</p>
              <p className="duration">Duration: {movie.Duration} min</p>
              <p className="release">Release: {movie.Release}</p>
              <p className="description">{movie.Description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;