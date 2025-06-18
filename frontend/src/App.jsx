import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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
    </ BrowserRouter>
  )
}