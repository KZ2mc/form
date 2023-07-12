import React, { useState, useEffect } from "react";
import Base from "./Base";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import "./All.css";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Removes image from the background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [activeButton, setActiveButton] = useState("local");
  const handleButtonClick = (buttonId: React.SetStateAction<string>) => {
    setActiveButton(buttonId);
  };

  const GetQuoteButton = () => {
    return (
      <button className="custom-button-light">
        <span className="button-text">Get Quote</span>
      </button>
    );
  };

  const HelloBlock = () => {
    return (
      <div className="wrapper">
        <div className="content-div px-5">
          <div className="row align-items-center">
            <div className="col-7">
              <h4>Reliable and Affordable Moving Company</h4>
              <br />
              We are a professional moving company that offers experienced movers for an affordable
              price. Be it a house, storage, or office, local, or long-distance move - our
              hard-working movers are ready to help you with all related needs. We are also here to
              help you with packing, assembling/reassembling furniture, and moving extra-heavy
              items.
            </div>
            <div className="col-5">
              <img
                className="img-fluid"
                src="src/img/hello-guy.webp"
                alt="Wellcome to KZ2 Moving Company"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ServicesBlock = () => {
    const Carousel = () => {
      const handleDragStart = (e: { preventDefault: () => any }) => e.preventDefault();
      const responsive = {
        0: {
          items: 1,
        },
        600: { items: 3, itemsFit: "contain" },
        1024: {
          items: 3,
          itemsFit: "contain",
        },
      };

      const items = [
        {
          src: "src/img/kz2-moving-company-long-distance-moving.webp",
          description: "Long Distance Moving",
        },
        {
          src: "src/img/kz2-moving-company-local-moving.webp",
          description: "Local Moving",
        },
        {
          src: "src/img/kz2-moving-company-heavy-items-moving.webp",
          description: "Heavy Items Moving",
        },
        {
          src: "src/img/kz2-moving-company-commercial-moving.webp",
          description: "Commercial Moving",
        },
        {
          src: "src/img/kz2-moving-company-residential-moving.webp",
          description: "Residential Moving",
        },
        {
          src: "src/img/kz2-moving-company-piano-moving.webp",
          description: "Piano Moving",
        },
        {
          src: "src/img/kz2-moving-company-furniture-assembly.webp",
          description: "Furniture Assembly",
        },
        {
          src: "src/img/kz2-moving-company-wrapping-for-storage.webp",
          description: "Wrapping for storage",
        },
        {
          src: "src/img/kz2-moving-company-item-protection.webp",
          description: "Item Protection",
        },
      ];

      const renderItems = () => {
        return items.map((item, index) => (
          <div key={index} className="carousel-item">
            <div className="image-description">{item.description}</div>
            <img
              src={item.src}
              alt={item.description}
              onDragStart={handleDragStart}
              role="presentation"
              className="framed-image"
            />
          </div>
        ));
      };

      return (
        <div className="carousel-container">
          <AliceCarousel
            disableButtonsControls
            disableDotsControls
            mouseTracking
            items={renderItems()}
            autoPlay
            autoPlayInterval={3000}
            infinite
            responsive={responsive}
          />
        </div>
      );
    };

    return (
      <div className="wrapper stripe-blue">
        <div className="d-flex flex-column align-items-center justify-content-center content-div">
          <h1>Professional Moving Services</h1>
          <p>Meeting your needs</p>

          <Carousel />

          <p>Packing, Furniture assembly, or Extra-heavy items - we are here to help you with it</p>
          <Button className="custom-button-light" href="#services">
            <span className="button-text">Our Services</span>
          </Button>

          <button className="custom-button-light">
            <span className="button-text">Our Services</span>
          </button>
        </div>
      </div>
    );
  };

  const MapBlock = () => {
    return (
      <div className="wrapper">
        <div className="d-flex flex-column align-items-center justify-content-center content-div">
          <h4>From San Francisco Bay Area to anywhere in the mainland US</h4>
          <img src="src/img/map.webp" className="img-fluid" />
          <h5>
            Whether you are looking for local movers or long-distance movers - you are in the right
            place!
          </h5>
        </div>
      </div>
    );
  };

  const BadgesBlock = () => {
    function getDaysSinceDate(targetDate: Date): number {
      const timeDiff = new Date().getTime() - targetDate.getTime(); // Difference in milliseconds
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
      return daysDiff;
    }

    const numCustomers = 120 + getDaysSinceDate(new Date("2021-01-01"));

    const renderNumberDigits = (number: number): React.ReactNode => {
      const digits = number.toString().split("");

      return digits.map((digit, index) => (
        <div className="col-3" key={index}>
          <img className="digit" src={`src/img/digits/${digit}.webp`} alt={digit} />
        </div>
      ));
    };

    return (
      <div className="wrapper">
        <div className="container text-center content-div">
          <div className="row">
            <div className="col-6">
              <div className="row p-3">
                <div className="col-5">
                  <a
                    href="https://www.yelp.com/biz/kz2-moving-company-san-francisco"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img className="badgee" src="src/img/yelp-badge.webp" alt="Yelp badge" />
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-5 pb-5 d-flex justify-content-end">
                  <img className="arrow" src="src/img/arrow0.png" alt="an arrow" />
                </div>
                <div className="col-5 pt-3">
                  <a
                    href="https://www.google.com/maps/place/KZ2+Moving+Company/@37.823457,-122.3681244,17.49z/data=!4m6!3m5!1s0xad28b8015c8f1f6d:0x8bcf0c6ded7cbb68!8m2!3d37.823983!4d-122.3667506!16s%2Fg%2F11j_2w01mv?entry=tts&shorturl=1"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img className="badgee" src="src/img/google-badge.webp" alt="Google badge" />
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="col-5">
                  <a
                    href="https://www.thumbtack.com/ca/san-francisco/movers/kz2-moving-company/service/421875656061206553"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                      className="badgee"
                      src="src/img/thumbtack-badge.webp"
                      alt="Thumbtack badge"
                    />
                  </a>
                </div>
                <div className="col-1"></div>
                <div className="col-5 pb-5 mb-5 d-flex justify-content-start">
                  <img className="arrow" src="src/img/arrow1.png" alt="an arrow" />
                </div>
              </div>

              <div className="row">
                <div className="col-3 pb-5 mb-5 d-flex justify-content-start">
                  <img className="arrow" src="src/img/arrow2.png" alt="an arrow" />
                </div>
                <div className="col-5">
                  <a
                    href="https://www.chamberofcommerce.com/business-directory/california/san-francisco/mover/2023389852-kz2-moving-company?source=memberwebsite"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                      className="badgee"
                      src="src/img/coc-badge.webp"
                      alt="Chamber of commerce badge"
                    />
                  </a>
                </div>
                <div className="col-4">
                  <img className="arrow" src="src/img/arrow3.png" alt="an arrow" />
                </div>
              </div>
            </div>
            <div className="col-6 pt-5">
              <p className="font-black text-end">
                <b>
                  The outstanding quality of our services helped us to build a great reputation on
                  the Internet. Having a business from returning customers and their friends allows
                  us to spend less on ads and keep our prices affordable
                </b>
              </p>
              <br />
              <div className="row digits-row">{renderNumberDigits(numCustomers)}</div>
              <h1 className="text-center font-black">Happy Customers</h1>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UsAndThemBlock = () => {
    return (
      <div className="wrapper">
        <div className="d-flex flex-column align-items-center justify-content-center content-div">
          <h4>
            Our pricing is easy to understand and includes everything you need for a smooth move
          </h4>
          <div className="clipboards">
            <img src="src/img/clipboards.webp" alt="companies comparison" className="img-fluid" />
          </div>
        </div>
      </div>
    );
  };

  const PricesBlock = () => {
    const renderContent = () => {
      if (activeButton === "local") {
        return <>{localCards}</>;
      } else if (activeButton === "long") {
        return <>{longDistanceCards}</>;
      } else if (activeButton === "heavy") {
        return <>{heavyItemsCards}</>;
      }

      return null;
    };

    const localCards = (
      <>
        <h4 className="p-3">Popular Choices</h4>
        <div className="row">
          <div className="col-3">
            <div className="price-card">
              <img src="src/img/2-movers.webp" alt="2 movers" className="img-fluid" />
              <p className="m-0">
                <b>2 movers</b>
              </p>
              <p className="m-0"> from $109/hr</p>
              <p className="m-0">For a Studio or 1-br</p>
            </div>
          </div>
          <div className="col-3">
            <div className="price-card">
              <img src="src/img/3-movers.webp" alt="3 movers" className="img-fluid" />
              <p className="m-0">
                <b>3 movers</b>
              </p>
              <p className="m-0">from $149/hr</p>
              <p className="m-0">For 1 or 2 bedroom</p>
            </div>
          </div>
          <div className="col-3">
            <div className="price-card">
              <img src="src/img/4-movers.webp" alt="4 movers" className="img-fluid" />
              <p className="m-0">
                <b>4 movers</b>
              </p>
              <p className="m-0">from $189/hr</p>
              <p className="m-0">For 2 or 3 bedroom</p>
            </div>
          </div>
          <div className="col-3">
            <div className="price-card">
              <div className="d-flex flex-column justify-content-center pt-5">
                <img src="src/img/more-movers.webp" alt="more movers" className="img-fluid pb-4" />
              </div>
              <p className="m-0">
                <b>More movers</b>
              </p>
              <p className="m-0">+ $40 ea mover</p>
              <p className="m-0">For larger relocations</p>
            </div>
          </div>
        </div>
        <br />
        <GetQuoteButton />
        <button className="custom-button-light">
          <span className="button-text">See Prices</span>
        </button>
      </>
    );

    const getLongCard = (city: string, price: string, description = "Next day delivery") => {
      return (
        <div className="col-3">
          <div className="price-card">
            <div className="bangers">
              Bay Area
              <p
                style={{
                  textAlign: "center",
                  paddingRight: city === "Los Angeles" ? "30px" : "0",
                }}>
                to
              </p>
              <p style={{ textAlign: "right" }}>{city}</p>
            </div>
            <p className="m-0">From ${price}</p>
            <p className="m-0">Everything included</p>
            <p className="m-0">{description}</p>
          </div>
        </div>
      );
    };

    const longDistanceCards = (
      <>
        {" "}
        <h4 className="p-3">Popular Destinations</h4>
        <div className="row">
          {getLongCard("Los Angeles", "2700", "Same day or overnight delivery")}
          {getLongCard("Portland", "3900")}
          {getLongCard("Seattle", "4800")}
          {getLongCard("Phoenix", "4400")}
        </div>
        <br />
        <GetQuoteButton />
        <button className="custom-button-light">
          <span className="button-text">See Prices</span>
        </button>
      </>
    );

    const heavyItemsCards = (
      <>
        <h4 className="p-3">Common Heavy Items</h4>
        <div className="row">
          <div className="col-3">
            <div className="price-card">
              <img src="src/img/piano.webp" alt="piano" className="img-fluid" />
              <p className="m-0">
                <b>Piano</b>
              </p>
              <p className="m-0">from $400</p>
              <p className="m-0">+ $10/stairstep</p>
            </div>
          </div>
          <div className="col-3">
            <div className="price-card">
              <img src="src/img/safe.webp" alt="large safe moving" className="img-fluid" />
              <p className="m-0">
                <b>Large Safe</b>
              </p>
              <p className="m-0">from $200</p>
              <p className="m-0">+ $10/stairstep</p>
            </div>
          </div>
          <div className="col-3">
            <div className="price-card">
              <img
                src="src/img/treadmill.webp"
                alt="heavy treadmill moving"
                className="img-fluid"
              />
              <p className="m-0">
                <b>Heavy Treadmill</b>
              </p>
              <p className="m-0">from $100</p>
              <p className="m-0">+ $10/stairstep</p>
            </div>
          </div>
          <div className="col-3">
            <div className="price-card">
              <img
                src="src/img/other-heavy.webp"
                alt="other heavy items moving"
                className="img-fluid"
              />
              <p className="m-0">
                <b>Other Heavy Items</b>
              </p>
              <p className="m-0">from $100</p>
              <p className="m-0">Can be waived if rollable</p>
            </div>
          </div>
        </div>
        <p className="p-3">
          Items are considered extra heavy if they weight over 300 lbs or are very large in size and
          require 4+ movers to handle
        </p>
        <p>To get a quote for heavy items please send us an email or give us a call</p>
        <button className="custom-button-light">
          <span className="button-text">See Prices</span>
        </button>
      </>
    );

    return (
      <div className="wrapper stripe-blue">
        <div className="content-div">
          <div className="row p-3 justify-content-center">
            <div className="btn-group" style={{ width: "600px" }}>
              <button
                className={`selector-button ${activeButton === "local" ? "active" : ""}`}
                onClick={() => handleButtonClick("local")}>
                <span className="button-text">Local Move</span>
              </button>
              <button
                className={`selector-button ${activeButton === "long" ? "active" : ""}`}
                onClick={() => handleButtonClick("long")}>
                <span className="button-text">Long Distance</span>
              </button>
              <button
                className={`selector-button ${activeButton === "heavy" ? "active" : ""}`}
                onClick={() => handleButtonClick("heavy")}>
                <span className="button-text">Heavy Items</span>
              </button>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    );
  };

  const WhatsIncludedBlock = () => {
    const getGridItem = (image: string, description: string) => {
      return (
        <div className="col-md-4 col-sm-6 cell d-flex flex-column justify-content-end pt-3">
          <img src={image} alt={description} className="img-fluid item-col" />
          <p className="text-center mt-3 item-text">{description}</p>
        </div>
      );
    };

    return (
      <div className="wrapper">
        <div className="content-div">
          <div className="row align-items-center justify-content-center">
            <div className="col-2"></div>
            <div className="col-2">
              <div className="row">
                <img className="img-fluid" src="src/img/transparent-prices.webp" />
              </div>
              <div className="row">
                <h5 className="text-center mt-3">Our transparent rates include:</h5>
              </div>
            </div>

            <div className="col">
              <div className="d-flex flex-column align-items-center justify-content-center content-div">
                <div className="row">
                  {getGridItem("src/img/wardrobe.webp", "Wardrobe boxes")}
                  {getGridItem("src/img/truck.webp", "Moving Truck")}
                  {getGridItem("src/img/insurance.webp", "Insurance")}
                </div>
                <div className="row">
                  {getGridItem("src/img/packing-supplies.webp", "Boxes & Supplies")}
                  {getGridItem("src/img/moving-blankets.webp", "Moving Blankets")}
                  {getGridItem("src/img/floor-protection.webp", "Floor Protection")}
                </div>
                <div className="row">
                  {getGridItem("src/img/furniture-assembly.webp", "Furniture Assembly")}
                  {getGridItem("src/img/packing-service.webp", "Packing Service")}
                  {getGridItem("src/img/tax.webp", "Taxes")}
                </div>
              </div>
            </div>
          </div>
          <br />
          <h6>
            Each of our teams is equipped with heavy-duty scratch-free dollies, hoisting and cargo
            straps, and a variety of tools to disassemble most kinds of furniture and sport
            equipment
          </h6>
        </div>
      </div>
    );
  };

  const ReviewsBlock = () => {
    const Carousel = () => {
      const handleDragStart = (e: { preventDefault: () => any }) => e.preventDefault();
      const responsive = {
        0: {
          items: 1,
        },
        600: { items: 3, itemsFit: "contain" },
        1024: {
          items: 3,
          itemsFit: "contain",
        },
      };

      const items = [
        {
          name: "Marina T.",
          src: "src/img/Marina.webp",
          location: "Yountville, CA",
          reviews: "130",
          date: "6/26/2022",
          elite: "Elite 2021",
          source: "yelp",
          title: "Respectful and Efficient Movers",
          text: "I contacted KZ2 with very little notice, and they were kindly able to accommodate my need for an upcoming moving day. On moving day, they sent two men, who were amazing. I couldn't believe how quick, and efficiently they worked. Both men were respectful of my home, my belongings and quickly moved my items up 3 stories of indoor stairs without scuffing my walls. My sons and myself were incredibly pleased with the services. I highly recommend them.",
          link: "https://www.yelp.com/biz/kz2-moving-company-san-francisco?hrid=0EroNVISCxGu82Du8TH-IQ&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
        },
        {
          name: "Vince C.",
          src: "src/img/Vince.webp",
          location: "Cotati, CA",
          reviews: "286",
          date: "10/2/2021",
          elite: "",
          source: "yelp",
          title: "Super fast and careful movers",
          text: "I needed some last minute support from movers and reached to KZ2 on Yelp. Nick was super on top of it and worked with me quickly on a fair quote that I was very happy with. The movers arrived early, which was great. They parked, and brought materials up with them. They were happy, polite, super fast but super careful too! The truck was fully loaded in well under an hour with my things. On unloading, it was the same courteous careful speed into my house!",
        },
        {
          name: "Nikky M.",
          src: "src/img/Nikky.webp",
          location: "San Francisco",
          reviews: "14",
          date: "5/9/2021",
          elite: "",
          source: "google",
          title: "Professionalism, Quality, Responsiveness, Value",
          text: "I've used KZ2 moving company 3 times already and they've always done a great job. They've made the move efficient and timely each time. Friendly and trustworthy as well! I'll definitely be using them for future moves again.",
        },
        {
          name: "Carlos G.",
          src: "src/img/carlos.webp",
          location: "San Francisco",
          reviews: "25",
          date: "9/11/2021",
          elite: "",
          source: "yelp",
          title: "These guys are the BEST!!!",
          text: "They arrived on time, got right to work. Packed everything safely and we're consistently courteous. They made sure that everything arrived in one piece. We've got a lot of stuff that's delicate, but, all was safe and sound upon delivery. I highly recommend KZ2 Moving to anyone",
        },
        {
          name: "Lauren M.",
          src: "src/img/Lauren.webp",
          location: "San Francisco",
          reviews: "33",
          date: "4/11/2023",
          elite: "",
          source: "yelp",
          title: "Extremely attentive to detail and cautious",
          text: "Kz2 is the only moving company I'll use moving forward in my time in SF. They showed up RIGHT on time - like incredibly punctual. They were incredibly efficient and finished the job in under the minimum time. Extremely attentive to detail and cautious. Couldn't recommend them more highly!",
        },
        {
          name: "Christina Z.",
          src: "src/img/Christina.webp",
          location: "Sunnyvale, CA",
          reviews: "62",
          date: "4/17/2021",
          elite: "",
          source: "yelp",
          title: "Reasonable pricing",
          text: "The guys showed up on time and were friendly, respectful and professional and following masking and social distancing protocol which was important to me as we have a newborn. They got our entire belongings packed up super fast but also handled everything carefully. At our new house they just as swiftly unloaded and unpacked everything and reassembled our bed. Pricing was very reasonable and we were happy with the work",
        },
      ];

      const renderItems = () => {
        return items.map((item, index) => (
          <div key={index} className="review-card">
            <div className="row align-items-center font-black">
              <div className="col text-end">
                <b>{item.name}</b>
                <br />
                {item.location}
              </div>
              <div className="col-2 p-0">
                <img
                  className="img-fluid reviewer-icon"
                  src={item.src}
                  alt={`Review from ${item.name}`}
                  onDragStart={handleDragStart}
                  role="presentation"
                />
              </div>
              <div className="col text-start">
                <b>{item.reviews}</b> reviews
                <br />
                <span className="elite">{item.elite}</span>
              </div>
            </div>
            <div className="row align-items-center justify-content-center px-5">
              <div className="col-2"></div>
              <div className="col-8">
                <img className="img-fluid stars" src="src/img/stars.webp" alt="5-stars" />
              </div>
              <div className="col-2">
                <img
                  className="source-logo"
                  src={`src/img/${item.source}-logo.webp`}
                  alt="yelp logo"
                />
              </div>
            </div>
            <div>
              <br />
              <h6>
                <b>{item.title}</b>
              </h6>
              <div className="review-text">
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ));
      };

      return (
        <div className="carousel-container">
          <AliceCarousel
            disableButtonsControls
            disableDotsControls
            mouseTracking
            items={renderItems()}
            autoPlay
            autoPlayInterval={3000}
            infinite
            responsive={responsive}
          />
        </div>
      );
    };

    return (
      <div className="wrapper stripe-blue">
        <div className="d-flex flex-column align-items-center justify-content-center content-div">
          <h3>Our customers love us and recommend to their friends</h3>

          <Carousel />
        </div>
      </div>
    );
  };

  //===================================================//
  //<BackgroundImageDiv imageUrl="src/img/bg1.webp">{<p>Some content</p>}</BackgroundImageDiv>
  return (
    <div className={isScrolled ? "scrolled-background" : ""}>
      <Base>
        <div className="bg-div">
          <div className="empty">
            <div className="semi-transparent-div">
              <h1>KZ2 Moving Company</h1>
              <p>San Francisco and the Bay Area</p>
            </div>
          </div>
          <HelloBlock />
          <ServicesBlock />
        </div>
        <MapBlock />

        <PricesBlock />
        <UsAndThemBlock />
        <WhatsIncludedBlock />

        <ReviewsBlock />
        <BadgesBlock />
      </Base>
    </div>
  );
};

export default Home;
