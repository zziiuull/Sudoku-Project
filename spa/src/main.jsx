import React from 'react'
import ReactDOM from 'react-dom/client'
import LogingPage from "../components/LoginPage.jsx"
import MainPage from '../components/MainPage.jsx'
import RegisterPage from '../components/RegisterPage.jsx'
import HistoryPage from '../components/HistoryPage.jsx'
import RankPage from '../components/RankPage.jsx'
import ErrorElement from '../components/ErrorElement.jsx'
import App from "./App.jsx"
import "./index.css"

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to ="/login"></Navigate>
    },
    {
      path: "/login",
      element: <LogingPage></LogingPage>,
    },
    {
      path: "/register",
      element: <RegisterPage></RegisterPage>
    },
    {
      path: "/main",
        element: <ProtectedRoute element={<MainPage></MainPage>}></ProtectedRoute>
    },
    {
      path: "/sudoku",
      children: [
        {
          path: "/sudoku/easy",
          element: <ProtectedRoute element={<App difficulty="easy"></App>}></ProtectedRoute>
        },
        {
          path: "/sudoku/medium",
          element: <ProtectedRoute element={<App difficulty="medium"></App>}></ProtectedRoute>
        },
        {
          path: "/sudoku/hard",
          element: <ProtectedRoute element={<App difficulty="hard"></App>}></ProtectedRoute>
        }
      ]
    },
    {
      path: "/rank",
      element: <ProtectedRoute element={<RankPage></RankPage>}></ProtectedRoute>
    },
    {
      path: "/history",
      element: <ProtectedRoute element={<HistoryPage></HistoryPage>}></ProtectedRoute>
    },
    {
      path: "*",
      element: <ErrorElement></ErrorElement>
    }        
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
)