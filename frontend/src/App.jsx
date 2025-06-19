import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import MainTable from "./components/MainTable";
import Profile from "./components/profile/Profile";
import Error from "./components/Error";
import Nav from "./components/Nav";

export default function App() {

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-blue-50 dark:bg-black text-xs text-gray-900 dark:text-gray-100  p-4">
        <Nav />
        <div className="container mx-auto">
          <Routes>
            <Route path={"/"} element={<MainTable />} />
            <Route path={"/students/:id"} element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>

      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ BrowserRouter>
  )
}