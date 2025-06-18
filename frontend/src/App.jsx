import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

import MainTable from "./components/MainTable";
import Profile from "./components/profile/Profile";
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
  const [darkMode, setDarkMode] = useState(() => {
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
      <div className="min-h-screen bg-blue-50 dark:bg-black text-xs text-gray-900 dark:text-gray-100  p-4">
        <div className="container flex justify-end sticky top-0 mx-auto">
          <button
            onClick={toggleDarkMode}
            className="mt-2 p-2 bg-blue-200 dark:bg-gray-800 rounded"
          >
            <span>{darkMode ? '🌞 ' : '🌙 '}</span>
            <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
        <div className="container mx-auto">
          <RouterProvider router={appRouter} />
        </div>
        
      </div>
    </>
  )
}