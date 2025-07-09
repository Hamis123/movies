import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaStar, FaClock, FaCalendarAlt, FaGlobe, FaBuilding, FaEye, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  const fetchMovie = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzc1MDY0YzgyMTBkNjkzMGRkMzQ1MWJlM2EwZDFjNCIsIm5iZiI6MTc1MTA1NjgyMy4xNTgwMDAyLCJzdWIiOiI2ODVmMDFiNzU4OWY2ODdhZjU5MTU1MDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NGGztkY026WCAwWKt3HX8WBxMwPsrpewJsCN3M3R5c4`
      }
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const movieData = await response.json();
      setMovie(movieData);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('Error loading movie');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (isLoading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-xl text-white">Loading the film..</p>
      </div>
    </div>
  );

  if (errorMessage) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center bg-red-900 border border-red-700 rounded-xl p-8 max-w-md">
        <p className="text-xl text-red-200">Erreur: {errorMessage}</p>
      </div>
    </div>
  );

  if (!movie || !movie.title) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-white">movie not found</p>
      </div>
    </div>
  );

  return (
  <div className="min-h-screen  flex items-start justify-center py-16 px-4">
  <div className="max-w-4xl w-full mx-auto px-4">
        <div className="bg-gray-800 shadow-2xl overflow-hidden p-8 sm:p-12 m-4  space-y-8">


          <div className="relative">
            {movie.poster_path ? (
             <center>
                 <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-64 max-w-sm h-64  mx-auto "
              />
             </center>
            ) : (
              <div className="w-full h-96 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-xl">Pas d'image</span>
              </div>
            )}
            <center> 
            <div className="mt-5 bottom-4 left-4 right-4  p-4  shadow-md ">
              <span className="text-xl sm:text-4xl font-bold text-white ">{movie.title}</span>
            </div>

              {movie.tagline && (
                
                     <p className="text-gray-300 italic mt-1">"{movie.tagline}"</p>
              )}
            </center>

          </div>

          <br />

      <div className="space-y-8">

            <div className="flex flex-wrap gap-3  items-center justify-center">
              <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2  text-sm">
                <FaCalendarAlt />
                <span>{movie.release_date?.slice(0, 4)}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2  text-sm">
                  <FaClock />
                  <span>{movie.runtime} min</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2  text-sm">
                <FaStar />
                <span>{movie.vote_average?.toFixed(1)}/10</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white ">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || "Aucun synopsis disponible."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="bg-gray-700 rounded-xl p-4 space-y-2">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  Évaluation
                </h4>
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Note moyenne</span>
                  <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Votes</span>
                  <span className="font-semibold">{movie.vote_count?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Popularité</span>
                  <span className="font-semibold">{movie.popularity?.toFixed(0)}</span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl p-4 space-y-2">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaDollarSign className="text-green-400" />
                  Finances
                </h4>
                {movie.budget > 0 && (
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Budget</span>
                    <span className="font-semibold">${movie.budget?.toLocaleString()}</span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Recettes</span>
                    <span className="font-semibold">${movie.revenue?.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Statut</span>
                  <span className="font-semibold">{movie.status}</span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl p-4 space-y-2">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaEye className="text-blue-400" />
                  Informations
                </h4>
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Durée</span>
                  <span className="font-semibold">{movie.runtime} min</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Sortie</span>
                  <span className="font-semibold">{movie.release_date}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Langue originale</span>
                  <span className="font-semibold">{movie.original_language?.toUpperCase()}</span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl p-4 space-y-2">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaBuilding className="text-purple-400" />
                  Production
                </h4>
                {movie.production_companies?.slice(0, 3).map((company) => (
                  <div key={company.id} className="text-gray-300 text-sm">
                    {company.name}
                    {company.origin_country && (
                      <span className="text-gray-400 ml-2">({company.origin_country})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FaGlobe className="text-green-400" />
                Langues parlées
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.spoken_languages?.map((lang) => (
                  <span
                    key={lang.iso_639_1}
                    className="px-3 py-1 bg-gray-600 text-gray-200  text-sm"
                  >
                    {lang.english_name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Pays de production</h3>
              <div className="flex flex-wrap gap-2">
                {movie.production_countries?.map((country) => (
                  <span
                    key={country.iso_3166_1}
                    className="px-3 py-1 bg-blue-600 text-white  text-sm"
                  >
                    {country.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-purple-600 text-white  text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <Link to='/'>
            <center>
                <span className='bg-blue-800 p-2 '> ⇦ Back Home</span>
</center>
            </Link>
            

          </div>
        </div>

    </div>
    
      </div>
  );
}

export default MovieDetails;
