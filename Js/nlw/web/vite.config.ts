import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Servidores de desenvolvimento e preview escutam apenas em loopback:
// o app é um exercício de portfólio e não deve expor porta na rede local.
export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
});
