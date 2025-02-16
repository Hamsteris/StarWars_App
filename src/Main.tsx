import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <div>
      <App />
    </div>
  </StrictMode>
);
