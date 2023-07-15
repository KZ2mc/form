import React, { useState } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import Base from "./Base";
import "./All.css";
import { MyTextInputProps, QuoteFormValues, Request } from "./components/Interfaces";
import MySelect from "./components/MySelect";
import MyDateInput from "./components/MyDateInput";
import MyButton from "./MyButton";
import MyCheckbox from "./components/MyCheckbox";
import HelpIcon from "./components/HelpIcon";
import {
  STAIR_CHARGE,
  OTHER_HEAVY_ITEM_CHARGE,
  PIANO_W_MOVE_CHARGE,
  PIANO_CHARGE,
  CARD_RATE_INCREASE,
  MOVER_COST,
  GUN_SAFE_ROLLABLE,
  GUN_SAFE,
  SUMMER_PRICING,
  PRICING,
} from "./components/Rates.tsx";

const getQuoteApiURL = "https://api.kz2movingcompany.com:8443/quote_request";
let request: Request | null = null;

const GetQuote: React.FC = () => {
  const [gotResponse, setGotResponse] = useState(false);

  const QuoteForm: React.FC = () => {
    const initialValues: QuoteFormValues = {
      pickupZip: "",

      stopOneZip: "",
      destZip: "",

      moveSize: "",
      packing: false,
      piano: false,
      gunSafe: false,
      otherHeavyItem: false,
      selectedHeavyItems: [],
      date1: "",
      date2: "",
      date3: "",
    };

    const validationSchema = Yup.object().shape({
      pickupZip: Yup.string()
        .required("Required")
        .matches(/^\d{5}$/, "Invalid zip code"),
      destZip: Yup.string()
        .required("Required")
        .matches(/^\d{5}$/, "Invalid zip code"),
      moveSize: Yup.string().required("Required"),
      date1: Yup.date().required("Required"),
    });

    const onSubmit = async (values: QuoteFormValues, { setSubmitting }: any) => {
      console.log("Submitting initiated!");

      setSubmitting(true);

      // Packs Formik values into JSON and sends to the server API
      const data = {
        pickupZip: values.pickupZip,
        destZip: values.destZip,
        moveSize: values.moveSize,
        packing: values.packing,
        selectedHeavyItems: values.selectedHeavyItems,
        date1: values.date1,
        date2: values.date2,
        date3: values.date3,
      };

      try {
        const response = await fetch(getQuoteApiURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          request = await response.json();

          //DEBUG (Can't be used with the line above as the stream will be terminated)
          //const responseData = await response.text();
          //console.log("DEBUG:: Received API response: " + responseData);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
      setSubmitting(false); // Set submitting to false after the operation is complete
      setGotResponse(true);
    };

    const TextInput: React.FC<MyTextInputProps> = ({ ...props }) => {
      const { setFieldValue } = useFormikContext<QuoteFormValues>();
      const [field, meta] = useField(props);

      const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const formattedInput = input.replace(/[^0-9]/g, "");
        setFieldValue(`${e.target.name}`, formattedInput);
      };

      return (
        <>
          {props.label && (
            <label htmlFor={props.id || props.name} className="d-flex form-label fw-bold">
              {props.label}
            </label>
          )}
          <input
            className={`text-input form-control ${props.addclassname} ${
              meta.touched && meta.error ? "is-invalid" : ""
            }`}
            id={props.id || props.name}
            {...field}
            {...props}
            onChange={handleZipCodeChange}
          />
          {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
        </>
      );
    };

    return (
      <div style={{ width: "350px" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          <Form>
            <div className="text-center">
              <h2>Get Quote</h2>
              <div className="row pb-3">
                <div className="col">
                  <TextInput
                    label="From:"
                    minLength={5}
                    maxLength={5}
                    name="pickupZip"
                    type="text"
                    placeholder="Pickup Zip"
                  />
                </div>
                <div className="col">
                  <TextInput
                    label="To:"
                    minLength={5}
                    maxLength={5}
                    name="destZip"
                    type="text"
                    placeholder="Destination Zip"
                  />
                </div>
              </div>

              <div className="pb-3">
                <MySelect addclassname="position-relative" name="moveSize">
                  <option key="size-placeholder" value="" disabled>
                    Size of your move...
                  </option>
                  <option key="Few items" value="Few items">
                    Few items
                  </option>
                  <option key="Studio" value="Studio">
                    Studio
                  </option>
                  <option key="1-br" value="1-br">
                    1-bedroom
                  </option>
                  <option key="2-br" value="2-br">
                    2-bedroom
                  </option>
                  <option key="3-br" value="3-br">
                    3-bedroom
                  </option>
                  <option key="4-br" value="4-br">
                    4-bedroom
                  </option>
                  <option key="5+ br" value="5+ br">
                    5+ bedroom
                  </option>
                </MySelect>
              </div>

              <div className="ms-1 d-flex align-items-center pb-3">
                <MyCheckbox name="packing">
                  <b>Packing</b>
                </MyCheckbox>
                <div className="ms-0">
                  <HelpIcon helpMessage="Our team will wrap and pack into boxes small items such as kitchenware, electronics, frames, books, etc." />
                </div>
              </div>

              <label htmlFor="date1" className="d-flex form-check-label fw-bold">
                Preferred Dates:
              </label>
              <div className="row g-2 align-items-center mt-1" id="dates-block-1">
                <MyDateInput label="1st choice:" name="date1" optional={false} quote />
              </div>
              <div className="row g-2 align-items-center mt-1" id="dates-block-2">
                <MyDateInput label="2nd choice:" name="date2" optional={true} quote />
              </div>
              <div className="row g-2 align-items-center mt-1 pb-3" id="dates-block-3">
                <MyDateInput label="3rd choice:" name="date3" optional={true} quote />
              </div>
              <MyButton link="get-quote" text="Get Quote" submit dark />
            </div>
          </Form>
        </Formik>
      </div>
    );
  };

  const QuoteResponse: React.FC = () => {
    // TESTING PART:
    /*
    request = {
      pickup: "94044n",
      dropoff: "94130",
      name: "John Doe",
      redFlag: "",
      status: "Pending",
      date1Availability: "Available",
      date2Availability: "Available: Evening",
      date3Availability: "Booked",
      replyText: "Reply text",
      otherHeavyItems: "Other heavy items",
      estDrivingTime: "1 hr",
      estText: "Estimated text",
      estTotalTime: "5 hrs",
      estDDT: "2 hrs",
      bedrooms: 1,
      distance: 350,
      priority: 1,
      cost: 2700,
      workTime: 4,
      recomMovers: 2,
      recomRate: 100,
      estTotalCost: 357,
      estTotalCostCard: 394,
      isLong: false,
      doubleDrive: true,
      decision: true,
      pianoMove: true,
      offerDates: false,
      summerRate: false,
      packing: true,
      generalReply: false,
      travelTime: null,
      date1: "2023-08-01",
      date2: "2023-08-02",
      date3: "2023-08-03",
      alternativeDates: ["2023-08-10", "2023-08-11"],
    };
    */
    // END TESTING PART

    const elements: JSX.Element[] = [];
    if (request == null) {
      elements.push(<h4 className="py-5">Sorry, something went wrong :(</h4>);
      elements.push(
        <div key="btn" className="text-center">
          <MyButton link="get-quote" text="Go Back" dark />
        </div>
      );
    } else if (request.decision == false) {
      elements.push(
        <div className="py-5">
          <h4 className="text-center">
            Apologies, we won't be able to take the job at this time :(
          </h4>
          <p> If you believe this is a mistake, please double check the ZIP codes you've entered</p>
        </div>
      );
      elements.push(
        <div key="btn" className="text-center">
          <MyButton link="get-quote" text="Go Back" dark />
        </div>
      );
    } else {
      console.log(`DEBUG:: ${request}`);
      const includedList = (
        <ul>
          <li>Experienced movers</li>
          <li>Fully equipped truck (No extra charge for miles, tolls, or gas)</li>
          <li>Packing, boxes, and materials</li>
          <li>Floor protection</li>
          <li>Use of wardrobe boxes</li>
          <li>Protecting furniture with moving blankets</li>
          <li>Furniture disassemby/reassembly</li>
          <li>TV dismounting/mounting</li>
          <li>Insurance</li>
          <li>Taxes</li>
        </ul>
      );
      const highlightAvailability = (text: string) => {
        if (text === "Available") {
          return <span style={{ color: "green" }}>{text}</span>;
        } else if (text.includes("Morning") || text.includes("Evening")) {
          return <span style={{ color: "#E78B01" }}>{text}</span>;
        } else if (text === "Booked") {
          return <span style={{ color: "#A70000" }}>{text}</span>;
        } else {
          return text;
        }
      };

      const generateAvailabilitySection = () => {
        if (
          request != null &&
          request.alternativeDates != null &&
          request.alternativeDates.length != 0
        ) {
          //Safety check
          return (
            <div key="not available">
              <p>Unfortunately, we don't have availability on the requested dates.</p>
              <p className="mb-0">The closest available dates we have:</p>
              {request.alternativeDates.map((date, index) => (
                <p className=" text-center m-0 p-0" key={index}>
                  <b>{date}</b>
                </p>
              ))}
            </div>
          );
        }
        return <div key="unreachable"></div>; // Supposed to be unreachable
      };

      const generatePricingTextBlock = (): JSX.Element => {
        if (request != null) {
          const priceRange = request.summerRate ? SUMMER_PRICING : PRICING;
          let priceBlock: JSX.Element;
          const def = (
            <span>
              2 movers -{" "}
              <b>
                ${priceRange[0]}/{priceRange[0] + CARD_RATE_INCREASE}
              </b>{" "}
              per hour (cash/card),
              <br />3 movers -{" "}
              <b>
                ${priceRange[1]}/{priceRange[1] + CARD_RATE_INCREASE}
              </b>{" "}
              per hour (cash/card),
              <br /> 4 movers -{" "}
              <b>
                ${priceRange[2]}/{priceRange[2] + CARD_RATE_INCREASE}
              </b>{" "}
              per hour (cash/card).
              <br />
              Every consequent mover + <b>${MOVER_COST}</b>
              /hr
            </span>
          );

          if (request.generalReply) {
            priceBlock = def;
          } else {
            switch (request.recomMovers) {
              case 2:
                priceBlock = (
                  <span>
                    2 movers -{" "}
                    <b>
                      ${priceRange[0]}/{priceRange[0] + CARD_RATE_INCREASE}
                    </b>{" "}
                    per hour (cash/card)
                  </span>
                );
                break;
              case 3:
                priceBlock = (
                  <span>
                    3 movers -{" "}
                    <b>
                      ${priceRange[1]}/{priceRange[1] + CARD_RATE_INCREASE}
                    </b>{" "}
                    per hour (cash/card)
                  </span>
                );
                break;
              case 4:
                priceBlock = (
                  <span>
                    4 movers -{" "}
                    <b>
                      ${priceRange[2]}/{priceRange[2] + CARD_RATE_INCREASE}
                    </b>{" "}
                    per hour (cash/card)
                  </span>
                );
                break;
              case 5:
                priceBlock = (
                  <span>
                    5 movers -{" "}
                    <b>
                      ${priceRange[3]}/{priceRange[3] + CARD_RATE_INCREASE}
                    </b>{" "}
                    per hour (cash/card)
                  </span>
                );
                break;
              default:
                priceBlock = def;
                break;
            }
          }

          return (
            <div key="price-block-0">
              <p className="p-naked">Oure rate for {priceBlock}</p>
              <p className="p-naked">
                Note: 3 hours minimum, after that we charge in 15 min increments.
              </p>
            </div>
          );
        }
        return <div key="unreachable"></div>; // Unreachable
      };

      const estimateTimeAndCost = (): JSX.Element => {
        if (request) {
          if (request.generalReply || request.bedrooms == 0) return <></>;
          return (
            <div key="estimate-block">
              <h6>Here is a rough estimate for {request.recomMovers} movers and the cash rate:</h6>
              <p className="ps-3 mb-1">
                A {request.bedrooms}-br {request.packing && <span>with packing</span>} typically
                takes about {request.bedrooms + (request.packing ? 2 : 0)} hrs to load and unload.
              </p>
              {request.doubleDrive ? (
                <>
                  <p className="ps-3 mb-1">
                    Driving from {request.pickup} to {request.dropoff} will take about{" "}
                    {request.estDrivingTime}. With the Double-Drive policy, it will become{" "}
                    {request.estDDT}
                  </p>
                </>
              ) : (
                <p className="ps-3 mb-1">
                  Driving will take approximately {request.estDrivingTime}
                </p>
              )}
              {request.pianoMove && (
                <p className="ps-3 mb-1">
                  For the piano, we charge{" "}
                  <b>
                    ${PIANO_W_MOVE_CHARGE} + ${STAIR_CHARGE}
                  </b>
                  /stair step
                </p>
              )}
              <p className="ps-3 mb-1">
                Therefore, with the expected total time of {request.estTotalTime}
                {request.pianoMove && <span> and heavy the item fee</span>}, your total will be{" "}
                <b>${request.estTotalCost}</b>.
              </p>
              <p className="small">
                The approximation is based on similar jobs we had in the past. Your actual time will
                directly depend on the amount of stuff you have and working conditions and may
                differ from the approximation.
              </p>
            </div>
          );
        }
        return <div key="unreachable"></div>; // Unreachable
      };

      if (request.isLong) {
        // Quote for longs
        elements.push(
          <div key="long">
            <p>For moves over 300 miles far, we provide a flat-rate price that includes:</p>
            {includedList}
            <p>
              We require a <b>$500 NON-REFUNDABLE</b> deposit that is counted toward your total.
            </p>
            <p>
              NO HIDDEN FEES. EVER. We charge extra ONLY for extra heavy items (300 lb+) such as a
              gun safe, piano, or pool table (discussed separately).
            </p>
            {request.distance < 450 && (
              <p>
                Expected delivery date: <b>the next day</b>
              </p>
            )}
            <p>
              We provide individual trucks for long-distance moves. This means there won't be anyone
              else's stuff and the truck will go directly to your place.
            </p>
            <p>
              We are insured and can provide a certificate with $1,000,000 coverage upon request.
            </p>
            <h5 className="text-end">
              <b>
                Estimated total: <span style={{ color: "green" }}>${request.estTotalCost}</span>
              </b>
            </h5>
          </div>
        );
      } else if (request.pianoMove && request.bedrooms == 0) {
        //Piano move only
        elements.push(
          <div key="piano quote">
            <p>
              For the piano, we charge{" "}
              <b>
                ${PIANO_CHARGE} + ${STAIR_CHARGE}
              </b>{" "}
              /stair step
            </p>
            {request.distance != null && request.distance >= 10 && (
              <p>
                {" "}
                + <b>$50</b> every 10 miles after the first 10 miles
              </p>
            )}
          </div>
        );
      } else {
        // Reply for all other moves
        //Offer nearest available dates
        if (request.offerDates) {
          elements.push(generateAvailabilitySection());
        } else if (request.date1 != null) {
          //Display availability on requested dates
          if (request.date2 == null && request.date3 == null) {
            // Optional dates were not provided
            elements.push(
              <p className="pb-1 mb-2" key="av-0">
                We are {highlightAvailability(request.date1Availability)} on <b>{request.date1}</b>
              </p>
            );
          } else {
            elements.push(
              <div key="av-1">
                <p className="pb-1 mb-0">Our availability on the requested dates is:</p>{" "}
                <p className="ps-5 p-naked">
                  <b>
                    {request.date1} - {highlightAvailability(request.date1Availability)}
                  </b>
                </p>
                {request.date2 && (
                  <p className="ps-5 p-naked">
                    <b>
                      {request.date2} - {highlightAvailability(request.date2Availability)}
                    </b>
                  </p>
                )}
                {request.date3 && (
                  <p className="ps-5 p-naked">
                    <b>
                      {request.date3} - {highlightAvailability(request.date3Availability)}
                    </b>
                  </p>
                )}
              </div>
            );
          }
          const mornOrEvn =
            request.date1Availability + request.date2Availability + request.date3Availability;
          if (mornOrEvn.includes("Morning")) {
            elements.push(
              <p className="p-naked text-center" key="note-0">
                * Morning moves start around 9:00 AM
              </p>
            );
          }

          if (mornOrEvn.includes("Evening")) {
            elements.push(
              <p className="p-naked text-center" key="note-1">
                * Evening moves start around 3:00 PM
              </p>
            );
          }
        } //No Else here
        elements.push(
          <div key="av-2">
            <p>
              You can always check our availability{" "}
              <a href="book" className="link-orange" style={{ fontSize: "16px" }}>
                here
              </a>
            </p>
            {generatePricingTextBlock()}
            <br />
            <div>
              Our rates already include:
              {includedList}
            </div>
            <div>
              <h6>NO HIDDEN FEES. EVER.</h6> We charge extra ONLY for:
              <ul className="pb-0 mb-0">
                <li>
                  Extra heavy items (300+ lbs) such as a piano or gun safe. (Check our{" "}
                  <a href="prices" className="link-orange" style={{ fontSize: "16px" }}>
                    prices
                  </a>{" "}
                  for details)
                </li>
                {request.doubleDrive && (
                  <li>
                    <div className="d-flex align-items-center pb-3">
                      Double-Drive-Time
                      <div className="ms-0">
                        <HelpIcon helpMessage="California law mandates that moving companies charge Double-Drive-Time for driving from pickup to drop-off if the distance exceeds 10 miles" />
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            {estimateTimeAndCost()}
            <p>
              <b>Payment:</b>
              <br />
              <span className="ps-3">
                Your payment is due at the end of your move. We accept cash, credit/debit cards,
                Zelle, and Venmo. We DO NOT accept checks.
              </span>
            </p>
            <div className="d-flex justify-content-end py-4">
              <div className="text-end" style={{ width: "375px" }}>
                <div className="row no-gutters m-0 p-0" style={{ fontWeight: "bold" }}>
                  <div className="col-5 m-0 p-0">
                    <h5>
                      <b>Estimated total:</b>
                    </h5>
                  </div>
                  <div className="col m-0 p-0">
                    <h5 style={{ color: "green" }}>
                      <b>${request.estTotalCost}</b>
                    </h5>
                  </div>
                  <div className="col-1 m-0 p-0 text-center">
                    <h5>|</h5>
                  </div>
                  <div className="col m-0 p-0 text-start">
                    <h5 style={{ color: "#E78B01", textShadow: "1px 1px 2px rgba(0, 0, 0, 1)" }}>
                      <b>${request.estTotalCostCard}</b>
                    </h5>
                  </div>
                </div>
                <div
                  className="row no-gutters mx-0 p-0 text-center"
                  style={{ marginTop: "-10px", fontSize: "10px" }}>
                  <div className="col-5"></div>
                  <div className="col m-0 p-0" style={{ color: "green" }}>
                    cash
                  </div>
                  <div className="col-1"></div>
                  <div className="col m-0 p-0" style={{ color: "#E78B01" }}>
                    card
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      elements.push(
        <div key="btn" className="text-center">
          <MyButton link="book" text="Book Now" dark />
        </div>
      );
    }

    return (
      <>
        <h2 className="text-center py-4">Quote</h2>
        <div>{elements}</div>
      </>
    );
  };

  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <div className="d-flex justify-content-center align-items-center text-start">
            <div className="card-container">{gotResponse ? <QuoteResponse /> : <QuoteForm />}</div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default GetQuote;
