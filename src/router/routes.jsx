import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AnimatedCounter, AnimatedNumber } from "../pages";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'animated-counter',
                element: <AnimatedCounter />,
            },
            {
                path: 'animated-number',
                element: <AnimatedNumber />,
            },
        ],
    },
]);

export default routes