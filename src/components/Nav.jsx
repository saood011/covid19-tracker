import React, { useState } from "react";
import SlidingPanel from "react-sliding-side-panel";

export default function Nav() {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div>
      <nav>
        <div className="nav-wrapper ">
          <a href="/" className="logo">
            COVID-19 Tracker
          </a>
          <a
            href="/"
            className="navItem grey waves-effect waves-yellow btn-small margin-left hoverable "
          >
            Home
          </a>
          <a
            href="/countries"
            className="navItem grey waves-effect waves-yellow btn-small margin-left hoverable "
          >
            Countries
          </a>
          <a
            href="/news"
            className=" navItem grey waves-effect waves-yellow btn-small margin-left hoverable "
          >
            News
          </a>
          <a
            href="/timeline"
            className="navItem grey waves-effect waves-yellow btn-small margin-left hoverable "
          >
            Timeline
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
                    Countries
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
