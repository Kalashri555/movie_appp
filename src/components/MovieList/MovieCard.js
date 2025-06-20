import React from 'react';
import './MovieCard.css';
import Star from '../../assests/star.png';

const MovieCard = ({ movie }) => {
  return (
    <a
      href={`https://www.themoviedb.org/movie/${movie.id}`}
      target='_blank'
      rel='noreferrer'
      className="movie_card"
    >
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
        alt='movie poster'
        className="movie_poster"
      />

      <div className="movie_details">
        <h3 className="movie_details_heading">{movie.original_title || movie.title}</h3>
        <div className="align_center movie_date_rate">
          <p>{movie.release_date}</p>
          <p>
            {movie.vote_average}
            <img src={Star} alt="star" className="card_emoji" />
          </p>
        </div>
        <p className="movie_description">
          {movie.overview?.slice(0, 100) + "..."}
        </p>
      </div>
    </a>
  );
};

export default MovieCard;
