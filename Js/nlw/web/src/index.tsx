import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Elemento #root ausente no documento.');

createRoot(container).render(<App />);
