import React, { useState } from "react";
import SlidingPanel from "react-sliding-side-panel";

export default function Nav() {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div>
      <nav>
        <div className="nav-wrapper ">
          <a href="#!" className="logo">
            COVID-19 Tracker
          </a>
          <p data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons" onClick={() => setOpenPanel(true)}>
              menu
            </i>
          </p>

          <SlidingPanel type={"left"} isOpen={openPanel} size={30}>
            <div>
              <i
                className="material-icons close-panel"
                onClick={() => setOpenPanel(false)}
              >
                close
              </i>
              <ul
                style={{
                  paddingTop: "50px"
                }}
              >
                <li className="grey hoverable">
                  <a href="/" className="grey ">
                    Home
                  </a>
                </li>
                <li className="grey hoverable">
                  <a href="/countries" className="grey ">
                    All Countries
                  </a>
                </li>
                <li className="grey hoverable">
                  <a href="/news" className="grey ">
                    News
                  </a>
                </li>
                <li className="grey hoverable">
                  <a href="/timeline" className="grey ">
                    Timeline
                  </a>
                </li>
              </ul>
            </div>
          </SlidingPanel>
        </div>
      </nav>
    </div>
  );
}
