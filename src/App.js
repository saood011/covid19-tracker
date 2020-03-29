import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import MapChart from "./components/MapChart";
import Footer from "./components/Footer";
import TableCountries from "./components/TableCountries";
import News from "./components/News";
import Timeline from "./components/Timeline";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/timeline" component={Timeline} />
          <Route path="/news" component={News} />
          <Route path="/countries" component={TableCountries} />
          <Route exact path="/" component={MapChart} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
