// Main application wrapper with global routes and persistent header


import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import EntertainerList from './pages/EntertainerList';
import AddEntertainerForm from './pages/AddEntertainerForm';
import EditEntertainerForm from './pages/EditEntertainerForm';

import EntertainerDetails from './pages/EntertainerDetails';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
{/* Global navbar displayed across all pages */}
      <Header />
{/* Main content area */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entertainers" element={<EntertainerList />} />
        <Route path="/entertainers/:id" element={<EntertainerDetails />} />
        <Route path="/entertainers/new" element={<AddEntertainerForm />} />
        <Route path="/entertainers/:id/edit" element={<EditEntertainerForm />} />
      </Routes>
    </Router>
  );
}

export default App;
