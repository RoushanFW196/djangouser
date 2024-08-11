import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import UserForm from './components/UserForm.jsx';
//import User from "./components/UserList.jsx";

const UserForm = lazy(() => import("./components/UserForm.jsx"));
const User = lazy(() => import("./components/UserList.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/userform",
    element: (
      <Suspense fallback="Loading....">
        <UserForm />
      </Suspense>
    ),
  },

  {
    path: "/userlist",
    element: (
      <Suspense fallback="Loading....">
        <User />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
