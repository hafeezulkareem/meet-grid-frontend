import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeRoute from "./components/HomeRoute/HomeRoute";

const router = createBrowserRouter([{ path: "/", Component: HomeRoute }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
