import React from "react";
import Navbar from "./components/Navbar.jsx";
const url = "http://localhost:3000";
import { Routes, Route } from "react-router-dom";

// ? These are the routes.

import { Home } from "./pages/Home.jsx";
import { ShowBeds } from "./pages/ShowBeds.jsx";
import { AddBeds } from "./pages/AddBeds.jsx";
import { DeleteBed } from "./pages/DeleteBed.jsx";
import { Error } from "./pages/Error.jsx";
import { Modal } from "./components/AdminView.jsx";
import { Footer } from "./components/Footer.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import AdminPage from "./pages/AdminPage.jsx";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/details" element={<ShowBeds />} />
          <Route path="/add" element={<AddBeds />} />
          <Route path="/delete" element={<DeleteBed />} />
          <Route path="/update" element={<Modal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
