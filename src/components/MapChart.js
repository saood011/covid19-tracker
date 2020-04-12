import React, { memo, useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import AllCountries from "./AllCountries";
import mapValues from "lodash.mapvalues";
import WorldStat from "./WorldStat";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = (cases) => {
  if (cases < 50) return "#fffbfd";
  else if (cases < 1000) return "#ffcec5";
  else if (cases < 5000) return "#ffad9f";
  else if (cases < 10000) return "#ff8a75";
  else if (cases < 20000) return "#ff5533";
  else if (cases < 30000) return "#e2492d";
  else if (cases < 50000) return "#be3d26";
  else if (cases < 85000) return "#9a311f";
  else if (cases < 200000) return "#782618";
  return "#691b1b";
};

/* const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
}; */

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  background: "grey",
};

const MapChart = () => {
  const proxy = "https://cors-anywhere.herokuapp.com/";

  const [state, setState] = useState({});
  const [allCountriesData, setallCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalCases = (countryCode) => {
    const arr = [];
    mapValues(...allCountriesData, (v) => arr.push(v));
    const cur = arr.filter((v) => v.code === countryCode);
    return cur.length > 0 ? cur[0].total_cases : 0;
  };

  useEffect(() => {
    fetch(`https://api.thevirustracker.com/free-api?countryTotals=ALL`)
      .then((res) => res.json())
      .then((data) => {
        console.log("success");
        setallCountriesData(data.countryitems);
        console.log(data.countryitems);
        setState(data.countryitems);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);
  }, [isLoading]);

  const clickedCountry = (name) => {
    const arr = [];
    mapValues(...allCountriesData, (v) => arr.push(v));
    const cur = arr.filter((v) => v.code === name);
    setState(...cur);
    console.log(cur[0].title);
    //return cur.length > 0 ? cur[0].total_cases : 0;
    Swal.fire({
      html: `  
      <table style="width: '50%'" class="striped centered table-font">
      <thead>
        <tr> 
        <th colspan='2' class='title'>
        ${cur[0].title.toUpperCase()}
        </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total Cases</td>
          <td>${cur[0].total_cases}</td>
        </tr>
        <tr>
          <td>Total Deaths</td>
          <td class='red font-white lighten-2 pulse'>${cur[0].total_deaths}</td>
        </tr>
        <tr>
          <td>Total New Cases Today</td>
          <td >${cur[0].total_new_cases_today}</td>
        </tr>

        <tr>
          <td>Total New Deaths Today</td>
          <td class='red lighten-3'>${cur[0].total_new_deaths_today}</td>
        </tr>
        <tr>
        <td>Total Recovered</td>
        <td class='green'>${cur[0].total_recovered}</td>
        </tr>
      </tbody>
    </table>`,
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: true,
    });
  };

  return isLoading ? (
    <div style={{ minHeight: "100vh" }}>
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  ) : (
    <div className="row" style={{ padding: "0px", margin: "0px" }}>
      <WorldStat />

      <div className="col s12 m9" style={{ padding: "0px" }}>
        <div style={wrapperStyles}>
          <ComposableMap projectionConfig={{ scale: 200 }} height={530}>
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />

            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const arr = [];
                  mapValues(...allCountriesData, (v) => arr.push(v));
                  const cur = arr.filter(
                    (v) => v.code === geo.properties.ISO_A2
                  );
                  const cur1 = cur.length > 0 ? cur[0].total_cases : 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tip={`${geo.properties.NAME} - ${totalCases(
                        geo.properties.ISO_A2
                      )} infected`}
                      onClick={() => {
                        const { ISO_A2 } = geo.properties;
                        clickedCountry(ISO_A2);
                      }}
                      style={{
                        hover: {
                          fill: "#ff3",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                      fill={colorScale(cur ? cur1 : "#ddd")}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          <ReactTooltip />
        </div>
      </div>
      <div className="col s12 m3" style={{ padding: "0px", height: "100%" }}>
        <AllCountries data={state} />
      </div>
    </div>
  );
};

export default memo(MapChart);
