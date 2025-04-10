import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import PodcastDetail from '../pages/PodcastDetail';
import PodcastResult from '../pages/PodcastResult';
import PodcastListen from '../pages/PodcastListen';
import Login from '../pages/Login';
import { useEffect, useState } from 'react';
import { checkAuth } from '../services/authService';
import Protected from '../pages/Protected';

export default function AppRouter() {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/protected' element={<ProtectedRoute>
              <Protected />
            </ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/podcasts/:id" element={<ProtectedRoute>
              <PodcastDetail />
            </ProtectedRoute>} />
            <Route path="/results/:podcastId" element={<ProtectedRoute>
              <PodcastResult />
            </ProtectedRoute>} />
            <Route path="/podcasts/listen/:id" element={<ProtectedRoute>
              <PodcastListen />
            </ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

const  ProtectedRoute = ({ children })=> {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await checkAuth();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
}