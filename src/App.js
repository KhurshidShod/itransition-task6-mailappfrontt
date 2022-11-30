import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Messages from './components/Messages.js';
import Login from './components/Login';

function App() {
  return (
    <React.Fragment>
      <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
