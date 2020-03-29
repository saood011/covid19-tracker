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

  const sortDeaths = async () => {
    const mydata = allCountriesData.sort(
      (a, b) => b.total_deaths - a.total_deaths
    );
    await setallCountriesData(mydata);
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
      <table className="centered striped all-countries-table ">
        <thead>
          <tr className="rt">
            <th>
              <div className="rotated nowidth">#</div>
            </th>
            <th style={{ verticalAlign: "middle" }}>
              <div>Country</div>
            </th>
            <th>
              <div className="rotated nowidth">Total cases</div>
            </th>
            <th>
              {" "}
              <div className="rotated nowidth">Total deaths</div>
            </th>
            <th>
              {" "}
              <div className="rotated nowidth">New Cases today</div>
            </th>
            <th>
              {" "}
              <div className="rotated nowidth">New deaths today</div>
            </th>
            <th>
              {" "}
              <div className="rotated nowidth">Total recovered </div>
            </th>
            <th>
              {" "}
              <div className="rotated nowidth">Serious cases</div>
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
