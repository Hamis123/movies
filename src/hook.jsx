import { useEffect, useState } from 'react';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzc1MDY0YzgyMTBkNjkzMGRkMzQ1MWJlM2EwZDFjNCIsIm5iZiI6MTc1MTA1NjgyMy4xNTgwMDAyLCJzdWIiOiI2ODVmMDFiNzU4OWY2ODdhZjU5MTU1MDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NGGztkY026WCAwWKt3HX8WBxMwPsrpewJsCN3M3R5c4`
  }
};

export default function MovieFetcher({ url, children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!url) return;

    setIsLoading(true);
    fetch(url, API_OPTIONS)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch movies');
        return res.json();
      })
      .then(data => {
        if (data.Response === 'False') {
          setErrorMessage(data.Error);
          setMovieList([]);
        } else {
          setMovieList(data.results || []);
          setErrorMessage('');
        }
        setIsLoading(false);  
      })
      .catch(err => {
        setErrorMessage('Error fetching movies, please try again');
        setMovieList([]);
        setIsLoading(false);  
      });
  }, [url]);

  return children({ movieList, isLoading, errorMessage });
}
