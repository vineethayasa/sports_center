import { createBrowserRouter } from "react-router-dom";
// import AccountLayout from "../layouts/account";
// import ProtectedRoute from "./ProtectedRoute";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/main";
import Logout from "../pages/logout";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
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

  // {
  //   path: "/account",
  //   element: (
  //     <ProtectedRoute>
  //       <AccountLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [

  //   ],
  // },
]);

export default router;
