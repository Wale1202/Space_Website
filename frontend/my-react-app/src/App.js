import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const APOD = lazy(() => import('./pages/APOD'));
const MarsRover = lazy(() => import('./pages/MarsRover'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Placeholder components for future implementation
const EPICPage = lazy(() => import('./pages/Placeholder').then(module => ({ default: () => module.default('Earth Imagery (EPIC)', 'View stunning images of Earth from space') })));
const NEOPage = lazy(() => import('./pages/Placeholder').then(module => ({ default: () => module.default('Near Earth Objects', 'Track asteroids and comets passing near Earth') })));
const SearchPage = lazy(() => import('./pages/Placeholder').then(module => ({ default: () => module.default('NASA Image Search', 'Search NASA\'s vast image and video library') })));

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<div className="page-loader"><Loader size="large" message="Loading..." /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apod" element={<APOD />} />
              <Route path="/mars" element={<MarsRover />} />
              <Route path="/epic" element={<EPICPage />} />
              <Route path="/neo" element={<NEOPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;