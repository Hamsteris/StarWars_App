import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/homePage/Home';
import Search from './pages/searchPage/Search';
import Contact from './pages/contactPage/Contact';
import CharacterTable from './pages/characterTablePage/CharacterTable';
import CharacterDetails from './pages/characterDetailsPage/CharacterDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/table" element={<CharacterTable />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
