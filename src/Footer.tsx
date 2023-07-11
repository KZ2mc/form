import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./Footer.css";
import "./All.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <a href="services" className="footer-link">
              <h5>Services</h5>
            </a>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <a href="services-local-moving" className="footer-link">
                  Local Moving
                </a>
              </li>
              <li>
                <a href="services-long-distance" className="footer-link">
                  Long Distance Moving
                </a>
              </li>
              <li>
                <a href="services-residential" className="footer-link">
                  Residential Moving
                </a>
              </li>
              <li>
                <a href="services-commercial" className="footer-link">
                  Commercial Moving
                </a>
              </li>
              <li>
                <a href="services-senior-moving" className="footer-link">
                  Senior Moving
                </a>
              </li>
              <li>
                <a href="services-packing" className="footer-link">
                  Packing Service
                </a>
              </li>
              <li>
                <a href="services-furniture-assembly" className="footer-link">
                  Furniture Assembly
                </a>
              </li>
              <li>
                <a href="services-heavy-items" className="footer-link">
                  Heavy Items Moving
                </a>
              </li>
              <li>
                <a href="services-storage" className="footer-link">
                  Short Term Storage
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Locations</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <a href="#" className="footer-link">
                  Bay Area Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  San Francisco Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Milbrae Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  San Mateo Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Daly City Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Pacifica Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Oakland Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Berkeley Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Emeryville Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Richmond Movers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Walnut Creek Movers
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Our Company</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Mission
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Values
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Contact Us</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <a href="#" className="footer-link">
                  Contact 1
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact 2
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact 3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
