import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.tsx'
import Auth from './pages/Auth.tsx';
import Dashboard from './pages/Dashboard.tsx';
import NotFound from './pages/NotFound.tsx';
import ProjectPage from './pages/ProjectPage.tsx';
import ProjectSettings from './pages/ProjectSettings.tsx';
import ReleasePage from './pages/ReleasePage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import UserDataProvider from './contexts/UserDataContext.tsx';
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserDataProvider value={null}>
      <Routes>
            <Route path="/" element={<App />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/project/settings" element={<ProjectSettings />} />
            <Route path="/project/release" element={<ReleasePage />} />
            {/* Page Not Found*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  </StrictMode>,
)
