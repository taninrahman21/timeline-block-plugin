import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Support from './Pages/Support';



const App = ({ version }) => {
  const location = useLocation();

  useEffect(() => {
    // Show a toast notification on every route change
    toast.success(`Loaded`);
  }, [location]);
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/dashboard" element={<Dashboard version={version} />} />
        <Route path="/support" element={<Support />} />

        {/* When no routes match, it will redirect to this route path. Note that it should be registered above. */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </>
  )
}

export default App;