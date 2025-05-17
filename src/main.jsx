
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';

let basename = "/";

if (import.meta.env.PROD) {
  // In a production build, VITE_BASE_URL is set in vite.config.js
  // For GitHub Pages, it will be /repository-name/
  // For other deployments, it might be just "/"
  basename = import.meta.env.BASE_URL || "/";
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
