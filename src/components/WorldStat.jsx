import React, { useState, useEffect } from "react";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-minimal.css";
const proxy = "https://cors-anywhere.herokuapp.com/";

export default function WorldStat() {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch(`https://api.thevirustracker.com/free-api?global=stats`)
      .then((res) => res.json())
      .then((data) => {
        setState(data.results[0]);
        console.log(data.results[0]);
      });
  }, []);
  return (
    <div>
      <div class="row grey" style={{ margin: "0px" }}>
        <div
          class="col s6 m3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div class="card-stats card teal lighten-1 white-text ">
            <p style={{ margin: "0px" }}>Total Cases</p>
            <span className="card-stats card-title">
              <Odometer value={state.total_cases} format="(,ddd)" />
            </span>
          </div>
        </div>
        <div
          class="col s6 m3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div class="card-stats card red darken-3 white-text ">
            <p style={{ margin: "0px" }}>Total Deaths</p>
            <span className="card-stats card-title">
              <Odometer value={state.total_deaths} format="(,ddd)" />
            </span>
          </div>
        </div>
        <div
          class="col s6 m3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div class="card-stats card yellow darken-1  ">
            <p style={{ margin: "0px" }}>New Cases </p>
            <span className="card-stats card-title">
              <Odometer value={state.total_new_cases_today} format="(,ddd)" />
            </span>
          </div>
        </div>
        <div
          class="col s6 m3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div class="card-stats card grey darken-1 white-text ">
            <p style={{ margin: "0px" }}>New Deaths </p>
            <span className="card-stats card-title">
              <Odometer value={state.total_new_deaths_today} format="(,ddd)" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
