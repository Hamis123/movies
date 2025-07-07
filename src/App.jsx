import { useState } from 'react';
import Search from './components/search';
import Popular from './components/popular';
import TopRatedMovies from './components/trending';
import AllMovies from './components/allMovies';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Header />
      <center>
        <Search onSearch={setSearchTerm} />
      </center>
      <TopRatedMovies  />
      <Popular searchTerm={searchTerm} />
      <AllMovies searchTerm={searchTerm} />
      <Footer />
    </div>
  );
}

export default App;
