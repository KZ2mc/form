import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { Element, scroller } from "react-scroll";
import { Button, Modal } from "react-bootstrap";
import states from "states-us";
import "./BookingForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HelpIcon from "./HelpIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

// If i later decide to use React Hook Form instead
//import { useForm } from "react-hook-form";
//import { yupResolver } from "@hookform/resolvers/yup";
//import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface MyTextInputProps {
  label?: string;
  className?: string;
  name: string;
  type: string;
  placeholder: string;
  id?: string; // Add the id property to the interface
  minLength?: number;
  maxLength?: number;
}

const MyTextInput: React.FC<MyTextInputProps> = ({ label, className, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      {label && (
        <label htmlFor={props.id || props.name} className="d-flex form-label fw-bold">
          {label}
        </label>
      )}
      <input className={`text-input form-control ${className}`} {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

interface MyCheckboxProps {
  children: React.ReactNode;
  wrapperDivClassName?: string;
  name: string;
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({ wrapperDivClassName, children, ...props }) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className={`form-check ${wrapperDivClassName}`}>
      <label className="checkbox-input form-check-label text-nowrap">
        <input type="checkbox" className="form-check-input" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

interface MySelectProps {
  label?: string;
  name: string;
  className?: string;
  id?: string;
  children: React.ReactNode; // Add children prop
}

const MySelect: React.FC<MySelectProps> = ({ label, className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <select className={`form-select ${className}`} {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

interface MyAddressBlockProps {
  location: string;
  name: string;
  id?: string;
}

const MyAddressBlock: React.FC<MyAddressBlockProps> = ({ location, ...props }) => {
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
        />
      </div>

      {(location === "pickup" || location === "dest") && (
        <div className="row g-1 ms-0">
          <div className="col-md-6">
            <MySelect className="col" name={`${location}FloorSelector`}>
              {floorOptions}
            </MySelect>
          </div>
          <div className="col-md-5 ms-1 d-flex align-items-center">
            <MyCheckbox name={`${location}ElevatorCheck`}>Elevator</MyCheckbox>
            <MyCheckbox wrapperDivClassName="ms-4" name={`${location}LongWalkCheck`}>
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
const addressValidationApiURL = "https://api.kz2movingcompany.com:8443/validate_address";
const formSubmissionApiURL = "https://api.kz2movingcompany.com:8443/form_submission";
const defaultStateCode = "CA";
let addresses: string[] = [];
let curInd = 0;
const eightAM = setHours(setMinutes(new Date(), 0), 8);
const threePM = setHours(setMinutes(new Date(), 0), 15);
const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};
const smallMoves = ["Few items", "Studio", "1-br", "Small storage", "Medium Storage"];
let pickupAddress = "";
let stopOneAddress = "";
let stopTwoAddress = "";
let destAddress = "";

const stateOptions = states.map((state) => (
  <option key={state.abbreviation} value={state.abbreviation}>
    {state.abbreviation}
  </option>
));

const floorOptions = [
  <option value="" disabled>
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

const FormWFormik: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const form = [];

  // Supplemental:
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chosenAddressString, setChosenAddressString] = useState("");
  const [invalidAddressString, setInvalidAddressString] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // User Data Block:
  //const [firstName, setFirstName] = useState("");
  //const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Pickup Block:
  const [pickupStreetAddress, setPickupStreetAddress] = useState("");
  const [pickupStreetAddress2, setPickupStreetAddress2] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState(defaultStateCode);
  const [pickupZipCode, setPickupZipCode] = useState("");
  const [pickupFloorSelector, setPickupFloorSelector] = useState("");
  const [pickupElevatorCheck, setPickupElevatorCheck] = useState(false);
  const [pickupLongWalkCheck, setPickupLongWalkCheck] = useState(false);

  // Stop One Block:
  const [stopOne, setStopOne] = useState(false);
  const [stopOneStreetAddress, setStopOneStreetAddress] = useState("");
  const [stopOneStreetAddress2, setStopOneStreetAddress2] = useState("");
  const [stopOneCity, setStopOneCity] = useState("");
  const [stopOneState, setStopOneState] = useState(defaultStateCode);
  const [stopOneZipCode, setStopOneZipCode] = useState("");

  // Stop Two Block:
  const [stopTwo, setStopTwo] = useState(false);
  const [stopTwoStreetAddress, setStopTwoStreetAddress] = useState("");
  const [stopTwoStreetAddress2, setStopTwoStreetAddress2] = useState("");
  const [stopTwoCity, setStopTwoCity] = useState("");
  const [stopTwoState, setStopTwoState] = useState(defaultStateCode);
  const [stopTwoZipCode, setStopTwoZipCode] = useState("");

  // Destination Block:
  const [destStreetAddress, setDestStreetAddress] = useState("");
  const [destStreetAddress2, setDestStreetAddress2] = useState("");
  const [destCity, setDestCity] = useState("");
  const [destState, setDestState] = useState(defaultStateCode);
  const [destZipCode, setDestZipCode] = useState("");
  const [destFloorSelector, setDestFloorSelector] = useState("");
  const [destElevatorCheck, setDestElevatorCheck] = useState(false);
  const [destLongWalkCheck, setDestLongWalkCheck] = useState(false);

  // Heavy items block:
  const [selectedHeavyItems, setSelectedHeavyItems] = useState<string[]>([]);
  const [inputHeavyDetails, setHeavyDetails] = useState("");
  const [largeMove, setLargeMove] = useState(false);

  // Size & Sevrices block:
  const [truck, setTruck] = useState(true);
  const [packing, setPacking] = useState(false);
  const [moveSize, setMoveSize] = useState("");
  const [recomMovers, setRecomMovers] = useState(0);
  const [defaultMovers, setDefaultMovers] = useState(true);
  const [selectedMovers, setSelectedMovers] = useState("2 movers");

  // Date and Time Block:
  const [date1, setDate1] = useState("");
  const [timeSlot1, setTimeSlot1] = useState("");
  const [evnTimeFlag1, setEvnTimeFlag1] = useState(false);
  const [evnTime1, setEvnTime1] = useState(threePM);
  const [exactTimeFlag1, setExactTimeFlag1] = useState(false);
  const [exactTime1, setExactTime1] = useState(eightAM);

  const [date2, setDate2] = useState("");
  const [timeSlot2, setTimeSlot2] = useState("");
  const [evnTimeFlag2, setEvnTimeFlag2] = useState(false);
  const [evnTime2, setEvnTime2] = useState(threePM);
  const [exactTimeFlag2, setExactTimeFlag2] = useState(false);
  const [exactTime2, setExactTime2] = useState(eightAM);

  const [date3, setDate3] = useState("");
  const [timeSlot3, setTimeSlot3] = useState("");
  const [evnTimeFlag3, setEvnTimeFlag3] = useState(false);
  const [evnTime3, setEvnTime3] = useState(threePM);
  const [exactTimeFlag3, setExactTimeFlag3] = useState(false);
  const [exactTime3, setExactTime3] = useState(eightAM);

  // Additional Info:
  const [addInfo, setAddInfo] = useState("");

  const capitalizeName = (input: string): string =>
    input ? input.trim().charAt(0).toLocaleUpperCase() + input.slice(1).toLocaleLowerCase() : "";

  const foo = (values: {
    firstName: string;
    lastName: string;
    email: string;
    acceptedTerms: boolean; // added for our checkbox
    jobType: string;
  }) => {
    alert(JSON.stringify(values, null, 2));
  };

  const wrapAndSubmit = async () => {
    const data = {
      //firstName : capitalizeName(values),
      //lastName: capitalizeName(lastName),
      email: email.trim().toLowerCase(),
      phoneNumber,
      pickupAddress,
      stopOneAddress,
      stopTwoAddress,
      destAddress,
      pickupFloorSelector,
      pickupElevatorCheck,
      pickupLongWalkCheck,
      destFloorSelector,
      destElevatorCheck,
      destLongWalkCheck,
      moveSize,
      truck,
      packing,
      selectedHeavyItems,
      inputHeavyDetails,
      defaultMovers,
      selectedMovers,
      date1,
      timeSlot1,
      evnTime1: evnTime1.toLocaleTimeString([], timeFormatOptions),
      exactTime1: exactTime1.toLocaleTimeString([], timeFormatOptions),
      date2,
      timeSlot2,
      evnTime2: evnTime2.toLocaleTimeString([], timeFormatOptions),

      exactTime2: exactTime2.toLocaleTimeString([], timeFormatOptions),
      date3,
      timeSlot3,
      evnTime3: evnTime3.toLocaleTimeString([], timeFormatOptions),
      exactTime3: exactTime3.toLocaleTimeString([], timeFormatOptions),
      addInfo,
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
        //console.log("Received API response: " + responseData);
        setIsSubmitted(true);
      } else {
        console.error("Request failed with status:", response.status);
        return "error";
      }
    } catch (error) {
      console.error("Request failed:", error);
      return "error";
    } finally {
      setIsSubmitting(false);
    }
  };

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
        //console.log("DEBUG: Received API response: " + responseData);
        const result = JSON.parse(responseData);
        setChosenAddressString(result.formattedAddress);
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

  // The value of null represents a recursive call. No need to validate the fields
  const validateSubmission = async (e: React.FormEvent<HTMLFormElement> | null) => {
    setIsSubmitting(true);
    if (e) {
      e.preventDefault();
    }
    const submittedForm = formRef.current;

    if (submittedForm && (e === null || submittedForm.checkValidity())) {
      // All fields are properly filled, verify the address and submit.

      // Valid address format STRICTLY: "250 Montana Street, San Francisco, CA 94112"
      addresses = [
        `${pickupStreetAddress.trim()}${
          pickupStreetAddress2 ? `, ${pickupStreetAddress2.trim()},` : ","
        } ${pickupCity}, ${pickupState} ${pickupZipCode}`,
        stopOne
          ? `${stopOneStreetAddress.trim()}${
              stopOneStreetAddress2 ? `, ${stopOneStreetAddress2.trim()},` : ","
            } ${stopOneCity}, ${stopOneState} ${stopOneZipCode}`
          : "",
        stopTwo
          ? `${stopTwoStreetAddress.trim()}${
              stopTwoStreetAddress2 ? `, ${stopTwoStreetAddress2.trim()},` : ","
            } ${stopTwoCity}, ${stopTwoState} ${stopTwoZipCode}`
          : "",
        `${destStreetAddress.trim()}${
          destStreetAddress2 ? `, ${destStreetAddress2.trim()},` : ","
        } ${destCity}, ${destState} ${destZipCode}`,
      ].filter(Boolean);

      // Reset the current address index and hide the modal
      setShowModal(false);

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

          //console.log("input: " + currentAddress);
          //console.log("corAdd: " + formattedAddress);

          // If the address is invalid, show the modal and exit the loop
          if (verdict === "ok") {
            await addressSetter(formattedAddress);
          } else if (verdict === "hasUnconfirmedComponents") {
            // The address is bad and can't be fixed
            setChosenAddressString(
              "We couldn't find this address.\nPlease, make sure it's correct."
            );
            setInvalidAddressString(true);
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
        wrapAndSubmit();
      }
    }
  };

  const handleModalResponse = (response: string) => {
    setInvalidAddressString(false);

    // Update the address fields based on the user's response
    addressSetter(response);

    // Hide the modal and continue validating the remaining addresses
    validateSubmission(null);
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

  const handleHeavyItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    if (checked) {
      setSelectedHeavyItems((prevSelectedItems) => [...prevSelectedItems, id]);
    } else {
      setSelectedHeavyItems((prevSelectedItems) => prevSelectedItems.filter((item) => item !== id));
    }
  };

  const handleZipCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9]/g, ""); // Remove non-digit characters
    setState(sanitizedInput);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9]/g, ""); // Remove non-digit characters
    const formattedInput = formatPhoneNumber(sanitizedInput);
    setPhoneNumber(formattedInput);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const updateMoveSize = (value: string) => {
    setMoveSize(value);
    if (!smallMoves.includes(value)) {
      setLargeMove(true);
    } else {
      setLargeMove(false);
    }
  };

  useEffect(() => {
    // Update the value of moversSelector based on the changed fields
    let recommendedMovers = 0;

    if (
      selectedHeavyItems.length === 0 &&
      ((moveSize !== "1-br" && smallMoves.includes(moveSize)) || (moveSize === "1-br" && !packing))
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
    if (selectedHeavyItems.length > 0) {
      recommendedMovers = Math.max(recommendedMovers, 4);
    }
    setRecomMovers(recommendedMovers);
  }, [moveSize, packing, selectedHeavyItems]);

  useEffect(() => {
    if (isSubmitted && formContainerRef.current) {
      scroller.scrollTo("thankYouMessage", {
        duration: 500,
        smooth: true,
        offset: -100, // Adjust the offset as needed
      });
    }
  }, [isSubmitted]);

  const currentDate = new Date();
  const minDate = currentDate.toISOString().split("T")[0];
  const maxDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 6,
    currentDate.getDate()
  )
    .toISOString()
    .split("T")[0];

  const handleTimeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectedValue = e.currentTarget.value;
    const id = e.currentTarget.id;

    if (id === "time-selector-1") {
      setTimeSlot1(selectedValue);
      setExactTimeFlag1(selectedValue === "Exact");
      setEvnTimeFlag1(selectedValue === "Evening");
    } else if (id === "time-selector-2") {
      setTimeSlot2(selectedValue);
      setExactTimeFlag2(selectedValue === "Exact");
      setEvnTimeFlag2(selectedValue === "Evening");
    } else if (id === "time-selector-3") {
      setTimeSlot3(selectedValue);
      setExactTimeFlag3(selectedValue === "Exact");
      setEvnTimeFlag3(selectedValue === "Evening");
    }
  };

  // Components:
  const header = (
    <div key="header">
      <div className="text-center">
        <h4>Request Reservation</h4>
      </div>
      <hr />
    </div>
  );

  const nameField = (
    <div className="row g-2" key="name-field">
      <div className="col">
        <label htmlFor="firstName" className="d-flex form-label fw-bold">
          First Name
        </label>
        <Field name="firstName" className="form-control" type="text" placeholder="Jane" />
        <ErrorMessage name="firstName" className="invalid-feedback" />
      </div>

      <div className="col">
        <MyTextInput label="Last Name" name="lastName" type="text" placeholder="Doe" />
      </div>
    </div>
  );

  const emailAndPhoneField = (
    <div key="email-and-phone-field">
      <br />
      <div className="row g-2">
        <div className="col mb-3">
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@gmail.com"
          />
        </div>
        <div className="col form-group">
          <MyTextInput
            minLength={12}
            maxLength={12}
            label="Phone"
            name="phone"
            type="tel"
            placeholder="###-###-####"
          />
        </div>
      </div>
    </div>
  );

  const pickupAddressFields = (
    <div key="pickup-address-fields" id="pickup-block">
      <div className="d-flex align-items-center justify-content-between">
        <label htmlFor="pickup-address" className="form-label fw-bold">
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

  const additionalStopOne = stopOne && (
    <div key="additional-stop-one-fields" id="stop-one-block">
      <br />
      <div className="d-flex justify-content-between">
        <label htmlFor="stop-one-address" className="form-label fw-bold">
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

  const additionalStopTwo = stopTwo && (
    <div key="additional-stop-two-fields" id="stop-two-block">
      <br />
      <div className="d-flex justify-content-between">
        <label htmlFor="stop-two-address" className="form-label fw-bold">
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

  const destAddressFields = (
    <div key="dropoff-address-fields">
      <br />
      <div className="d-flex">
        <label htmlFor="dest-address" className="form-label fw-bold">
          Destination address:
        </label>
      </div>
      <MyAddressBlock location="dest" name="dest-address-block" />
    </div>
  );

  const optionsSelector = (
    <div key="options-selector-key" id="options-selector-block">
      <br />
      <label className="d-flex form-check-label fw-bold mb-2" htmlFor="size-selector">
        Move size & required services:
      </label>
      <div className="row g-2 d-flex align-items-center">
        <div id="options-help" className="text-start form-text extra-small mt-0">
          Not sure which one to choose? Check out our{" "}
          <a href="https://www.kz2movingcompany.com/post/how-to-estimate-your-move-size">Guide</a>{" "}
        </div>
        <div className="row g-1 ms-0">
          <div className="col-md-6" id="options-selector">
            <div className="position-relative">
              <select
                className="col form-select"
                id="size-selector"
                aria-label="Size of your move selector"
                onInput={(e) => updateMoveSize(e.currentTarget.value)}
                defaultValue=""
                required>
                <option value="" disabled>
                  Size of your move...
                </option>
                <option value="Few items">Few items</option>
                <option value="Studio">Studio</option>
                <option value="1-br">1-bedroom</option>
                <option value="2-br">2-bedroom</option>
                <option value="3-br">3-bedroom</option>
                <option value="4-br">4-bedroom</option>
                <option value="5+ br">5+ bedroom</option>
                <option value="Small Storage">Small Storage</option>
                <option value="Medium Storage">Medium Storage</option>
                <option value="Large Storage">Large Storage</option>
                <option value="Office">Office</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="col-md-5 ms-1 d-flex align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="packing-check"
                value="false"
                onChange={(e) => setPacking(e.target.checked)}
                aria-label="Packing service check box"
              />
              <label className="form-check-label" htmlFor="packing-check">
                Packing
              </label>
            </div>
            <div className="ms-0">
              <HelpIcon helpMessage="Our team will wrap and pack into boxes small items such as kitchenware, electronics, frames, books, etc." />
            </div>
            <div className="form-check ms-5">
              <input
                className="form-check-input"
                type="checkbox"
                id="truck-check"
                value="true"
                onChange={(e) => setTruck(e.target.checked)}
                aria-label="Truck required check box"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="truck-check">
                Truck
              </label>
            </div>
            <div className="ms-0">
              <HelpIcon helpMessage="We have trucks of different sizes and will make sure to provide the right one." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const heavyItems = (
    <div key="heavy-items" id="heavy-check">
      <br />
      <label
        className="text-start form-check-label fw-bold d-flex align-items-center"
        htmlFor="Piano"
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="Piano"
              onChange={handleHeavyItemsChange}
              aria-label="Piano check box"
            />
            <label className="form-check-label ml-2" htmlFor="Piano">
              Piano
            </label>
          </div>
        </div>

        <div className="col d-flex">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="Gun Safe"
              onChange={handleHeavyItemsChange}
              aria-label="Gun safe check box"
            />
            <label className="form-check-label text-nowrap ml-2" htmlFor="Gun Safe">
              Gun Safe
            </label>
          </div>
        </div>

        <div className="col d-flex">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="Other Heavy Item"
              onChange={handleHeavyItemsChange}
              aria-label="Other heavy item check box"
            />
            <label className="form-check-label ml-2" htmlFor="Other Heavy Item">
              Other
            </label>
          </div>
        </div>
      </div>

      {selectedHeavyItems.length > 0 && (
        <div className="form-group" key-="heavy-item-description">
          <input
            type="text"
            className="form-control"
            id="heavy-description"
            placeholder="Tell us more about it..."
            value={inputHeavyDetails}
            onChange={(e) => setHeavyDetails(e.target.value)}
            aria-label="Heavy item description field"
          />
        </div>
      )}
    </div>
  );

  const numMoversSelector = (
    <div key="num-movers-key" id="num-movers-selector">
      <br />
      <label className="d-flex form-check-label fw-bold" htmlFor="recom-num-movers">
        Number of movers:
      </label>
      <div className="d-flex col">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="recom-num-movers"
            defaultChecked
            onChange={(e) => setDefaultMovers(e.target.checked)}
            aria-label="Proceed with recommended number of movers checkbox"
          />
          <label className="text-start form-check-label" htmlFor="recom-num-movers">
            Let KZ2 decide the most suitable team-size (Recommended)
          </label>
        </div>
      </div>
      {!defaultMovers && (
        <select
          className="form-select"
          aria-label="Select number of movers"
          key="num-movers-selector-key"
          value={selectedMovers}
          onInput={(e) => setSelectedMovers(e.currentTarget.value)}>
          <option value="" disabled>
            How many movers do you need...
          </option>
          <option value="2 movers">2 movers {recomMovers === 2 ? "(Recommended)" : ""}</option>
          <option value="3 movers">3 movers {recomMovers === 3 ? "(Recommended)" : ""}</option>
          <option value="4 movers">4 movers {recomMovers === 4 ? "(Recommended)" : ""}</option>
          <option value="5 movers">5 movers {recomMovers === 5 ? "(Recommended)" : ""}</option>
          <option value="6 movers">6 movers {recomMovers === 6 ? "(Recommended)" : ""}</option>
          <option value="Custom">I will specify at the end of the form</option>
        </select>
      )}
    </div>
  );

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
        Selecting time around noon is not advised as it limits our ability to serve other customers
      </div>
    </div>
  );

  const movingDates = (
    <div key="moving-dates-block-key" className="g-2">
      <br />
      <label htmlFor="date-1" className="d-flex form-check-label fw-bold">
        Preferred Dates & Times:
      </label>
      <div id="dates-block-1" className="row g-2 align-items-center mt-1">
        <label htmlFor="date-1" className="col-md-3 text-center">
          1st choice:
        </label>
        <div className="col-md-4 col-6">
          <input
            type="date"
            id="date-1"
            className="form-control"
            min={minDate}
            max={maxDate}
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            required
          />
        </div>

        <div className="col-md-5 col-6" id="time-selector">
          <select
            className="col form-select"
            id="time-selector-1"
            aria-label="Select start time"
            defaultValue=""
            onInput={(e) => handleTimeChange(e)}
            required>
            <option value="" disabled>
              Start time
            </option>
            <option value="Flexible time">Flexible time</option>
            <option value="Morning">Morning (8-10 AM)</option>
            <option value="Evening">Evening (3-5 PM)</option>
            <option value="Exact">Exact (Not advised)</option>
          </select>
        </div>
        {exactTimeFlag1 && (
          <div
            key="ex-note-1"
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert">
            {exactTimeNote}
            {largeMoveWarning}
            <div className="form-group">
              <label htmlFor="ex-time-1">Preferred Time:</label>
              <DatePicker
                id="ex-time-1"
                selected={exactTime1}
                onChange={(date) => date && setExactTime1(date)}
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
        {evnTimeFlag1 && (
          <div
            key="evn-note-1"
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert">
            {evnTimeNote}
            {largeMoveWarning}
            <div className="form-group">
              <label htmlFor="evn-time-1">What is the earliest time we can start:</label>
              <DatePicker
                id="evn-time-1"
                selected={evnTime1}
                onChange={(date) => date && setEvnTime1(date)}
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

      <div id="dates-block-2" className="row g-2 align-items-center mt-1">
        <div className="col-md-3">
          <label htmlFor="date-2" className="d-flex flex-column text-center">
            2nd choice:
            <span className="form-text mt-0 extra-small text-center">(Optional)</span>
          </label>
        </div>
        <div className="col-md-4 col-6">
          <input
            type="date"
            id="date-2"
            className="form-control"
            min={minDate}
            max={maxDate}
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
          />
        </div>

        <div className="col-md-5 col-6" id="time-selector-two">
          <select
            className="col form-select"
            id="time-selector-2"
            aria-label="Select time for 2nd preferred date"
            defaultValue=""
            onInput={(e) => handleTimeChange(e)}>
            <option value="" disabled>
              Start time
            </option>
            <option value="Flexible time">Flexible time</option>
            <option value="Morning">Morning (8-10 AM)</option>
            <option value="Evening">Evening (3-5 PM)</option>
            <option value="Exact">Exact (Not advised)</option>
          </select>
        </div>
        {exactTimeFlag2 && (
          <div
            key="ex-note-2"
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert">
            {exactTimeNote}
            {largeMoveWarning}
            <div className="form-group">
              <label htmlFor="ex-time-2">Preferred Time:</label>
              <DatePicker
                id="ex-time-2"
                selected={exactTime2}
                onChange={(date) => date && setExactTime2(date)}
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
        {evnTimeFlag2 && (
          <div
            key="evn-note-2"
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert">
            {evnTimeNote}
            {largeMoveWarning}
            <div className="form-group">
              <label htmlFor="evn-time-2">What is the earliest time we can start:</label>
              <DatePicker
                id="evn-time-2"
                selected={evnTime2}
                onChange={(date) => date && setEvnTime2(date)}
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

      <div id="dates-block-3" className="row g-2 align-items-center mt-1">
        <div className="col-md-3">
          <label htmlFor="date-3" className="d-flex flex-column text-center">
            3rd choice:
            <span className="form-text mt-0 extra-small text-center">(Optional)</span>
          </label>
        </div>
        <div className="col-md-4 col-6">
          <input
            type="date"
            id="date-3"
            className="form-control"
            min={minDate}
            max={maxDate}
            value={date3}
            onChange={(e) => setDate3(e.target.value)}
          />
        </div>

        <div className="col-md-5 col-6" id="time-selector-three">
          <select
            className="col form-select"
            id="time-selector-3"
            aria-label="Select time for 3rd preferred date"
            defaultValue=""
            onInput={(e) => handleTimeChange(e)}>
            <option value="" disabled>
              Start time
            </option>
            <option value="Flexible time">Flexible time</option>
            <option value="Morning">Morning (8-10 AM)</option>
            <option value="Evening">Evening (3-5 PM)</option>
            <option value="Exact">Exact (Not advised)</option>
          </select>
        </div>
        {exactTimeFlag3 && (
          <div
            key="ex-note-3"
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert">
            {exactTimeNote}
            {largeMoveWarning}
            <div className="form-group">
              <label htmlFor="ex-time-3">Preferred Time:</label>
              <DatePicker
                id="ex-time-3"
                selected={exactTime3}
                onChange={(date) => date && setExactTime3(date)}
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
        {evnTimeFlag3 && (
          <div
            key="evn-note-3"
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert">
            {evnTimeNote}
            {largeMoveWarning}
            <div className="form-group">
              <label htmlFor="evn-time-3">What is the earliest time we can start:</label>
              <DatePicker
                id="evn-time-3"
                selected={evnTime3}
                onChange={(date) => date && setEvnTime3(date)}
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
    </div>
  );

  const additionalInfo = (
    <div key="additional-info-block">
      <br />
      <label htmlFor="additional-info" className="d-flex form-check-label fw-bold mb-1">
        Additional Information:
      </label>
      <textarea
        id="additional-info"
        className="form-control"
        rows={3}
        placeholder="Anything else we should know..."
        aria-label="Additional information field"
        value={addInfo}
        onChange={(e) => setAddInfo(e.target.value)}></textarea>
    </div>
  );

  const checkAndSubmit = (
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
            <strong>Attention!</strong> Your move is not confirmed until you receive a confirmation
            via email. Be sure to check your spam.
          </p>
        </div>
        <div className="mt-2">
          <p className="m-0 text-start">
            This is a non-binding moving service request form. While we do our best to serve you,
            availability may vary.
          </p>
        </div>
        <div className="mt-2">
          <p className="m-0 text-start">We will never share your information with third parties.</p>
        </div>
        <MyCheckbox wrapperDivClassName="mt-2" name="confirmationCheckbox">
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

  const modalWindow = (
    <Modal
      show={showModal}
      onHide={() => {
        setIsSubmitting(false);
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
                {chosenAddressString &&
                  chosenAddressString.split(",").map((part, index) => {
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
            {!invalidAddressString && (
              <div className="col">
                <Button
                  className="text-nowrap"
                  variant="primary"
                  onClick={() => handleModalResponse(chosenAddressString)}>
                  Use Formatted
                </Button>
              </div>
            )}
            {invalidAddressString && (
              <div className="col">
                <Button
                  className="text-nowrap"
                  variant="primary"
                  onClick={() => {
                    setIsSubmitting(false);
                    setInvalidAddressString(false);
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

  form.push(header);
  form.push(nameField);
  form.push(emailAndPhoneField);
  form.push(pickupAddressFields);
  form.push(additionalStopOne);
  form.push(additionalStopTwo);
  form.push(destAddressFields);
  form.push(optionsSelector);
  form.push(heavyItems);
  form.push(numMoversSelector);
  form.push(movingDates);
  form.push(additionalInfo);
  form.push(checkAndSubmit);
  form.push(modalWindow);

  return (
    <div className="form-container" ref={formContainerRef}>
      {isSubmitted ? (
        <Element name="thankYouMessage" className="alert alert-success" role="alert">
          Thank you for your submission! We will get back to you shortly
        </Element>
      ) : (
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",

            pickupAddress: "",
            pickupStreetAddress: "",
            pickupStreetAddres2: "",
            pickupCity: "",
            pickupState: "CA",
            pickupZip: "",
            pickupFloorSelector: "",
            pickupElevatorCheck: false,
            pickupLongWalkCheck: false,

            stopOneAddress: "",
            stopOne: false,
            stopOneStreetAddress: "",
            stopOneStreetAddress2: "",
            stopOneCity: "",
            stopOneState: "CA",
            stopOneZip: "",

            stopTwoAddress: "",
            stopTwo: false,
            stopTwoStreetAddress: "",
            stopTwoStreetAddress2: "",
            stopTwoCity: "",
            stopTwoState: "CA",
            stopTwoZip: "",

            destAddress: "",
            destStreetAddress: "",
            destStreetAddres2: "",
            destCity: "",
            destState: "CA",
            destZip: "",
            destFloorSelector: "",
            destElevatorCheck: false,
            destLongWalkCheck: false,

            moveSize: "",
            truck: true,
            packing: false,
            selectedHeavyItems: [],
            inputHeavyDetails: "",
            defaultMovers: true,
            selectedMovers: "",
            acceptedTerms: false, // added for our checkbox
            jobType: "", // added for our select
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
            lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            phoneNumber: Yup.string()
              .required("Phone number is required")
              .test("valid-phone-number", "Invalid phone number", (value) => {
                // Regular expression to validate phone number format (e.g., xxx-xxx-xxxx)
                const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
                return phoneRegex.test(value);
              }),

            pickupAddress: Yup.string().required("Required"),
            pickupStreetAddress: Yup.string().required("Required"),
            pickupStreetAddres2: Yup.string(),
            pickupCity: Yup.string().required("Required"),
            pickupState: Yup.string().required("Required"),
            pickupFloorSelector: Yup.string().required("Required"),
            pickupElevatorCheck: Yup.boolean(),
            pickupLongWalkCheck: Yup.boolean(),

            stopOneAddress: Yup.string().required("Required"),
            stopOne: Yup.boolean(),
            stopOneStreetAddress: Yup.string(),
            stopOneStreetAddress2: Yup.string(),
            stopOneCity: Yup.string(),
            stopOneState: Yup.string(),
            stopOneZipCode: Yup.string(),

            stopTwoAddress: Yup.string(),
            stopTwo: Yup.boolean(),
            stopTwoStreetAddress: Yup.string(),
            stopTwoStreetAddress2: Yup.string(),
            stopTwoCity: Yup.string(),
            stopTwoState: Yup.string(),
            stopTwoZipCode: Yup.string(),

            destAddress: Yup.string().required("Required"),
            destStreetAddress: Yup.string().required("Required"),
            destStreetAddres2: Yup.string(),
            destCity: Yup.string().required("Required"),
            destState: Yup.string().required("Required"),
            destFloorSelector: Yup.string().required("Required"),
            destElevatorCheck: Yup.boolean(),
            destLongWalkCheck: Yup.boolean(),

            moveSize: Yup.string().required("Required"),
            truck: Yup.boolean(),
            packing: Yup.boolean(),
            selectedHeavyItems: Yup.array().of(Yup.string()),
            inputHeavyDetails: Yup.string(),
            defaultMovers: Yup.boolean(),
            selectedMovers: Yup.string(),
            confirmationCheckbox: Yup.boolean()
              .required("Required")
              .oneOf([true], "You have to agree to proceed."),
            jobType: Yup.string()
              .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log("submitting!"), foo(values), setSubmitting(false);
            }, 400);
          }}>
          <Form>
            {form}
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default FormWFormik;
