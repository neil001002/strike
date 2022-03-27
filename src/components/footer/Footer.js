import "./Footer.css";
import React from "react";

const TWITTER_HANDLE = "neil001002";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const LENS_LINK = "https://lens.dev/";
const POLYGON_LINK = "https://polygon.technology/";

function Footer() {
  return (
    <div className="footer-container">
      <div>
        <a className="footer-text-left">Testnet </a>
        <a className="footer-text" href={POLYGON_LINK} target="_blank" rel="noreferrer">
          Polygon (MATIC)
        </a>
        <a> --- </a>
        <a className="footer-text" href={LENS_LINK} target="_blank" rel="noreferrer">
          Lens Protocol
        </a>
      </div>
      <div>
        <a className="footer-text-left">developed by </a>
        <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">
          sunil
        </a>
      </div>
    </div>
  );
}

export default Footer;
