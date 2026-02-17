import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Practice } from './pages/Practice';
import { Assessments } from './pages/Assessments';
import { Resources } from './pages/Resources';
import { Profile } from './pages/Profile';
import { TestChecklist } from './pages/TestChecklist';
import { ShipLock } from './pages/ShipLock';
import { Proof } from './pages/Proof';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="practice" element={<Practice />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />


          {/* PRP Testing & Shipping Workflows */}
          <Route path="prp/07-test" element={<TestChecklist />} />
          <Route path="prp/08-ship" element={<ShipLock />} />
          <Route path="prp/proof" element={<Proof />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
