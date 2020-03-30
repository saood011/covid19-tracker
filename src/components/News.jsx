import React, { useState, useEffect } from "react";
import $ from "jquery";
import mapValues from "lodash.mapvalues";
import moment from "moment";

export default function News() {
  const [state, setstate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState("in");
  useEffect(() => {
    setIsLoading(true);
    $.ajax({
      url: `https://thevirustracker.com/free-api?countryNewsTotal=${country}`,
      dataType: "json",
      success: function(data) {
        const arr = [];
        mapValues(...data.countrynewsitems, v => {
          if (
            moment(v.time).format("YYYY-MM-DD") ===
              moment().format("YYYY-MM-DD") &&
            v !== "ok"
          ) {
            arr.push(v);
          }
        });
        setstate(arr.reverse());
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
    <div style={{ paddingLeft: "20px" }}>
      <button
        class="waves-effect waves-light btn-small"
        value="in"
        onClick={e => setCountry(e.target.value)}
      >
        India
      </button>
      <button
        class="waves-effect waves-light btn-small"
        value="de"
        onClick={e => setCountry(e.target.value)}
      >
        germany
      </button>
      <button
        class="waves-effect waves-light btn-small"
        value="om"
        onClick={e => setCountry(e.target.value)}
      >
        Oman
      </button>
      <button
        class="waves-effect waves-light btn-small"
        value="it"
        onClick={e => setCountry(e.target.value)}
      >
        Italy
      </button>
      <button
        class="waves-effect waves-light btn-small"
        value="us"
        onClick={e => setCountry(e.target.value)}
      >
        USA
      </button>
      <div class="news-container">
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
