import React, { useEffect } from "react";
import logo from "./logo.svg";
import CookieConsent from "react-cookie-consent";

export default function Footer() {
  useEffect(() => {}, []);
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
        debug={true}
      >
        This website uses cookies to enhance the user experience.{" "}
        <a
          href="https://www.privacypolicygenerator.info/live.php?token=JJbCUiLyhgQ2OW8h336IrZvIZNmWs3WU"
          style={{ fontSize: "10px" }}
          target="blank"
        >
          Privacy Policy
        </a>
      </CookieConsent>
      <footer class="red lighten-2 font-white">
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
