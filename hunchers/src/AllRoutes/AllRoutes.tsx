import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Board from "../pages/Board";
import Navbar from "../components/Navbar";
import Room from "../pages/Room";
import Register from "../pages/RegisterOrLogin";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route
          path={"/board"}
          element={
            <>
              <Navbar />
              <Board />
            </>
          }
        />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/room"} element={<Room />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
