import React from "react";

import "./App.css";
import Nav from "./components/Nav";
import MapChart from "./components/MapChart";
import Footer from "./components/Footer";
//const proxy = "https://cors-anywhere.herokuapp.com/";

function App() {
  return (
    <div>
      <Nav />
      <MapChart />
      <Footer />
    </div>
  );
}
export default App;
