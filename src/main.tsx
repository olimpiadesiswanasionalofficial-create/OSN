// Guard against environments where window.fetch has only a getter
if (typeof window !== 'undefined') {
  try {
    let _fetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get() {
        return _fetch;
      },
      set(val) {
        _fetch = val;
      },
      configurable: true,
      enumerable: true,
    });
  } catch (_e) {
    // Ignore if already configured
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
