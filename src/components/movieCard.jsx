import { FaStar } from 'react-icons/fa';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  return (
    <div className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 bg-[#111827] text-white rounded-xl overflow-hidden shadow-md">
      <img
        src={IMG_BASE_URL + movie.poster_path}
        alt={movie.title}
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1 text-xs text-gray-300">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" /> {movie.vote_average.toFixed(1)}
          </span>
          <span>{movie.original_language.toUpperCase()}</span>
          <span>{movie.release_date?.slice(0, 4)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
