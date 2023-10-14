import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login/Login";
import MainLayout from "../../layout/MainLayout";
import AuthRequired from "../auth/AuthRequired";
import Dashboard from "../Dashboard/Dashboard";
import ClientPage from "../../pages/ClientPage/ClientPage";
import CreateAccountPage from "../../pages/CreateAccountPage/CreateAccountPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        // element: <PublicRoute />,
        children: [
          {
            path: "/auth",
            // element: <LogIn />,
            children: [
              {
                path: "login",
                element: <Login />,
              },
              //   {
              //     path: "register",
              //     element: <RegistrationForm />,
              //   },
              //   {
              //     path: "forget-password",
              //     element: <RenewPasswordForm />,
              //   },
            ],
          },
        ],
      },
      {
        element: <AuthRequired />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/clients/:clientId",
            element: <ClientPage />,
          },
          {
            path: "/clients/:clientId/create-account",
            element: <CreateAccountPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
