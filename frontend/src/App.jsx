import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import MainTable from "./components/MainTable";
import Profile from "./components/Profile";
import Error from "./components/Error";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainTable />,
    errorElement: <Error />
  },
  {
    path: 'students/:id',
    element: <Profile />,
    errorElement: <Error />
  }
]);
export default function App() {
  const [darkMode, setDarkMode] = useState(()=>{
    // Check if dark mode is already set in localStorage
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' ? true : false;
  });
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  return (
    <>
      <div className="min-h-screen bg-blue-50 dark:bg-black text-gray-900 dark:text-gray-100 mx-auto p-4">
        <div className="container flex justify-end sticky top-0">
          <button 
            onClick={toggleDarkMode} 
            className="mt-2 p-2 bg-blue-200 dark:bg-gray-800 rounded self-end"
          >
            <span>{darkMode ? '🌞 ' : '🌙 '}</span>
            <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
          </button>
  
        
        </div>
      <RouterProvider router={appRouter} />
      </div>
    </>
  )
}