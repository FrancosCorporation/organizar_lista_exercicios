# Happy — Web (NLW #3)

Interface web do projeto **Happy** (Next Level Week #3 — Rocketseat), original de 2020, migrada de Create React App/Yarn para **Vite 8 + React 19 + TypeScript 5**.

## Requisitos

- Node.js **22.12+** (recomendado 22 ou 24)

## Executar localmente

```bash
npm ci        # instalação reproduzível a partir do package-lock.json
npm run dev   # desenvolvimento em http://127.0.0.1:5173 (apenas loopback)
```

## Verificações

```bash
npm run typecheck   # tsc --noEmit
npm run build       # build de produção em dist/
npm run check       # typecheck + build
```

## Notas da migração

- `react-scripts` (CRA 3.4.3) e o `yarn.lock` vulnerável foram removidos; o build agora é Vite.
- O mapa usa **OpenStreetMap** com atribuição, sem exigir chave Mapbox (`REACT_APP_MAPBOX_TOKEN` não é mais usada).
- `react-router-dom` v7 (`<Routes>`/`element`), `react-leaflet` v5 (`MapContainer`) e `createRoot` do React 19.
- Os servidores de desenvolvimento e preview escutam somente em `127.0.0.1` (ver `vite.config.ts`).
