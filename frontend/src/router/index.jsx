import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import PodcastDetail from '../pages/PodcastDetail';
import PodcastResult from '../pages/PodcastResult';
import PodcastListen from '../pages/PodcastListen';

export default function AppRouter() {
  return (
    <div>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
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