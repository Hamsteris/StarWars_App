import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Contact from './pages/Contact';
import CharacterTable from './pages/CharacterTable';
import CharacterDetails from './pages/CharacterDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '64px' }}>
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
