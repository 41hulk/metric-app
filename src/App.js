import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getCountries } from './redux/countries/country';
import Homepage from './pages/HomePage';
import Details from './pages/Details';
import Nav from './components/Navbar/Navbar';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
