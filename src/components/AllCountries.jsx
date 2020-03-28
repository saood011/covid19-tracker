import React, { Component } from "react";
import mapValues from "lodash.mapvalues";

export default class AllCountries extends Component {
  state = { mydata: [] };
  componentDidMount() {
    const data = this.props.data;
    const arr = [];
    mapValues(...data, v => arr.push(v));
    const mydata = arr.sort((a, b) => b.total_cases - a.total_cases);
    this.setState({ mydata });
  }
  sortDeaths = () => {
    const data = this.props.data;
    const arr = [];
    mapValues(...data, v => arr.push(v));
    const mydata = arr.sort((a, b) => b.total_deaths - a.total_deaths);
    this.setState({ mydata });
    this.forceUpdate();
  };
  sortCases = () => {
    const data = this.props.data;
    const arr = [];
    mapValues(...data, v => arr.push(v));
    const mydata = arr.sort((a, b) => b.total_cases - a.total_cases);
    this.setState({ mydata });
    this.forceUpdate();
  };
  render() {
    return (
      <div>
        {this.state.mydata ? (
          <div>
            <table className="red darken-2 centered side-table-font ">
              <thead>
                <tr className="font-white">
                  <th colSpan="3">Worst affected countries</th>
                </tr>

                <tr className="font-white">
                  <th style={{ textAlign: "center" }}>Country</th>
                  <th className="total" onClick={this.sortCases}>
                    <span
                      class="material-icons arrow"
                      style={{ fontSize: "10px" }}
                    >
                      arrow_downward
                    </span>
                    Total cases
                  </th>
                  <th className="total" onClick={this.sortDeaths}>
                    <span
                      class="material-icons arrow"
                      style={{ fontSize: "10px" }}
                    >
                      arrow_downward
                    </span>
                    Total deaths
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.mydata.map((v, i) =>
                  i <= 8 ? (
                    <tr
                      key={v.ourid}
                      className={
                        i < 6 ? `red lighten-${i} ` : `deep-orange lighten-5`
                      }
                    >
                      <td style={{ textAlign: "center" }}>{v.title}</td>
                      <td>
                        <span className="td-flex">
                          <span>{v.total_cases}</span>

                          <span class="yellow blink darken-1 ">
                            +{v.total_new_cases_today}
                          </span>
                        </span>
                      </td>
                      <td>
                        <span className="td-flex">
                          <span>{v.total_deaths}</span>

                          <span class="grey">+{v.total_new_deaths_today}</span>
                        </span>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}
