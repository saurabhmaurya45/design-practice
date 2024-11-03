import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  AnimatedCounter,
  AnimatedNumber,
  BubbleZoomEffect,
  MagnifiedDock,
} from "../pages";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "animated-counter",
        element: <AnimatedCounter />,
      },
      {
        path: "animated-number",
        element: <AnimatedNumber />,
      },
      {
        path: "bubble-zoom-effect",
        element: <BubbleZoomEffect />,
      },
      {
        path: "magnified-dock",
        element: <MagnifiedDock />,
      },
    ],
  },
]);

export default routes;
