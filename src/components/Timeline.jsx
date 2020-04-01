import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import $ from "jquery";
import moment from "moment";
import allCountriesData from "./allCountriesArray";
import { getEmojiFlag } from "countries-list";

const proxy = "https://cors-anywhere.herokuapp.com/";

export default function Timeline() {
  const [cases, setcases] = useState([]);
  const [deaths, setdeaths] = useState([]);
  const [recovered, setrecovered] = useState([]);
  const [country, setCountry] = useState("IN");
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    setCountry(window.location.href.slice(-2));
    $.ajax({
      url: `${proxy}https://thevirustracker.com/timeline/map-data.json`,
      dataType: "json",
      success: function(data) {
        console.log(
          data.data
            .filter(
              v => v.countrycode === country && moment(v.date).month() === 2
            )
            .sort((a, b) => moment(a.date) - moment(b.date))
            .map(v => [v.date, v.cases, v.deaths, v.recovered])
        );

        setcases(
          data.data
            .filter(
              v => v.countrycode === country && moment(v.date).month() === 2
            )
            .sort((a, b) => moment(a.date) - moment(b.date))
            .map(v => [
              moment(v.date)
                .date()
                .toString(),
              Number(v.cases)
            ])
        );
        setdeaths(
          data.data
            .filter(
              v => v.countrycode === country && moment(v.date).month() === 2
            )
            .sort((a, b) => moment(a.date) - moment(b.date))
            .map(v => [
              moment(v.date)
                .date()
                .toString(),
              Number(v.deaths)
            ])
        );
        setrecovered(
          data.data
            .filter(
              v => v.countrycode === country && moment(v.date).month() === 2
            )
            .sort((a, b) => moment(a.date) - moment(b.date))
            .map(v => [
              moment(v.date)
                .date()
                .toString(),
              Number(v.recovered)
            ])
        );
        setisLoading(false);
      }
    });
  }, [country]);

  return isLoading ? (
    <div>loading....</div>
  ) : (
    <div style={{ minHeight: "100vh", padding: "10px" }}>
      <h5 className="graph-flag">{getEmojiFlag(country)}</h5>
      <div style={{ margin: "10px", padding: "10px", background: "white" }}>
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="Bar"
          loader={
            <div class="progress">
              <div class="indeterminate"></div>
            </div>
          }
          data={[["March", "Total Cases"], ...cases]}
          options={{
            chartArea: { width: "50%" },

            // Material design options
            legend: { position: "none" },

            vAxis: {
              title: "Number of total cases",
              min: 0
            },
            chart: {
              title: "Infected cases growth in March",
              subtitle: ""
            }
          }}

          // For tests
        />
      </div>
      <div style={{ margin: "10px", padding: "10px", background: "white" }}>
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="Bar"
          loader={
            <div class="progress">
              <div class="indeterminate"></div>
            </div>
          }
          data={[["March", "Deaths"], ...deaths]}
          options={{
            // Material design options
            legend: { position: "none" },
            hAxis: {
              title: "March"
            },
            colors: ["#b0120a"],
            chartArea: { width: "80%", height: "70%" },
            vAxis: {
              title: "Number of Total deaths",
              min: 100
            },
            chart: {
              title: "Death growth in March",
              subtitle: ""
            }
          }}
          // For tests
        />
      </div>
      <div style={{ margin: "10px", padding: "10px", background: "white" }}>
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="Bar"
          loader={
            <div class="progress">
              <div class="indeterminate"></div>
            </div>
          }
          data={[["March", "Total Recovered"], ...recovered]}
          options={{
            // Material design options
            legend: { position: "none" },
            chartArea: { width: "100px", height: "100%" },
            hAxis: {
              title: "March"
            },
            colors: ["#ff3"],
            chartArea: { width: "80%", height: "70%" },
            vAxis: {
              title: "Recovered Cases growth in March",
              min: 100
            },
            chart: {
              title: "Number of recovered cases in March",
              subtitle: ""
            }
          }}
          // For tests
        />
      </div>
    </div>
  );
}
