import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import { Button, Modal } from "react-bootstrap";
import { Element, scroller } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HelpIcon from "./HelpIcon.tsx";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

import states from "states-us";
import "./BookingForm.css";
import * as FI from "./FormInterfaces.tsx";

const currentDate = new Date();
const minDate = currentDate.toISOString().split("T")[0];
const maxDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 6,
  currentDate.getDate()
)
  .toISOString()
  .split("T")[0];

const addressValidationApiURL = "https://api.kz2movingcompany.com:8443/validate_address";
const formSubmissionApiURL = "https://api.kz2movingcompany.com:8443/form_submission";
const addresses: string[] = [];

let curInd = 0;
let pickupAddress = "";
let stopOneAddress = "";
let stopTwoAddress = "";
let destAddress = "";

const eightAM = setHours(setMinutes(new Date(), 0), 8);
const threePM = setHours(setMinutes(new Date(), 0), 15);
const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

const smallMoves = ["Few items", "Studio", "1-br", "Small storage", "Medium Storage"];

const stateOptions = states.map((state) => (
  <option key={state.abbreviation} value={state.abbreviation}>
    {state.abbreviation}
  </option>
));

const floorOptions = [
  <option key="floor-placeholder" value="" disabled>
    Most of the stuff goes to...
  </option>,
  <option key="Ground" value="Ground">
    Ground floor
  </option>,
  <option key="1st floor" value="1st floor">
    1st floor
  </option>,
  <option key="2nd floor" value="2nd floor">
    2nd floor
  </option>,
  <option key="3rd floor" value="3rd floor">
    3rd floor
  </option>,
  <option key="4th floor" value="4th floor">
    4th floor
  </option>,
  <option key="5+ floor" value="5+ floor">
    5+ floor
  </option>,
  <option key="Other floor" value="Other">
    Other
  </option>,
];

const timeOptions = [
  <option key="time-placeholder" value="" disabled>
    Start time
  </option>,
  <option key="Flexible time" value="Flexible time">
    Flexible time
  </option>,
  <option key="Morning" value="Morning">
    Morning (8-10 AM)
  </option>,
  <option key="Evening" value="Evening">
    Evening (3-5 PM)
  </option>,
  <option key="Exact" value="Exact">
    Exact (Not advised)
  </option>,
];

// Makes the first letter capital and the rest of the word lower case.
const capitalizeFirstLetter = (word: string): string => {
  return word ? word.trim().charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase() : "";
};

const FormWFormik: React.FC = () => {
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  const MyDateInput: React.FC<FI.MyDateInputProps> = ({ name, label, ...props }) => {
    const { values, setFieldValue } = useFormikContext<FI.FormValues>();
    const [field, meta] = useField(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(name, e.target.value);
      field.onChange(e);
    };

    return (
      <>
        <div className="col-md-3">
          <label htmlFor={props.id || name} className="d-flex flex-column text-center">
            {label}
            {props.optional && (
              <span className="form-text mt-0 extra-small text-center">(Optional)</span>
            )}
          </label>
        </div>
        <div className="col-md-4 col-6">
          <input
            type="date"
            id={props.id || name}
            className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`}
            min={minDate}
            max={maxDate}
            {...field}
            value={values[name] ? values[name].toString() : ""}
            onChange={handleChange}
          />
          {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
        </div>
      </>
    );
  };

  const MyDateAndTimeBlock: React.FC<FI.MyDateAndTimeBlockProps> = ({ label, ...props }) => {
    const { values, setFieldValue } = useFormikContext<FI.FormValues>();

    const handleTimeChange = (e: React.FormEvent<HTMLSelectElement>) => {
      const selectedValue = e.currentTarget.value;
      const id = e.currentTarget.id;

      if (id === "timeSlot1") {
        setExactTimeFlag1(selectedValue === "Exact");
        setEvnTimeFlag1(selectedValue === "Evening");
      } else if (id === "timeSlot2") {
        setExactTimeFlag2(selectedValue === "Exact");
        setEvnTimeFlag2(selectedValue === "Evening");
      } else if (id === "timeSlot3") {
        setExactTimeFlag3(selectedValue === "Exact");
        setEvnTimeFlag3(selectedValue === "Evening");
      }
    };

    const largeMoveWarning = largeMove && (
      <div className="row g-2 ">
        <div className="col-auto text-danger text-start">
          <strong>Note:</strong>
        </div>
        <div className="col d-flex text-danger text-start">
          For larger moves, we strongly recommend starting as early as as possible
        </div>
      </div>
    );

    const evnTimeNote = (
      <div className="row g-2 ">
        <div className="col-auto text-start">
          <strong>Note:</strong>
        </div>
        <div className="col d-flex text-start">The team might become available before 3 PM</div>
      </div>
    );

    const exactTimeNote = (
      <div className="row g-2 ">
        <div className="col-auto text-start">
          <strong>Note:</strong>
        </div>
        <div className="col d-flex text-start">
          Selecting time around noon is not advised as it limits our ability to serve other
          customers
        </div>
      </div>
    );

    const id = props.id;
    const exactTimeFlags = {
      "1": exactTimeFlag1,
      "2": exactTimeFlag2,
      "3": exactTimeFlag3,
    };

    const evnTimeFlags = {
      "1": evnTimeFlag1,
      "2": evnTimeFlag2,
      "3": evnTimeFlag3,
    };

    const getFlag = (id: string, flags: { [key: string]: boolean }) => {
      return flags[id] || false;
    };

    type ExactTimeKey = "exactTime1" | "exactTime2" | "exactTime3";
    return (
      <div className="row g-2 align-items-center mt-1" id={`dates-block-${id}`}>
        <MyDateInput label={label} name={props.name} optional={props.optional} />

        <div className="col-md-5 col-6" id={`w-timeSlot${id}`}>
          <MySelect
            addclassname="col"
            id={`timeSlot${id}`}
            name={`timeSlot${id}`}
            addfunc={handleTimeChange}>
            {timeOptions}
          </MySelect>
        </div>
        {getFlag(id, exactTimeFlags) && (
          <div
            key={`ex-note-${id}`}
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert">
            {exactTimeNote}
            {largeMoveWarning}
            <div className="form-group">
              <label htmlFor={`ex-time-${id}`}>Preferred Time:</label>
              <DatePicker
                id={`ex-time-${id}`}
                selected={values[`exactTime${id}` as ExactTimeKey]}
                onChange={(date) => date && setFieldValue(`exactTime${id}`, date)}
                showTimeSelect
                showTimeSelectOnly
                minTime={setHours(setMinutes(new Date(), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 0), 20)}
                timeCaption="Time"
                timeIntervals={30}
                dateFormat="h:mm aa"
                required
              />
            </div>
          </div>
        )}
        {getFlag(id, evnTimeFlags) && (
          <div
            key={`evn-note-${id}`}
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert">
            {evnTimeNote}
            {largeMoveWarning}
            <div className="form-group">
              <label htmlFor={`evn-time-${id}`}>What is the earliest time we can start:</label>
              <DatePicker
                id={`evn-time-${id}`}
                selected={values[`evnTime${id}` as ExactTimeKey]}
                onChange={(date) => date && setFieldValue(`evnTime${id}`, date)}
                showTimeSelect
                showTimeSelectOnly
                minTime={setHours(setMinutes(new Date(), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 0), 20)}
                timeCaption="Time"
                timeIntervals={30}
                dateFormat="h:mm aa"
                required
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const MyTextInput: React.FC<FI.MyTextInputProps> = ({ addfunc, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext<FI.FormValues>();

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const formattedInput = input
        .replace(/[^0-9]/g, "") // Remove non-digit characters
        .replace(/^(\d{3})(\d{0,3})(\d{0,4})$/, (_, g1, g2, g3) => {
          // Format the input with dashes
          let formattedNumber = g1;
          if (g2) {
            formattedNumber += "-" + g2;
          }
          if (g3) {
            formattedNumber += "-" + g3;
          }
          return formattedNumber;
        });

      setFieldValue("phoneNumber", formattedInput);
    };

    // Use addfunc if provided. Use special onChange for phoneNumber. Otherwise, use default behavior.
    const handleChange =
      addfunc || (props.name === "phoneNumber" ? handlePhoneNumberChange : field.onChange);

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
          onChange={handleChange}
        />
        {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
      </>
    );
  };

  const MyCheckbox: React.FC<FI.MyCheckboxProps> = ({ children, addfunc, req, wrap, ...props }) => {
    // React treats radios and checkbox inputs differently from other input types: select and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: "checkbox" });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(event); // Execute the default onChange behavior

      if (addfunc) {
        addfunc(event);
      }
    };

    const inputProps = {
      ...props,
      checked: field.value,
      onChange: handleCheckboxChange,
      required: req, // TODO: Remove this when bootstrap fixes its issues
    };

    return (
      <div className={`form-check ${props.wrapperdivclassname}`}>
        <label
          htmlFor={props.id || props.name}
          className={`checkbox-input form-check-label ${wrap ? "" : "text-nowrap"}`}>
          <input
            type="checkbox"
            className="form-check-input"
            id={props.id || props.name}
            {...field}
            {...inputProps}
          />
          {children}
        </label>
        {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
      </div>
    );
  };

  const MySelect: React.FC<FI.MySelectProps> = ({ addfunc, ...props }) => {
    const [field, meta] = useField(props);
    const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
      if (addfunc) {
        addfunc(event); // Execute the provided additional function
      }
      field.onChange(event); // Execute the default onChange behavior
    };
    return (
      <>
        {props.label && <label htmlFor={props.id || props.name}>{props.label}</label>}
        <select
          className={`form-select ${props.addclassname} ${
            meta.touched && meta.error ? "is-invalid" : ""
          }`}
          onInput={handleInput}
          id={props.id || props.name}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
      </>
    );
  };

  const MyAddressBlock: React.FC<FI.MyAddressBlockProps> = ({ location, ...props }) => {
    const { setFieldValue } = useFormikContext<FI.FormValues>();

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const formattedInput = input.replace(/[^0-9]/g, "");
      setFieldValue(`${location}Zip`, formattedInput);
    };

    return (
      <div className="row g-2" id={props.id || props.name}>
        <div className="col-12">
          <MyTextInput name={`${location}StreetAddress`} type="text" placeholder="1234 Main St" />
        </div>
        <div className="col-12">
          <MyTextInput
            name={`${location}StreetAddress2`}
            type="text"
            placeholder="Apartment, unit, or office"
          />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-6 col-6">
          <MyTextInput name={`${location}City`} type="text" placeholder="City" />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-3 col-3">
          <MySelect name={`${location}State`}>{stateOptions}</MySelect>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 col-3">
          <MyTextInput
            minLength={5}
            maxLength={5}
            name={`${location}Zip`}
            type="text"
            placeholder="Zip"
            addfunc={handleZipCodeChange}
          />
        </div>

        {(location === "pickup" || location === "dest") && (
          <div className="row g-1 ms-0">
            <div className="col-md-6">
              <MySelect addclassname="col" name={`${location}FloorSelector`}>
                {floorOptions}
              </MySelect>
            </div>
            <div className="col-md-5 ms-1 d-flex align-items-center">
              <MyCheckbox name={`${location}ElevatorCheck`}>Elevator</MyCheckbox>
              <MyCheckbox wrapperdivclassname="ms-4" name={`${location}LongWalkCheck`}>
                Long Walk
              </MyCheckbox>
              <div className="ms-0 align-self-center">
                <HelpIcon helpMessage="No extra charge. It is to help us better understand the task." />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Supplemental:
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chosenAddress, setChosenAddress] = useState("");
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [stopOne, setStopOne] = useState(false);
  const [stopTwo, setStopTwo] = useState(false);
  const [largeMove, setLargeMove] = useState(false);
  const [recomMovers, setRecomMovers] = useState(0);

  // Date and Time Block:
  const [evnTimeFlag1, setEvnTimeFlag1] = useState(false);
  const [exactTimeFlag1, setExactTimeFlag1] = useState(false);

  const [evnTimeFlag2, setEvnTimeFlag2] = useState(false);
  const [exactTimeFlag2, setExactTimeFlag2] = useState(false);

  const [evnTimeFlag3, setEvnTimeFlag3] = useState(false);
  const [exactTimeFlag3, setExactTimeFlag3] = useState(false);

  // Packs Formik values into JSON and sends to the server API
  const wrapAndSubmit = async (values: FI.FormValues) => {
    const data = {
      firstName: capitalizeFirstLetter(values.firstName),
      lastName: capitalizeFirstLetter(values.lastName),
      email: values.email.trim().toLowerCase(),
      phoneNumber: values.phoneNumber,
      pickupAddress: pickupAddress,
      stopOneAddress: stopOneAddress,
      stopTwoAddress: stopTwoAddress,
      destAddress: destAddress,
      pickupFloorSelector: values.pickupFloorSelector,
      pickupElevatorCheck: values.pickupElevatorCheck,
      pickupLongWalkCheck: values.pickupLongWalkCheck,
      destFloorSelector: values.destFloorSelector,
      destElevatorCheck: values.destElevatorCheck,
      destLongWalkCheck: values.destLongWalkCheck,
      moveSize: values.moveSize,
      truck: values.truck,
      packing: values.packing,
      selectedHeavyItems: values.selectedHeavyItems,
      inputHeavyDetails: values.inputHeavyDetails,
      defaultMovers: values.defaultMovers,
      selectedMovers: values.defaultMovers ? "" : values.selectedMovers,
      date1: values.date1,
      timeSlot1: values.timeSlot1,
      evnTime1: evnTimeFlag1 ? values.evnTime1.toLocaleTimeString([], timeFormatOptions) : "",
      exactTime1: exactTimeFlag1 ? values.exactTime1.toLocaleTimeString([], timeFormatOptions) : "",

      date2: values.date2,
      timeSlot2: values.timeSlot2,
      evnTime2: evnTimeFlag2 ? values.evnTime2.toLocaleTimeString([], timeFormatOptions) : "",
      exactTime2: exactTimeFlag2 ? values.exactTime2.toLocaleTimeString([], timeFormatOptions) : "",

      date3: values.date3,
      timeSlot3: values.timeSlot3,
      evnTime3: evnTimeFlag3 ? values.evnTime3.toLocaleTimeString([], timeFormatOptions) : "",
      exactTime3: exactTimeFlag3 ? values.exactTime3.toLocaleTimeString([], timeFormatOptions) : "",
      addInfo: values.additionalInfo,
    };

    try {
      const response = await fetch(formSubmissionApiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        //const responseData = await response.text();
        //console.log("DEBUG:: Received API response: " + responseData);
        setIsSubmitted(true);
      } else {
        console.error("Request failed with status:", response.status);
        return "error";
      }
    } catch (error) {
      console.error("Request failed:", error);
      return "error";
    }
  };

  const prepareAddressesForValidation = (values: FI.FormValues) => {
    addresses.length = 0; // Clear the array
    // Valid address format STRICTLY: "250 Montana Street, San Francisco, CA 94112"
    const formatAddress = (
      streetAddress: string,
      streetAddress2: string,
      city: string,
      state: string,
      zip: string
    ): string => {
      return [
        capitalizeWords(streetAddress.trim()),
        streetAddress2 && capitalizeWords(streetAddress2.trim()),
        capitalizeWords(city),
        state + " " + zip,
      ]
        .filter(Boolean)
        .join(", ");
    };

    const capitalizeWords = (sentence: string): string => {
      const words = sentence.split(" ");
      const capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
      return capitalizedWords.join(" ");
    };

    addresses.push(
      formatAddress(
        values.pickupStreetAddress,
        values.pickupStreetAddress2,
        values.pickupCity,
        values.pickupState,
        values.pickupZip
      )
    );
    if (stopOne) {
      addresses.push(
        formatAddress(
          values.stopOneStreetAddress,
          values.stopOneStreetAddress2,
          values.stopOneCity,
          values.stopOneState,
          values.stopOneZip
        )
      );
    }
    if (stopTwo) {
      addresses.push(
        formatAddress(
          values.stopTwoStreetAddress,
          values.stopTwoStreetAddress2,
          values.stopTwoCity,
          values.stopTwoState,
          values.stopTwoZip
        )
      );
    }
    addresses.push(
      formatAddress(
        values.destStreetAddress,
        values.destStreetAddress2,
        values.destCity,
        values.destState,
        values.destZip
      )
    );
  };

  const validateSubmission = async (values: FI.FormValues): Promise<void> => {
    setShowModal(false);

    const validateAddress = async (address: string) => {
      const requestBody = {
        id: "stub",
        address: address,
      };

      try {
        const response = await fetch(addressValidationApiURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const responseData = await response.text();
          console.log("DEBUG: Received API response: " + responseData);
          const result = JSON.parse(responseData);
          setChosenAddress(result.formattedAddress);
          return result;
        } else {
          console.error("Request failed with status:", response.status);
          return "error";
        }
      } catch (error) {
        console.error("Request failed:", error);
        return "error";
      }
    };

    // Iterate over the addresses and validate them
    for (let i = curInd; i < addresses.length; i++) {
      const currentAddress = addresses[i];
      const result = await validateAddress(currentAddress);

      if (result === "error") {
        console.error("An error occured. Couldn't confirm the address");
        await addressSetter(currentAddress);
      } else {
        // Access the values in the response object
        const verdict = result.verdict;
        const formattedAddress = result.formattedAddress;

        //console.log("DEBUG: input: " + currentAddress);
        //console.log("DEBUG: corAdd: " + formattedAddress);

        // If the address is invalid, show the modal and exit the loop
        if (verdict === "ok") {
          await addressSetter(formattedAddress);
        } else if (verdict === "hasUnconfirmedComponents") {
          // The address is bad and can't be fixed
          setChosenAddress("We couldn't find this address.\nPlease, make sure it's correct.");
          setInvalidAddress(true);
          setShowModal(true);
          break;
        } else {
          setShowModal(true);
          break;
        }
      }
    }
    // If the last address is valid and all addresses have been validated
    if (curInd === addresses.length) {
      wrapAndSubmit(values);
    }
  };

  const addressSetter = async (value: string) => {
    addresses[curInd] = value;
    switch (curInd) {
      case 0:
        pickupAddress = value;
        break;
      case 1:
        if (addresses.length === 2 || addresses.length === 3) {
          destAddress = value;
        } else {
          stopOneAddress = value;
        }
        break;
      case 2:
        stopTwoAddress = value;
        break;
      case 3:
        destAddress = value;
        break;
      default:
        console.error(`Error: ${curInd} doesn't match any case`);
        break;
    }
    curInd++;
  };

  // Components:
  const Header = () => {
    return (
      <div key="header">
        <div className="text-center">
          <h4>Request Reservation</h4>
        </div>
        <hr />
      </div>
    );
  };

  const NameBlock = () => {
    return (
      <div className="row g-2" key="name-field">
        <div className="col">
          <MyTextInput label="First Name" name="firstName" type="text" placeholder="Jane" />
        </div>
        <div className="col">
          <MyTextInput label="Last Name" name="lastName" type="text" placeholder="Doe" />
        </div>
      </div>
    );
  };

  const EmailAndPhoneBlock = () => {
    return (
      <div key="email-and-phone-field">
        <br />
        <div className="row g-2">
          <div className="col mb-3">
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@gmail.com"
              autoComplete="email"
            />
          </div>
          <div className="col form-group">
            <MyTextInput
              minLength={12}
              maxLength={12}
              label="Phone"
              name="phoneNumber"
              type="tel"
              placeholder="###-###-####"
            />
          </div>
        </div>
      </div>
    );
  };

  const PickupBlock = () => {
    return (
      <div key="pickup-address-fields" id="pickup-block">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="pickupStreetAddress" className="form-label fw-bold">
            Pickup address:
          </label>
        </div>
        <MyAddressBlock location="pickup" name="pickup-address-block" />

        {!stopOne && (
          <div className="text-center mt-2">
            <button
              type="button"
              id="add-stop-one"
              className="btn btn-light rounded-circle fw-bold border btn-sm"
              onClick={() => setStopOne(true)}
              aria-label="Add a stop">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <label className="form-check-label ms-2" htmlFor="add-stop-one">
              Add a stop
            </label>
          </div>
        )}
      </div>
    );
  };

  const StopOneBlock: React.FC = () => {
    return !stopOne ? null : (
      <div key="additional-stop-one-fields" id="stop-one-block">
        <br />
        <div className="d-flex justify-content-between">
          <label htmlFor="stopOneStreetAddress" className="form-label fw-bold">
            Stop One address:
          </label>
          <div>
            {!stopTwo && (
              <button
                type="button"
                id="remove-stop-one"
                className="btn-close border btn-light"
                onClick={() => setStopOne(false)}
                aria-label="Remove stop one"
              />
            )}
          </div>
        </div>
        <MyAddressBlock location="stopOne" name="stop-one-address-block" />
        {!stopTwo && (
          <div className="row align-items-center">
            <div className="col text-center mt-2">
              <button
                type="button"
                id="add-stop-two"
                className="btn btn-light rounded-circle fw-bold border btn-sm"
                onClick={() => setStopTwo(true)}
                aria-label="Add a stop button">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <label className="form-check-label ms-2" htmlFor="add-stop-two">
                Add a stop
              </label>
            </div>
          </div>
        )}
      </div>
    );
  };

  const StopTwoBlock: React.FC = () => {
    return !stopTwo ? null : (
      <div key="additional-stop-two-fields" id="stop-two-block">
        <br />
        <div className="d-flex justify-content-between">
          <label htmlFor="stopTwoStreetAddress" className="form-label fw-bold">
            Stop Two address:
          </label>
          <div className="text-center mt-2">
            <button
              type="button"
              id="remove-stop-two"
              className="btn-close border btn-light"
              onClick={() => setStopTwo(false)}
              aria-label="Remove stop two button"
            />
          </div>
        </div>
        <MyAddressBlock location="stopTwo" name="stop-two-address-block" />
      </div>
    );
  };

  const DestinationBlock = () => {
    return (
      <div key="dropoff-address-fields">
        <br />
        <div className="d-flex">
          <label htmlFor="destStreetAddress" className="form-label fw-bold">
            Destination address:
          </label>
        </div>
        <MyAddressBlock location="dest" name="dest-address-block" />
      </div>
    );
  };

  const OptionsBlock = () => {
    const { values } = useFormikContext<FI.FormValues>();
    useEffect(() => {
      setLargeMove(!smallMoves.includes(values.moveSize));
    }, [values.moveSize]);

    return (
      <div key="options-selector-key" id="options-selector-block">
        <br />
        <label className="d-flex form-check-label fw-bold mb-2" htmlFor="moveSize">
          Move size & required services:
        </label>
        <div className="row g-2 d-flex align-items-center">
          <div id="options-help" className="text-start form-text extra-small mt-0">
            Not sure which one to choose? Check out our{" "}
            <a href="https://www.kz2movingcompany.com/post/how-to-estimate-your-move-size">Guide</a>{" "}
          </div>

          <div className="row g-1 ms-0">
            <div className="col-md-6" id="options-selector">
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
                <option key="Small Storage" value="Small Storage">
                  Small Storage
                </option>
                <option key="Medium Storage" value="Medium Storage">
                  Medium Storage
                </option>
                <option key="Large Storage" value="Large Storage"></option>
                <option key="Office" value="Office">
                  Office
                </option>
                <option key="Warehouse" value="Warehouse">
                  Warehouse
                </option>
                <option key="Other" value="Other">
                  Other
                </option>
              </MySelect>
            </div>
            <div className="col-md-5 ms-1 d-flex align-items-center">
              <MyCheckbox name="packing">Packing</MyCheckbox>
              <div className="ms-0">
                <HelpIcon helpMessage="Our team will wrap and pack into boxes small items such as kitchenware, electronics, frames, books, etc." />
              </div>
              <MyCheckbox wrapperdivclassname="ms-4" name="truck">
                Truck
              </MyCheckbox>
              <div className="ms-0">
                <HelpIcon helpMessage="We have trucks of different sizes and will make sure to provide the right one." />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HeavyItemsBlock = () => {
    const { values, setFieldValue } = useFormikContext<FI.FormValues>();

    const handleHeavyItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;

      if (checked) {
        setFieldValue("selectedHeavyItems", [...values.selectedHeavyItems, name]);
      } else {
        setFieldValue(
          "selectedHeavyItems",
          values.selectedHeavyItems.filter((item: string) => item !== name)
        );
      }
    };

    return (
      <div key="heavy-items" id="heavy-check">
        <br />
        <label
          className="text-start form-check-label fw-bold d-flex align-items-center"
          htmlFor="piano"
          aria-describedby="heavy-help">
          Extra Heavy (300+ lb) or Oversized items:
          <span className="ms-2">
            <HelpIcon helpMessage="Such items usually require 4 movers. Most TVs, mattresses, couches, dressers, washers, fridges, and treadmills are considered regular items." />
          </span>
        </label>
        <div id="heavy-help" className="text-start form-text extra-small mt-0">
          May be charged extra. See <a href="https://www.kz2movingcompany.com/prices">Prices</a> for
          more information
        </div>

        <div className="row g-2 align-items-center" id="heavy-check">
          <div className="col d-flex">
            <MyCheckbox name="piano" addfunc={handleHeavyItemsChange}>
              Piano
            </MyCheckbox>
          </div>

          <div className="col d-flex">
            <MyCheckbox name="gunSafe" addfunc={handleHeavyItemsChange}>
              Gun Safe
            </MyCheckbox>
          </div>

          <div className="col d-flex">
            <MyCheckbox name="otherHeavyItem" addfunc={handleHeavyItemsChange}>
              Other
            </MyCheckbox>
          </div>
        </div>

        {values.selectedHeavyItems.length > 0 && (
          <div className="form-group" key-="heavy-item-description">
            <MyTextInput
              name="inputHeavyDetails"
              type="text"
              placeholder="Tell us more about it..."
            />
          </div>
        )}
      </div>
    );
  };

  const NumMoversBlock = () => {
    const { values } = useFormikContext<FI.FormValues>();

    useEffect(() => {
      // Update the value of moversSelector based on the changed fields
      const moveSize = values.moveSize;
      const packing = values.packing;
      const heavyItemsLength = values.selectedHeavyItems.length;
      let recommendedMovers = 0;

      if (
        heavyItemsLength === 0 &&
        ((moveSize !== "1-br" && smallMoves.includes(moveSize)) ||
          (moveSize === "1-br" && !packing))
      ) {
        recommendedMovers = 2;
      } else {
        if (moveSize === "3-br") {
          recommendedMovers = 4;
        } else if (moveSize === "1-br") {
          recommendedMovers = 2;
        } else if (moveSize === "2-br" || moveSize === "Large Storage") {
          recommendedMovers = 3;
        } else if (moveSize === "4-br" || moveSize === "5+ br") {
          recommendedMovers = 5;
        }
        if (recommendedMovers > 0 && packing) {
          recommendedMovers += 1;
        }
      }
      if (heavyItemsLength > 0) {
        recommendedMovers = Math.max(recommendedMovers, 4);
      }
      setRecomMovers(recommendedMovers);
    }, [values.moveSize, values.selectedHeavyItems, values.packing]);

    return (
      <div key="num-movers-key" id="num-movers-selector">
        <br />
        <label className="d-flex form-check-label fw-bold" htmlFor="defaultMovers">
          Number of movers:
        </label>
        <div className="d-flex col">
          <MyCheckbox name="defaultMovers" wrap={true}>
            Let KZ2 decide the most suitable team-size (Recommended)
          </MyCheckbox>
        </div>
        {!values.defaultMovers && (
          <MySelect addclassname="col" name="selectedMovers">
            <option key="movers-placeholder" value="" disabled>
              How many movers do you need...
            </option>
            <option key="movers-2" value="2 movers">
              2 movers {recomMovers === 2 ? "(Recommended)" : ""}
            </option>
            <option key="movers-3" value="3 movers">
              3 movers {recomMovers === 3 ? "(Recommended)" : ""}
            </option>
            <option key="movers-4" value="4 movers">
              4 movers {recomMovers === 4 ? "(Recommended)" : ""}
            </option>
            <option key="movers-5" value="5 movers">
              5 movers {recomMovers === 5 ? "(Recommended)" : ""}
            </option>
            <option key="movers-6" value="6 movers">
              6 movers {recomMovers === 6 ? "(Recommended)" : ""}
            </option>
            <option key="movers-custom" value="Custom">
              I will specify at the end of the form
            </option>
          </MySelect>
        )}
      </div>
    );
  };

  const MovingDatesBlock = () => {
    return (
      <div key="moving-dates-block-key" className="g-2">
        <br />
        <label htmlFor="date1" className="d-flex form-check-label fw-bold">
          Preferred Dates & Times:
        </label>
        <MyDateAndTimeBlock label="1st choice:" name="date1" id="1" />
        <MyDateAndTimeBlock label="2nd choice:" name="date2" id="2" optional={true} />
        <MyDateAndTimeBlock label="3rd choice:" name="date3" id="3" optional={true} />
      </div>
    );
  };

  const AdditionalInfoBlock = () => {
    const [field] = useField("additionalInfo");

    return (
      <div key="additional-info-block">
        <br />
        <label htmlFor="additional-info" className="d-flex form-label fw-bold mb-1">
          Additional Information:
        </label>
        <textarea
          {...field}
          id="additional-info"
          className="form-control"
          rows={3}
          placeholder="Anything else we should know..."
          aria-label="Additional information field"></textarea>
      </div>
    );
  };

  const AgreeAndSubmitBlock = () => {
    const { isSubmitting } = useFormikContext<FI.FormValues>();
    return (
      <div key="check-and-submit">
        <br />
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol id="info-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </symbol>
        </svg>

        <div
          className="alert alert-primary d-flex flex-column align-items-center me-3 w-100"
          role="alert">
          <div className="d-flex align-items-center">
            <svg
              className="bi flex-shrink-0 me-4"
              width="32"
              height="32"
              role="img"
              aria-label="Info:">
              <use xlinkHref="#info-fill" />
            </svg>

            <p className="m-0 text-start">
              <strong>Attention!</strong> Your move is not confirmed until you receive a
              confirmation via email. Be sure to check your spam.
            </p>
          </div>
          <div className="mt-2">
            <p className="m-0 text-start">
              This is a non-binding moving service request form. While we do our best to serve you,
              availability may vary.
            </p>
          </div>
          <div className="mt-2">
            <p className="m-0 text-start">
              We will never share your information with third parties.
            </p>
          </div>

          <MyCheckbox wrapperdivclassname="mt-2" name="acceptedTerms" req={true}>
            I agree
          </MyCheckbox>
        </div>

        <div className="col-12 text-center mb-3">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Reservation Request"}
          </button>
        </div>
      </div>
    );
  };

  const ModalWindow = () => {
    const { values, setSubmitting } = useFormikContext<FI.FormValues>();

    const handleModalResponse = async (response: string) => {
      setInvalidAddress(false);

      // Update the address fields based on the user's response
      await addressSetter(response);

      // Hide the modal and continue validating the remaining addresses
      await validateSubmission(values);
    };

    return (
      <Modal
        show={showModal}
        onHide={() => {
          setSubmitting(false);
          setShowModal(false);
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Address Validation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We found a standardized address that matches your input</p>
          <div className="container text-center">
            <div className="row align-items-stretch d-flex g-2">
              <div className="col">
                <div className="card h-100 alert alert-secondary text-center">
                  <p className="mb-0">Your input:</p>
                  <br />
                  {addresses[curInd] &&
                    addresses[curInd]
                      .split(",")
                      .map((part, index) => <div key={index}>{part.trim()}</div>)}
                </div>
              </div>
              <div className="col">
                <div className="card h-100 alert alert-primary text-center">
                  <p className="mb-0">Recommended:</p>
                  <br />
                  {chosenAddress &&
                    chosenAddress.split(",").map((part, index) => {
                      const trimmedPart = part.trim();
                      const mismatch =
                        addresses[curInd] &&
                        addresses[curInd].split(",")[index]?.trim() !== trimmedPart;
                      const userSubparts = addresses[curInd]
                        ?.split(",")
                        // eslint-disable-next-line no-unexpected-multiline
                        [index]?.trim()
                        .split(/\s+/);
                      const recommendedSubparts = trimmedPart.split(/\s+/);
                      const subparts = recommendedSubparts.map((subpart, subindex) => {
                        const isMismatch = mismatch && subpart !== userSubparts[subindex];
                        return (
                          <React.Fragment key={subindex}>
                            {subindex > 0 && " "} {/* Add space if it's not the first subpart */}
                            <span className={isMismatch ? "fw-bold" : ""}>{subpart}</span>
                          </React.Fragment>
                        );
                      });
                      return <div key={index}>{subparts}</div>;
                    })}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="container text-center">
            <div className="row align-items-stretch d-flex g-2">
              <div className="col">
                <Button variant="secondary" onClick={() => handleModalResponse(addresses[curInd])}>
                  Keep Original
                </Button>
              </div>
              {!invalidAddress && (
                <div className="col">
                  <Button
                    className="text-nowrap"
                    variant="primary"
                    onClick={() => handleModalResponse(chosenAddress)}>
                    Use Formatted
                  </Button>
                </div>
              )}
              {invalidAddress && (
                <div className="col">
                  <Button
                    className="text-nowrap"
                    variant="primary"
                    onClick={() => {
                      setSubmitting(false);
                      setInvalidAddress(false);
                      setShowModal(false);
                    }}>
                    Go back & fix
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  // Centers on the topmost invalid field
  const ScrollToError = () => {
    const formik = useFormikContext();
    const submitting = formik?.isSubmitting;

    useEffect(() => {
      const el = document.querySelector(".invalid-feedback");
      (el?.parentElement ?? el)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [submitting]);
    return null;
  };

  // Centers on the Thank You message after submission
  useEffect(() => {
    if (isSubmitted && formContainerRef.current) {
      scroller.scrollTo("thankYouMessage", {
        duration: 500,
        smooth: true,
        offset: -100, // Adjust the offset as needed
      });
    }
  }, [isSubmitted]);

  const initialValues: FI.FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",

    pickupStreetAddress: "",
    pickupStreetAddress2: "",
    pickupCity: "",
    pickupState: "CA",
    pickupZip: "",
    pickupFloorSelector: "",
    pickupElevatorCheck: false,
    pickupLongWalkCheck: false,

    stopOneStreetAddress: "",
    stopOneStreetAddress2: "",
    stopOneCity: "",
    stopOneState: "CA",
    stopOneZip: "",

    stopTwoStreetAddress: "",
    stopTwoStreetAddress2: "",
    stopTwoCity: "",
    stopTwoState: "CA",
    stopTwoZip: "",

    destStreetAddress: "",
    destStreetAddress2: "",
    destCity: "",
    destState: "CA",
    destZip: "",
    destFloorSelector: "",
    destElevatorCheck: false,
    destLongWalkCheck: false,

    moveSize: "",
    truck: true,
    packing: false,
    piano: false,
    gunSafe: false,
    otherHeavyItem: false,
    selectedHeavyItems: [],
    inputHeavyDetails: "",
    defaultMovers: true,
    selectedMovers: "2 movers",

    date1: "",
    timeSlot1: "",
    evnTime1: threePM,
    exactTime1: eightAM,

    date2: "",
    timeSlot2: "",
    evnTime2: threePM,
    exactTime2: eightAM,

    date3: "",
    timeSlot3: "",
    evnTime3: threePM,
    exactTime3: eightAM,

    additionalInfo: "",
    acceptedTerms: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
    lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .test("valid-email-format", "Invalid email", (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    phoneNumber: Yup.string()
      .required("Required")
      .test("valid-phone-number", "Invalid phone number", (value) => {
        // Regular expression to validate phone number format (e.g., xxx-xxx-xxxx)
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(value);
      }),

    pickupStreetAddress: Yup.string().required("Required"),
    pickupCity: Yup.string().required("Required"),
    pickupState: Yup.string().required("Required"),
    pickupZip: Yup.string()
      .required("Required")
      .matches(/^\d{5}$/, "Invalid zip code"),
    pickupFloorSelector: Yup.string().required("Required"),

    stopTwoZip: Yup.string().matches(/^\d{5}$/, "Invalid zip code"),

    destStreetAddress: Yup.string().required("Required"),
    destCity: Yup.string().required("Required"),
    destState: Yup.string().required("Required"),
    destZip: Yup.string()
      .required("Required")
      .matches(/^\d{5}$/, "Invalid zip code"),
    destFloorSelector: Yup.string().required("Required"),

    moveSize: Yup.string().required("Required"),
    date1: Yup.date().required("Required"),
    timeSlot1: Yup.string().required("Required"),

    acceptedTerms: Yup.boolean().oneOf([true], "Agree to proceed."),
  });

  const onSubmit = async (values: FI.FormValues, { setSubmitting }: any) => {
    setSubmitting(true);

    try {
      prepareAddressesForValidation(values);
      await validateSubmission(values); // Wait for validateSubmission to finish before proceeding

      //await wrapAndSubmit(values); // Wait for wrapAndSubmit to finish before proceeding
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setSubmitting(false); // Set submitting to false after the operation is complete
    }
  };

  return (
    <div className="form-container" ref={formContainerRef}>
      {isSubmitted ? (
        <Element name="thankYouMessage" className="alert alert-success" role="alert">
          Thank you for your submission! We will get back to you shortly
        </Element>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          <Form>
            <Header />
            <NameBlock />
            <EmailAndPhoneBlock />
            <PickupBlock />
            <StopOneBlock />
            <StopTwoBlock />
            <DestinationBlock />
            <OptionsBlock />
            <HeavyItemsBlock />
            <NumMoversBlock />
            <MovingDatesBlock />
            <AdditionalInfoBlock />
            <AgreeAndSubmitBlock />

            <ModalWindow />
            <ScrollToError />
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default FormWFormik;
