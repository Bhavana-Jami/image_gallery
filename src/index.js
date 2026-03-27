import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    // Optional: Show notification when new version is available
    const answer = window.confirm(
      'New version available! Reload to update?'
    );
    if (answer) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }
});