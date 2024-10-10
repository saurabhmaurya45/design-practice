import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AnimatedCounter } from "../pages";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'animated-counter',
                element: <AnimatedCounter />,
            },
        ],
    },
]);

export default routes