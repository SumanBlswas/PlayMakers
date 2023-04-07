import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Board from "../pages/Board";
import Navbar from "../components/Navbar";

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
      </Routes>
    </div>
  );
};

export default AllRoutes;
