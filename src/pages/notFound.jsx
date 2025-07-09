import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-8xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4 text-gray-700">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
      Back to home
      </Link>
    </div>
  );
}

export default NotFound;
