import React, { useState, useEffect } from "react";
import $ from "jquery";
import mapValues from "lodash.mapvalues";
import moment from "moment";
import { getEmojiFlag } from "countries-list";
import M from "materialize-css";
import allCountries from "./allCountriesArray";

export default function News() {
  const [state, setstate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState("de");
  useEffect(() => {
    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
  });

  useEffect(() => {
    setIsLoading(true);
    $.ajax({
      url: `https://thevirustracker.com/free-api?countryNewsTotal=${country}`,
      dataType: "json",
      success: function(data) {
        if ([data][0].results && [data][0].results[0].data === "none") {
          alert("Sorry, No news available!");
        } else {
          var arr = [];
          mapValues(...data.countrynewsitems, v => {
            if (
              (moment(v.time).format("YYYY-MM-DD") ===
                moment().format("YYYY-MM-DD") &&
                v !== "ok") ||
              (moment(v.time).format("YYYY-MM-DD") ===
                moment()
                  .subtract(1, "days")
                  .format("YYYY-MM-DD") &&
                v !== "ok")
            ) {
              arr.push(v);
            }
          });
          setstate(arr.reverse());
        }
        console.log(arr);
        setIsLoading(false);
      }
    });
  }, [country]);
  return isLoading ? (
    <div style={{ minHeight: "100vh" }}>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  ) : (
    <div>
      <div className="country-news-buttons">
        <button
          class="waves-effect waves-light btn-small news-button"
          value="in"
          onClick={e => setCountry(e.target.value)}
        >
          India {getEmojiFlag("IN")}
        </button>
        <button
          class="waves-effect waves-light btn-small news-button"
          value="de"
          onClick={e => setCountry(e.target.value)}
        >
          germany {getEmojiFlag("DE")}
        </button>
        <button
          class="waves-effect waves-light btn-small news-button"
          value="om"
          onClick={e => setCountry(e.target.value)}
        >
          Oman {getEmojiFlag("OM")}
        </button>

        <button
          class="waves-effect waves-light btn-small news-button"
          value="us"
          onClick={e => setCountry(e.target.value)}
        >
          USA {getEmojiFlag("US")}
        </button>
        <button
          class="waves-effect waves-light btn-small news-button"
          value="ca"
          onClick={e => setCountry(e.target.value)}
        >
          Canada {getEmojiFlag("CA")}
        </button>
        <button
          class="dropdown-trigger btn-small news-button"
          data-target="dropdown1"
        >
          Others
        </button>

        <ul id="dropdown1" class="dropdown-content ">
          {allCountries.array.map(v => (
            <li
              style={{
                fontSize: "x-small",
                padding: "2px"
              }}
              onClick={() => setCountry(v.code)}
            >
              <button
                className="waves-effect waves-light btn-small"
                title={v.name}
              >
                {getEmojiFlag(v.code)} {v.code}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div class="news-container">
        <h4
          style={{ width: "100%", textAlign: "center", background: "darkgrey" }}
        >
          {getEmojiFlag(country.toUpperCase())}
        </h4>
        {state.map((v, i) => (
          <div key={i} className="card">
            <div className="card-image">
              <img className="news-image" src={v.image} alt="news" />
              <a
                href={v.url}
                class="btn-floating halfway-fab waves-effect waves-light red"
                target="blank"
              >
                <i class="material-icons">link</i>
              </a>
            </div>
            <div class="card-content">
              <p>{v.title}</p>
            </div>
            <span className="news-time">{v.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
