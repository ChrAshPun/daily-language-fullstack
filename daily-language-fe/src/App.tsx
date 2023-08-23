import React from 'react';
import './App.module.scss';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MatchGamePage from './pages/MatchGamePage';
import VerbConjugationPage from './pages/VerbConjugationPage';

const routes = [
  { path: '/', element: <HomePage />},
  { path: '/matchgame', element: <MatchGamePage />},
  { path: '/verbconjugation', element: <VerbConjugationPage />},
  { path: '*', element: <Navigate to="/" replace />},
]

const router = createBrowserRouter(routes, { basename: '/dailylanguage'})

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
