import { Home, Auth } from '../components';

export const routes = [
    {
        path: "/",
        component: <Home />
    },
    {
        path: "/auth",
        component: <Auth />
    }
];