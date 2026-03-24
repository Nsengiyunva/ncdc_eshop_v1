import { NotFound } from "features/misc";
import { Login } from "features/auth/routes/Login";
import { Register } from "features/auth/routes/Register";
import { ForgotPassword } from "features/auth/routes/ForgotPassword";
import { ResetPassword } from "features/auth/routes/ResetPassword";

export const publicRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },

  { path: "*", element: <NotFound /> },
];
