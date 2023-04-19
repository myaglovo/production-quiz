import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Quiz from "./components/Quiz";
import Admin from "./components/Admin";
import { QuizProvider } from "./context/quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Quiz />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "test",
    element: <p>Тестовая информация</p>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuizProvider>
    <RouterProvider router={router} />
  </QuizProvider>
  //     <React.StrictMode>
  // </React.StrictMode>
);
