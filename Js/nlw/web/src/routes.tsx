import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import OrphanagesMaps from './pages/OrphanagesMaps';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<OrphanagesMaps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
