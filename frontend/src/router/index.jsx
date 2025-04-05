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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication =async () => {
      setIsLoading(true);
      try {
        await checkAuth();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  },[]);
  return (
    <div>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/protected" element={isAuthenticated ? <Protected /> : <Navigate to={"/login"}/>} />
            <Route path="/login" element={isAuthenticated ? <Navigate to={"/protected"}/>: <Login />} />
            <Route path="/podcasts/:id" element={<PodcastDetail />} />
            <Route path="/results/:podcastId" element={<PodcastResult />} />
            <Route path="/podcasts/listen/:id" element={<PodcastListen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}