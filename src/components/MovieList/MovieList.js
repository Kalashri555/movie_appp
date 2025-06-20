import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';

import './MovieList.css';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const MovieList = ({ type, title, emoji }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc"
  });

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/movie/${type}?api_key=58b1f21257879921bda9fde7dd53da38`
      );
      const data = await response.json();
      setMovies(data.results);
      setFilterMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [type]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort, filterMovies]);

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter(
        (movie) => movie.vote_average >= rate
      );
      setFilterMovies(filtered);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className='movie_list' id={type}>
      <header className='align_center movie_list_header'>
        <h2 className='align_center movie_list_heading'>
          {title}{" "}
          <img src={emoji} alt={`${emoji} icon`} className='navbar_emoji' />
        </h2>
        <div className='align_center movie_list_fs'>
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />

          <select
            name='by'
            onChange={handleSort}
            value={sort.by}
            className='movie_sorting'
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            onChange={handleSort}
            value={sort.order}
            className='movie_sorting'
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className='movie_cards'>
        {movies?.length > 0 ? (
          filterMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </section>
  );
};

export default MovieList;
