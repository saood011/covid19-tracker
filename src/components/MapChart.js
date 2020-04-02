import React, { memo, useState, useEffect } from "react";
import $ from "jquery";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import AllCountries from "./AllCountries";
import mapValues from "lodash.mapvalues";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = cases => {
  if (cases < 100) return "#ffedea";
  else if (cases < 1000) return "#ffcec5";
  else if (cases < 5000) return "#ffad9f";
  else if (cases < 10000) return "#ff8a75";
  else if (cases < 20000) return "#ff5533";
  else if (cases < 30000) return "#e2492d";
  else if (cases < 50000) return "#be3d26";
  else if (cases < 85000) return "#9a311f";
  return "#782618";
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
  background: "grey"
};

const MapChart = () => {
  const proxy = "https://cors-anywhere.herokuapp.com/";

  const [state, setState] = useState({});
  const [allCountriesData, setallCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalCases = countryCode => {
    const arr = [];
    mapValues(...allCountriesData, v => arr.push(v));
    const cur = arr.filter(v => v.code === countryCode);
    return cur.length > 0 ? cur[0].total_cases : 0;
  };

  useEffect(() => {
    $.ajax({
      url: `${proxy}https://thevirustracker.com/free-api?countryTotals=ALL`,

      dataType: "json",
      // This is the important part
      success: function(data) {
        setallCountriesData(data.countryitems);
        console.log(data.countryitems);
        setState(data.countryitems);
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);
  }, [isLoading]);

  const clickedCountry = name => {
    const arr = [];
    mapValues(...allCountriesData, v => arr.push(v));
    const cur = arr.filter(v => v.code === name);
    setState(...cur);
    console.log(cur[0].title);
    //return cur.length > 0 ? cur[0].total_cases : 0;
    Swal.fire({
      html: `  <table class="striped centered table-font">
      <thead>
        <tr> 
        <th colspan='4' class='title'>
        ${cur[0].title.toUpperCase()}
        </th>
        </tr>
        <tr>
            <th>Total Cases</th>
            <th>Total Deaths</th>
            <th>New Cases Today</th>
            <th>New Deaths Today</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${cur[0].total_cases}</td>
          <td class='red font-white lighten-2 pulse'>${cur[0].total_deaths}</td>
          <td >${cur[0].total_new_cases_today}</td>
          <td class='red lighten-3 pulse'>${cur[0].total_new_deaths_today}</td>
        </tr>
      </tbody>
    </table>`,
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: true
    });
  };

  return isLoading ? (
    <div style={{ minHeight: "100vh" }}>
      <p className="white center">
        Under maintenance, please come back again later
      </p>
    </div>
  ) : (
    <div className="row" style={{ padding: "0px", margin: "0px" }}>
      <div className="col s12 m9" style={{ padding: "0px" }}>
        <div style={wrapperStyles}>
          <ComposableMap projectionConfig={{ scale: 200 }} height={602}>
            <Sphere stroke="#E4E5E6" strokeWidth={2} />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />

            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const arr = [];
                  mapValues(...allCountriesData, v => arr.push(v));
                  const cur = arr.filter(v => v.code === geo.properties.ISO_A2);
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
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
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
      <div className="col s12 m3" style={{ padding: "0px" }}>
        <AllCountries data={state} />
      </div>
    </div>
  );
};

export default memo(MapChart);
