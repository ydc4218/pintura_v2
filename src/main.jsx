import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import './index.css';
import App from './App.jsx';
import UpdatePrompt from './UpdatePrompt.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <App />
      <UpdatePrompt />
    </HeroUIProvider>
  </StrictMode>
);
