import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameStatsContextProvider } from './contexts/GameStatsContext';
import Home from 'pages/Home/Home';
import Rules from 'pages/Rules/Rules';

const App = () => {
  return (
    <GameStatsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </BrowserRouter>
    </GameStatsContextProvider>
  );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);
