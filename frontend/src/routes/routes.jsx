import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Podcast from "../pages/Podcast";
import PodcastDetail from '../pages/PodcastDetail';
import PodcastResult from '../pages/PodcastResult';
import PodcastListen from '../pages/PodcastListen';
import Profile from "../pages/Profile";
import Dashboard from "../pages/Admin/Dashboard";
import PodcastAdmin from "../pages/Admin/Podcast";


export const publicRoutes = [
    {
        path:"/",
        element: Home,
        layout: null,
    },
    {
        path:"/about",
        element:About,
        layout: null,
    },
    {
        path:"/podcasts",
        element:Podcast,
        layout: null,
    },
    {
        path:"/login",
        element:Login,
        layout:"auth"
    },
    {
        path:"/podcasts/:id",
        element: PodcastDetail,
        layout: null,
    }
]

export const privateRoutes = [
    {
        path:"/results/:podcastId",
        element: PodcastResult,
        layout: null,
    },
    {
        path:"/podcasts/listen/:id",
        element: PodcastListen,
        layout: null,
    },
    {
        path:"/profile",
        element: Profile,
        layout: null,
    },
    {
        path:"/profile",
        element: Profile,
        layout: null,
    }
]

export const adminRoutes = [
    {
        path:"/dashboard",
        element: Dashboard,
        layout: null,
    },
    {
        path:"/admin/podcasts",
        element: PodcastAdmin,
        layout: null,
    }
]

