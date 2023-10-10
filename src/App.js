import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import AddEvents from "./pages/AddEvents";
import Events from "./pages/Events";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home></Home>,
    },
    {
      path: "/add-event",
      element:<AddEvents></AddEvents>,
    },
    // {
    //   path: "/profile",
    //   element:<Events></Events>,
    // },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App;
