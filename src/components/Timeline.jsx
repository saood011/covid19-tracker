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
  const [country, setCountry] = useState("Germany");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    console.log(window.location.href.split("/")[4]);
    setCountry(window.location.href.split("/")[4]);
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://coronavirus-info.p.rapidapi.com/reportsperdatbycountry?name=${country}`,
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-info.p.rapidapi.com",
        "x-rapidapi-key": "34a2d04210msh2cafad6ffaa5cfcp123f7fjsn44bacbd4269d",
      },
    };

    $.ajax(settings).done(function (response) {
      const resultLength = response.history.length - 1;
      setcases(
        response.history.map((v, i) => {
          if (i !== resultLength) {
            return [
              moment(v.date).subtract(1, "days").format("L").slice(0, 5),
              v.cases,
            ];
          } else {
            return [0, 0];
          }
        })
      );
      setdeaths(
        response.history.map((v, i) => {
          if (i !== resultLength) {
            return [
              moment(v.date).subtract(1, "days").format("L").slice(0, 5),
              v.deaths,
            ];
          } else {
            return [0, 0];
          }
        })
      );
      setrecovered(
        response.history.map((v, i) => {
          if (i !== resultLength) {
            return [
              moment(v.date).subtract(1, "days").format("L").slice(0, 5),
              v.recovered,
            ];
          } else {
            return [0, 0];
          }
        })
      );
    }); /*   const dailyCases = (index) => {
          if (index === 0) {
            return Number(filteredAndSorted[index].cases);
          } else if (
            Number(filteredAndSorted[index].cases) >
            Number(filteredAndSorted[index - 1].cases)
          ) {
            return (
              Number(filteredAndSorted[index].cases) -
              Number(filteredAndSorted[index - 1].cases)
            );
          } else {
            return (
              Number(filteredAndSorted[index - 1].cases) -
              Number(filteredAndSorted[index].cases)
            );
          }
        };
        const dailyDeaths = (index) => {
          if (index === 0) {
            return Number(filteredAndSorted[index].deaths);
          } else {
            return Math.abs(
              Number(filteredAndSorted[index - 1].deaths) -
                Number(filteredAndSorted[index].deaths)
            );
          }
        };
        const dailyRecovered = (index) => {
          if (index === 0) {
            return Number(filteredAndSorted[index].recovered);
          } else {
            return Math.abs(
              Number(filteredAndSorted[index - 1].recovered) -
                Number(filteredAndSorted[index].recovered)
            );
          }
        }; */ /* setdeaths(filteredAndSorted.map((v) => [v.date, v.deaths]));
        setrecovered(filteredAndSorted.map((v) => [v.date, v.recovered]));  */ /* $.ajax({
      url: `${proxy}https://thevirustracker.com/timeline/map-data.json`,
      crossDomain: true,
      dataType: "json",
      success: function (data) {
        const filteredAndSorted = data.data
          .filter(
            (v) => v.countrycode === country && moment(v.date).month() === 3
          )
          .sort((a, b) => moment(a.date) - moment(b.date));
        console.log(filteredAndSorted);
        /*         setcases(filteredAndSorted.map((v) => [v.date, v.cases]));
         */ /* setcases(
          filteredAndSorted.map((v, i) => [
            moment(v.date).format("l").slice(0, -5).toString(),
            dailyCases(i),
          ])
        ); */ /*     setdeaths(
          filteredAndSorted.map((v, i) => [
            moment(v.date).format("l").slice(0, -5).toString(),
            dailyDeaths(i),
          ])
        );
        setrecovered(
          filteredAndSorted.map((v, i) => [
            moment(v.date).format("l").slice(0, -5).toString(),
            dailyRecovered(i),
          ])
        ); */
    /*         console.log(filteredAndSorted.map((v, i) => [v.date, dailyCases(i)]));
     */ setisLoading(false);
  }, [country]);

  return isLoading ? (
    <div style={{ minHeight: "90vh" }}>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  ) : (
    <div style={{ minHeight: "100vh", padding: "10px" }}>
      <h6 className="graph-flag">{country}</h6>
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
          data={[["Date", "Cases this day"], ...cases]}
          options={{
            chartArea: { width: "50%" },

            // Material design options
            legend: { position: "none" },

            vAxis: {
              title: "Number of total cases",
              min: 0,
            },
            chart: {
              title: "Daily cases",
              subtitle: "",
            },
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
          data={[["Date", "Deaths this day"], ...deaths]}
          options={{
            // Material design options
            legend: { position: "none" },
            hAxis: {
              title: "Date",
            },
            colors: ["#b0120a"],
            chartArea: { width: "80%", height: "70%" },
            vAxis: {
              title: "Number of Total deaths",
              min: 100,
            },
            chart: {
              title: "Daily deaths",
              subtitle: "",
            },
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
          data={[["Date", "Recovery this day"], ...recovered]}
          options={{
            // Material design options
            legend: { position: "none" },
            chartArea: { width: "100px", height: "100%" },
            hAxis: {
              title: "Date",
            },
            colors: ["#ff3"],
            chartArea: { width: "80%", height: "70%" },
            vAxis: {
              title: "Daily Recovered Cases",
              min: 100,
            },
            chart: {
              title: "Daily recovered cases",
              subtitle: "",
            },
          }}
          // For tests
        />
      </div>
    </div>
  );
}
