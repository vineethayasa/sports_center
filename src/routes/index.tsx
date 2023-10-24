import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/main";
import Logout from "../pages/logout";
import Articles from "../pages/articles";
import Matches from "../pages/matches";
import Notfound from "../pages/Notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Matches />
            <Articles />
          </>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
