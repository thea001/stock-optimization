import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "./components/Login";
import { DashboardLayout } from "./components/DashboardLayout";
import { Ventes } from "./components/Ventes";
import { Stock } from "./components/Stock";
import { Predictions } from "./components/Predictions";
import { Users } from "./components/Users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to="/dashboard/ventes" replace /> },
      { path: "ventes", Component: Ventes },
      { path: "stock", Component: Stock },
      { path: "predictions", Component: Predictions },
      { path: "users", Component: Users },
    ],
  },
]);
