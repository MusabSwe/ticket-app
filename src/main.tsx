import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { CartEventsProvider } from './store/CartContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartEventsProvider>
          <App />
      </CartEventsProvider>
    </BrowserRouter>
  </StrictMode>,
)
