import React, { useState, useEffect } from "react";
import $ from "jquery";
import mapValues from "lodash.mapvalues";

export default function TableCountries() {
  const [allCountriesData, setallCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    $.ajax({
      url: "https://thevirustracker.com/free-api?countryTotals=ALL",
      dataType: "json",
      success: function(data) {
        const arr = [];
        mapValues(...data.countryitems, v => arr.push(v));
        //   const cur = arr.filter(v => v.code === countryCode);
        console.log(arr);
        setallCountriesData(arr);
        setIsLoading(false);
      }
    });
  }, []);

  const sortDeaths = () => {
    setIsLoading(true);
    const mydata = [...allCountriesData].sort(
      (a, b) => b.total_deaths - a.total_deaths
    );
    console.log(mydata);
    setallCountriesData(mydata);
    setIsLoading(false);
  };
  const sortCases = () => {
    setIsLoading(true);
    const mydata = [...allCountriesData].sort(
      (a, b) => b.total_cases - a.total_cases
    );
    console.log(mydata);
    setallCountriesData(mydata);
    setIsLoading(false);
  };
  const sortNewCases = () => {
    setIsLoading(true);
    const mydata = [...allCountriesData].sort(
      (a, b) => b.total_new_cases_today - a.total_new_cases_today
    );
    console.log(mydata);
    setallCountriesData(mydata);
    setIsLoading(false);
  };
  const sortNewDeaths = () => {
    setIsLoading(true);
    const mydata = [...allCountriesData].sort(
      (a, b) => b.total_new_deaths_today - a.total_new_deaths_today
    );
    console.log(mydata);
    setallCountriesData(mydata);
    setIsLoading(false);
  };
  const sortRecovered = () => {
    setIsLoading(true);
    const mydata = [...allCountriesData].sort(
      (a, b) => b.total_recovered - a.total_recovered
    );
    console.log(mydata);
    setallCountriesData(mydata);
    setIsLoading(false);
  };
  const sortSerious = () => {
    setIsLoading(true);
    const mydata = [...allCountriesData].sort(
      (a, b) => b.total_serious_cases - a.total_serious_cases
    );
    console.log(mydata);
    setallCountriesData(mydata);
    setIsLoading(false);
  };
  return isLoading ? (
    <div style={{ minHeight: "100vh" }}>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  ) : (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <table className="centered grey lighten-2 all-countries-table ">
        <thead>
          <tr className="rt">
            <th>
              <div className="rotated nowidth">#</div>
            </th>
            <th style={{ verticalAlign: "bottom" }}>
              <div>Country</div>
            </th>
            <th>
              <div onClick={sortCases} className="rotated nowidth">
                <span class="material-icons ">unfold_more</span>
                <span>Total cases</span>
              </div>
            </th>
            <th>
              {" "}
              <div onClick={sortDeaths} className="rotated nowidth">
                <span class="material-icons ">unfold_more</span>
                Total deaths
              </div>
            </th>
            <th>
              {" "}
              <div onClick={sortNewCases} className="rotated nowidth">
                <span class="material-icons ">unfold_more</span>
                New Cases today
              </div>
            </th>
            <th>
              {" "}
              <div onClick={sortNewDeaths} className="rotated nowidth">
                <span class="material-icons ">unfold_more</span>
                New deaths today
              </div>
            </th>
            <th>
              {" "}
              <div onClick={sortRecovered} className="rotated nowidth">
                <span class="material-icons ">unfold_more</span>
                Total recovered{" "}
              </div>
            </th>
            <th>
              {" "}
              <div onClick={sortSerious} className="rotated nowidth">
                <span class="material-icons ">unfold_more</span>
                Serious cases
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {allCountriesData.map((v, i) => (
            <tr key={i + v.title}>
              <td>{i + 1}</td>
              <td>{v.title}</td>
              <td>{v.total_cases}</td>
              <td>{v.total_deaths}</td>
              <td
                className={
                  v.total_new_cases_today === 0 ? "" : "yellow darken-2"
                }
              >
                {v.total_new_cases_today}
              </td>
              <td
                className={v.total_new_deaths_today === 0 ? "" : "red darken-2"}
              >
                {v.total_new_deaths_today}
              </td>
              <td>{v.total_recovered}</td>
              <td>{v.total_serious_cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
