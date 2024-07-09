import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainScreen from "./MainScreen";
import ShowScreen from "./ShowScreen";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/hienthi.htm",
    element: <ShowScreen />,
  },
  {
    path: "/chamdiem.htm",
    element: <MainScreen />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
