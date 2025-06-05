import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importe os estilos globais, se você tiver
import Quiz from './Quiz'; // Importe o componente principal do Quiz

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>
);