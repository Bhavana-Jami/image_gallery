import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { register } from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker
register({
  onUpdate: (registration) => {
    console.log('New version available');

    if (registration && registration.waiting) {
      const shouldReload = window.confirm(
        'New version available! Reload to update?'
      );

      if (shouldReload) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });

        // Ensure reload happens after SW activates
        registration.waiting.addEventListener('statechange', (event) => {
          if (event.target.state === 'activated') {
            window.location.reload();
          }
        });
      }
    }
  },
  onSuccess: () => {
    console.log('App is cached for offline use');
  }
});