import MovieFetcher from '../hook';
import MovieCard from './movieCard';
import { Link } from 'react-router-dom';

export default function Popular({ searchTerm }) {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

  return (
    <MovieFetcher url={url}>
      {({ movieList, isLoading, errorMessage }) => {
        const filteredMovies = movieList.filter(movie =>
          movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <section className="popular-section px-4 sm:px-6 lg:px-8 mt-8 lg:mt-0 block lg:block">
            <h1 className="font-bold text-2xl text-white mb-6 relative z-10">Popular Movies</h1>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {isLoading ? (
              <p className="text-white">Loading...</p>
            ) : (
              <div className="flex flex-row flex-wrap justify-center gap-3 pt-5">
                {filteredMovies.length > 0 ? (
                  filteredMovies.map(movie => (
                  <Link to={`/details/${movie.id}`}>
                  <MovieCard key={movie.id} movie={movie} />
                  </Link>                  ))
                ) : (
                  <p className="text-white">No movies found.</p>
                )}
              </div>
            )}
          </section>
        );
      }}
    </MovieFetcher>
  );
}