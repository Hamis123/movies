import MovieFetcher from '../hook';
import MovieCard from './movieCard';

export default function AllMovies({ searchTerm = '' }) {
  const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';

  return (
    <MovieFetcher url={url}>
      {({ movieList, isLoading, errorMessage }) => {
        const filteredMovies = movieList.filter(movie => 
          movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <section className="top-rated-section px-4 py-6">
            <h2 className="section-title text-white text-2xl font-bold mb-6">All Movies</h2>
            {isLoading ? (
              <p className="text-white">Loading...</p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <div className="flex flex-row flex-wrap justify-center gap-3 pt-5">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </section>
        );
      }}
    </MovieFetcher>
  );
}
