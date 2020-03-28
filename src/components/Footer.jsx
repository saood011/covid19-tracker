import React from "react";
import logo from "./logo.svg";

export default function Footer() {
  return (
    <div>
      <footer class="red darken-3 font-white">
        <div class="footer container">
          <span className="footer-copyright">© 2020 Made by M Saood A</span>
          <a
            class="white-text linkedin text-lighten-4 right"
            href="https://www.linkedin.com/in/saoodakh/"
            target="blank"
          >
            <img src={logo} alt="Linkedin" width="20px" />
          </a>
        </div>
      </footer>
    </div>
  );
}
