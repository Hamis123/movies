import MovieFetcher from '../hook';
import { Link } from 'react-router-dom';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function TopRatedMovies() {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

  return (
    <MovieFetcher url={url}>
      {({ movieList, isLoading, errorMessage }) => {
        const sortedMovies = [...movieList].sort((a, b) => b.vote_average - a.vote_average);
        const topMovies = sortedMovies.slice(0, 5);

        return (
          <section className="top-rated-section px-4 sm:px-6 lg:px-8 min-h-[400px] md:min-h-[600px] mb-8 md:mb-16 flex flex-col">
            <h2 className="section-title text-white text-2xl font-bold mb-4 relative z-10">Top Rated Movies</h2>
            {isLoading ? (
              <p className="text-white relative z-10">Loading...</p>
            ) : errorMessage ? (
              <p className="text-red-500 relative z-10">{errorMessage}</p>
            ) : (
              <div className="top-movies-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {topMovies.map((movie, index) => (
                  <div key={movie.id} className="top-movie-card">
                    <span className="movie-rank">{index + 1}</span>
                  <Link to={`/details/${movie.id}`}>
                    <img
                      src={IMG_BASE_URL + movie.poster_path}
                      alt={movie.title}
                      className="top-movie-poster w-full h-auto rounded relative z-10"
                    />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      }}
    </MovieFetcher>
  );
}