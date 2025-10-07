import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Releases from "./pages/Releases";
import Player from "./pages/Player";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Songs from "./pages/Songs";
import { JSX } from "react";

export interface AppRoute {
  path: string;
  element: JSX.Element;
}

export const appRoutes: AppRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/auth", element: <Auth /> },
  { path: "/community", element: <Community /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/releases", element: <Releases /> },
  { path: "/player", element: <Player /> },
  { path: "/register", element: <Register /> },
  { path: "/shop", element: <Shop /> },
  { path: "/songs", element: <Songs /> },
  { path: "*", element: <NotFound /> },
];
