import React from "react";
import { Route, Routes } from "react-router-dom";
import Edit from "../components/Edit";
import Header from "../components/Header";
import Main from "../components/Main";
import Order from "../components/Order";
import ProtectRoute from "./ProtectRoute";

const Home = () => {
  return (
    <div className="grid home h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/order"
          element={
            <ProtectRoute>
              <Order />
            </ProtectRoute>
          }
        />
        <Route
          path="/admin/edit"
          element={
            <ProtectRoute>
              <Edit />
            </ProtectRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
