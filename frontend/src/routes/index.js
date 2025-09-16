import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // Adjust the path as needed
import Home from '../pages/Home';
import Login from '../pages/Login'; // Import the Login component
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "", // This will render Home for the root path "/"
        element: <Home />,
      },
      {
        path: "login", // Sub-route for "/login"
        element: <Login />,
      },
      {
        path: "forgot-password", // Sub-route for "/forgot-password" (lowercase and hyphen for consistency)
        element: <ForgotPassword />,
      },
      {
        path: "sign-up", // Sub-route for "/forgot-password" (lowercase and hyphen for consistency)
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
