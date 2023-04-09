import AllRoutes from "./AllRoutes/AllRoutes";
import Footer from "./components/Footer";

import React from "react";
export default function App() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#0f0c29] via-[#6060d5] to-[#0f0c29] h-screen">
        <AllRoutes />;
      </div>
      <Footer />
    </>
  );
}
