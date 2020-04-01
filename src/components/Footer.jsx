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
        style={{ background: "#2B373B", fontSize: "10px" }}
        buttonStyle={{ color: "#4e503b", fontSize: "10px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience. By using this
        website, you hereby consent to the privacy policy, disclaimer and agree
        to its terms.
        <a
          href="https://www.privacypolicygenerator.info/live.php?token=JJbCUiLyhgQ2OW8h336IrZvIZNmWs3WU"
          style={{ fontSize: "10px", paddingRight: "5px", paddingLeft: "5px" }}
          target="blank"
        >
          Privacy Policy
        </a>
        <a
          href="https://www.disclaimergenerator.net/live.php?token=5aMP4kl8QUlnobveB6kv8CajYiEuexld"
          style={{ fontSize: "10px" }}
          target="blank"
        >
          Disclaimer
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
