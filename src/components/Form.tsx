import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import states from "states-us";
import "./Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import HelpIcon from "./HelpIcon";

const Form: React.FC = () => {
  const form = [];

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pickupZipCode, setPickupZipCode] = useState("");
  const [destZipCode, setDestZipCode] = useState("");
  const [selectedHeavyItems, setSelectedHeavyItems] = useState<string[]>([]);
  const [longWalk, setLongWalk] = useState(false);
  const [truck, setTruck] = useState(true);
  const [packing, setPacking] = useState(false);
  const [moveSize, setMoveSize] = useState("");
  const [recomMovers, setRecomMovers] = useState(0);
  const [defaultMovers, setDefaultMovers] = useState(true);
  const [stopOne, setStopOne] = useState(false);
  const [stopTwo, setStopTwo] = useState(false);
  const [evnTime1, setEvnTime1] = useState(false);
  const [exactTime1, setExactTime1] = useState(false);
  const [evnTime2, setEvnTime2] = useState(false);
  const [exactTime2, setExactTime2] = useState(false);
  const [evnTime3, setEvnTime3] = useState(false);
  const [exactTime3, setExactTime3] = useState(false);

  const handleHeavyItemsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = event.target;

    if (checked) {
      setSelectedHeavyItems((prevSelectedItems) => [...prevSelectedItems, id]);
    } else {
      setSelectedHeavyItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== id)
      );
    }
  };

  const handleZipCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const input = event.target.value;
    const sanitizedInput = input.replace(/[^0-9]/g, ""); // Remove non-digit characters
    setState(sanitizedInput);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
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

  useEffect(() => {
    // Update the value of moversSelector based on the changed fields
    let recommendedMovers = 0;

    if (
      selectedHeavyItems.length === 0 &&
      (moveSize === "Few items" ||
        moveSize === "Studio" ||
        moveSize === "Small Storage" ||
        moveSize === "Medium Storage" ||
        (moveSize === "1-bedroom" && !packing))
    ) {
      recommendedMovers = 2;
    } else {
      if (moveSize === "3-bedroom" || selectedHeavyItems.length > 0) {
        recommendedMovers = 4;
      } else if (moveSize === "1-bedroom") {
        recommendedMovers = 2;
      } else if (moveSize === "2-bedroom" || moveSize === "Large Storage") {
        recommendedMovers = 3;
      } else if (moveSize === "4-bedroom" || moveSize === "5+ bedroom") {
        recommendedMovers = 5;
      }
      if (recommendedMovers > 0 && packing) {
        recommendedMovers += 1;
      }
    }
    setRecomMovers(recommendedMovers);
  }, [moveSize, packing, selectedHeavyItems]);

  const header = (
    <div key="header">
      <div className="text-center">
        <h4>Request Reservation</h4>
      </div>
      <hr />
    </div>
  );

  const nameField = (
    <div className="row g-2" key="nameField">
      <div className="col">
        <label htmlFor="validationCustom01" className="form-label fw-bold">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom01"
          placeholder="Jane"
          aria-label="First Name"
          required
        />
      </div>
      <div className="valid-feedback">Looks good!</div>
      <div className="col">
        <label htmlFor="validationCustom02" className="form-label fw-bold">
          Last name
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom02"
          placeholder="Doe"
          aria-label="Last name"
          required
        />
      </div>
      <div className="valid-feedback">Looks good!</div>
    </div>
  );

  const emailAndPhoneField = (
    <div key="emailAndPhoneField">
      <br />
      <div className="row g-2">
        <div className="col mb-3">
          <label htmlFor="validationDefault03" className="form-label fw-bold">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="validationDefault03"
            placeholder="name@example.com"
            aria-describedby="dataHelp"
            required
          />
          <div id="dataHelp" className="form-text extra-small">
            We'll never share your data.
          </div>
          <div className="invalid-feedback">Please provide a valid email.</div>
        </div>
        <div className="col form-group">
          <label htmlFor="phoneInput" className="form-label fw-bold">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneInput"
            placeholder="###-###-####"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            maxLength={12}
            required
          />
        </div>
      </div>
    </div>
  );

  const stateOptions = states.map((state) => (
    <option key={state.abbreviation} value={state.abbreviation}>
      {state.abbreviation}
    </option>
  ));
  const defaultStateCode = "CA";

  const pickupAddressFields = (
    <div key="pickupAddressFields">
      <label htmlFor="pickupBlock" className="form-label fw-bold">
        Pickup address:
      </label>
      <div className="row g-2" id="pickupBlock">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="pickupAddress"
            placeholder="1234 Main St"
            required
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="pickupAddress2"
            placeholder="Apartment, unit, or office"
          />
        </div>
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            id="pickupCity"
            placeholder="City"
            required
          />
        </div>
        <div className="col-md-2">
          <select
            id="pickupState"
            className="form-select"
            defaultValue={defaultStateCode}
            required
          >
            {stateOptions}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            id="pickupZipCode"
            value={pickupZipCode}
            onChange={(event) => handleZipCodeChange(event, setPickupZipCode)}
            className="form-control"
            placeholder="Zip"
            maxLength={5}
            required
          />
        </div>
        <div className="row g-1 ms-0">
          <div className="col-md-6">
            <select
              className="col form-select"
              id="pickupFloorSelector"
              aria-label="pickupFloorSelector"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Most of the stuff is on the...
              </option>
              <option value="Ground">Ground floor</option>
              <option value="1st floor">1st floor</option>
              <option value="2nd floor">2nd floor</option>
              <option value="3rd floor">3rd floor</option>
              <option value="4th floor">4th floor</option>
              <option value="5+ floor">5+ floor</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-5 ms-1 d-flex align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="pickupElevatorCheck"
                value=""
              />
              <label className="form-check-label" htmlFor="pickupElevatorCheck">
                Elevator
              </label>
            </div>
            <div className="form-check ms-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="pickupLongWalkCheck"
              />
              <label
                className="form-check-label text-nowrap"
                htmlFor="pickupLongWalkCheck"
              >
                Long Walk
              </label>
            </div>
            <div className="ms-0 align-self-center">
              <HelpIcon helpMessage="No extra charge. It is to help us better understand the task." />
            </div>
          </div>
        </div>
      </div>

      {!stopOne && (
        <div className="text-center mt-2">
          <button
            type="button"
            id="addStopOne"
            className="btn btn-light rounded-circle fw-bold border btn-sm"
            onClick={() => setStopOne(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <label className="form-check-label ms-2" htmlFor="addStopOne">
            Add a stop
          </label>
        </div>
      )}
    </div>
  );

  const additionalStopOne = stopOne && (
    <div key="additionalStopOneFields">
      <br />
      <div className="d-flex align-items-center justify-content-between">
        <label htmlFor="pickupBlock" className="form-label fw-bold">
          Stop One address:
        </label>
        <div>
          {!stopTwo && (
            <button
              type="button"
              id="removeStopOne"
              className="btn-close border btn-light"
              onClick={() => setStopOne(false)}
            />
          )}
        </div>
      </div>
      <div className="row g-2" id="pickupBlock">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="pickupAddress"
            placeholder="1234 Main St"
            required
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="pickupAddress2"
            placeholder="Apartment, unit, or office"
          />
        </div>
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            id="pickupCity"
            placeholder="City"
            required
          />
        </div>
        <div className="col-md-2">
          <select
            id="pickupState"
            className="form-select"
            defaultValue={defaultStateCode}
            required
          >
            {stateOptions}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            id="pickupZipCode"
            value={pickupZipCode}
            onChange={(event) => handleZipCodeChange(event, setPickupZipCode)}
            className="form-control"
            placeholder="Zip"
            maxLength={5}
            required
          />
        </div>
      </div>
      {!stopTwo && (
        <div className="row align-items-center">
          <div className="col text-center mt-2">
            <button
              type="button"
              id="addStopTwo"
              className="btn btn-light rounded-circle fw-bold border btn-sm"
              onClick={() => setStopTwo(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <label className="form-check-label ms-2" htmlFor="addStopTwo">
              Add a stop
            </label>
          </div>
        </div>
      )}
    </div>
  );

  const additionalStopTwo = stopTwo && (
    <div key="additionalStopOneFields">
      <br />
      <div className="d-flex align-items-center justify-content-between">
        <label htmlFor="pickupBlock" className="form-label fw-bold">
          Stop Two address:
        </label>
        <div className="text-center mt-2">
          <button
            type="button"
            id="removeStopTwo"
            className="btn-close border btn-light"
            onClick={() => setStopTwo(false)}
          />
        </div>
      </div>
      <div className="row g-2" id="pickupBlock">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="pickupAddress"
            placeholder="1234 Main St"
            required
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="pickupAddress2"
            placeholder="Apartment, unit, or office"
          />
        </div>
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            id="pickupCity"
            placeholder="City"
            required
          />
        </div>
        <div className="col-md-2">
          <select
            id="pickupState"
            className="form-select"
            defaultValue={defaultStateCode}
            required
          >
            {stateOptions}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            id="pickupZipCode"
            value={pickupZipCode}
            onChange={(event) => handleZipCodeChange(event, setPickupZipCode)}
            className="form-control"
            placeholder="Zip"
            maxLength={5}
            required
          />
        </div>
      </div>
    </div>
  );

  const dropoffAddressFields = (
    <div key="dropoffAddressFields">
      <br />
      <label htmlFor="destBlock" className="form-label fw-bold">
        Destination address:
      </label>
      <div className="row g-2" id="destBlock">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="destAddress"
            placeholder="1234 Main St"
            required
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="destAddress2"
            placeholder="Apartment, unit, or office"
          />
        </div>
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            id="destCity"
            placeholder="City"
            required
          />
        </div>
        <div className="col-md-2">
          <select
            id="inputState"
            className="form-select"
            defaultValue={defaultStateCode}
            required
          >
            {stateOptions}
          </select>
        </div>
        <div className="col-md-3">
          <input
            id="destZipCode"
            value={destZipCode}
            onChange={(event) => handleZipCodeChange(event, setDestZipCode)}
            type="text"
            className="form-control"
            placeholder="Zip"
            maxLength={5}
            required
          />
        </div>
        <div className="row g-1 ms-0">
          <div className="col-md-6">
            <select
              className="col form-select"
              id="pickupFloorSelector"
              aria-label="pickupFloorSelector"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Most of the stuff goes to...
              </option>
              <option value="Ground">Ground floor</option>
              <option value="1st floor">1st floor</option>
              <option value="2nd floor">2nd floor</option>
              <option value="3rd floor">3rd floor</option>
              <option value="4th floor">4th floor</option>
              <option value="5+ floor">5+ floor</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-5 ms-1 d-flex align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="pickupElevatorCheck"
                value=""
              />
              <label className="form-check-label" htmlFor="pickupElevatorCheck">
                Elevator
              </label>
            </div>
            <div className="form-check ms-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="pickupLongWalkCheck"
              />
              <label
                className="form-check-label text-nowrap"
                htmlFor="pickupLongWalkCheck"
              >
                Long Walk
              </label>
            </div>
            <div className="ms-0 align-self-center">
              <HelpIcon helpMessage="No extra charge. It is to help us better understand the task." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const optionsSelector = (
    <div key="optionsSelector">
      <br />
      <div className="row g-2 d-flex align-items-center">
        <label
          id="optionsHelp"
          className="form-check-label fw-bold"
          htmlFor="optionsSelectorId"
        >
          Move size & required services:
        </label>
        <div id="optionsHelp" className="form-text extra-small mt-0">
          Not sure which one to choose? Check out{" "}
          <a href="https://www.kz2movingcompany.com/prices">LINK</a> for help
        </div>
        <div className="row g-1 ms-0">
          <div className="col-md-6" id="optionsSelectorId">
            <div className="position-relative">
              <select
                className="col form-select"
                id="sizeSelector"
                aria-label="sizeSelector"
                onInput={(event) => setMoveSize(event.currentTarget.value)}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Size of your move ...
                </option>
                <option value="Few items">Few items</option>
                <option value="Studio">Studio</option>
                <option value="1-bedroom">1-bedroom</option>
                <option value="2-bedroom">2-bedroom</option>
                <option value="3-bedroom">3-bedroom</option>
                <option value="4-bedroom">4-bedroom</option>
                <option value="5+ bedroom">5+ bedroom</option>
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
                id="packingCheck"
                value="false"
                onChange={(event) => setPacking(event.target.checked)}
              />
              <label className="form-check-label" htmlFor="packingCheck">
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
                id="truckCheck"
                value="true"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="truckCheck">
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
    <div key="heavyItems">
      <br />
      <label
        className="form-check-label fw-bold d-flex align-items-center"
        htmlFor="heavyCheck"
        aria-describedby="heavyHelp"
      >
        Extra Heavy (300+ lb) or Oversized items:
        <span className="ms-2">
          <HelpIcon helpMessage="Such items usually require 4 movers. Most TVs, mattresses, couches, dressers, washers, fridges, and treadmills are considered regular items." />
        </span>
      </label>
      <div id="heavyHelp" className="form-text extra-small mt-0">
        May be charged extra. See{" "}
        <a href="https://www.kz2movingcompany.com/prices">Prices</a> for more
        information
      </div>

      <div className="row g-2 align-items-center" id="heavyCheck">
        <div className="col d-flex flex-column">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="pianoCheck"
              onChange={handleHeavyItemsChange}
            />
            <label className="form-check-label" htmlFor="pianoCheck">
              Piano
            </label>
          </div>
        </div>

        <div className="col d-flex flex-column">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gunSafeCheck"
              onChange={handleHeavyItemsChange}
            />
            <label
              className="form-check-label text-nowrap"
              htmlFor="gunSafeCheck"
            >
              Gun Safe
            </label>
          </div>
        </div>

        <div className="col d-flex flex-column">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="otherHeavyCheck"
              onChange={handleHeavyItemsChange}
            />
            <label className="form-check-label" htmlFor="otherHeavyCheck">
              Other
            </label>
          </div>
        </div>
      </div>

      {selectedHeavyItems.length > 0 && (
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="heavyDescription"
            placeholder="Tell us more about it..."
          />
        </div>
      )}
    </div>
  );

  const numMoversSelector = (
    <div key="numMoversSelector" id="numMoversSelectorId">
      <br />
      <label className="form-check-label fw-bold" htmlFor="numMoversSelectorId">
        Number of movers:
      </label>
      <div className="col">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="otherHeavyCheck"
            defaultChecked
            onChange={(event) => setDefaultMovers(event.target.checked)}
          />
          <label className="form-check-label" htmlFor="otherHeavyCheck">
            Let KZ2 decide the most suitable team-size (Recommended)
          </label>
        </div>
      </div>
      {!defaultMovers && (
        <select
          className="form-select"
          aria-label="select num movers"
          defaultValue=""
        >
          <option value="" disabled>
            How many movers do you need...
          </option>
          <option value="2">
            2 movers {recomMovers === 2 ? "(Recommended)" : ""}
          </option>
          <option value="3">
            3 movers {recomMovers === 3 ? "(Recommended)" : ""}
          </option>
          <option value="4">
            4 movers {recomMovers === 4 ? "(Recommended)" : ""}
          </option>
          <option value="5">
            5 movers {recomMovers === 5 ? "(Recommended)" : ""}
          </option>
          <option value="6">
            6 movers {recomMovers === 6 ? "(Recommended)" : ""}
          </option>
          <option value="7">I will specify at the end of the form</option>
        </select>
      )}
    </div>
  );

  const currentDate = new Date();
  const minDate = currentDate.toISOString().split("T")[0];
  const maxDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 6,
    currentDate.getDate()
  )
    .toISOString()
    .split("T")[0];

  const handleTimeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const selectedValue = event.currentTarget.value;
    const id = event.currentTarget.id;

    if (id === "timeSelector1") {
      setExactTime1(selectedValue === "Exact");
      setEvnTime1(selectedValue === "Evening");
    } else if (id === "timeSelector2") {
      setExactTime2(selectedValue === "Exact");
      setEvnTime2(selectedValue === "Evening");
    } else if (id === "timeSelector3") {
      setExactTime3(selectedValue === "Exact");
      setEvnTime3(selectedValue === "Evening");
    }
  };

  const movingDates = (
    <div key="movingDatesBlock" className="g-2">
      <br />
      <label htmlFor="datesBlock" className="form-check-label fw-bold">
        Preferred Dates & Times:
      </label>
      <div id="datesBlock" className="row g-2 align-items-center mt-1">
        <label htmlFor="date1" className="col-md-3 text-center">
          1st choice:
        </label>
        <div className="col-md-4">
          <input
            type="date"
            id="date1"
            className="form-control"
            min={minDate}
            max={maxDate}
            required
          />
        </div>

        <div className="col-md-5" id="timeSelector">
          <select
            className="col form-select"
            id="timeSelector1"
            aria-label="timeSelector1"
            defaultValue=""
            onInput={(event) => handleTimeChange(event)}
            required
          >
            <option value="" disabled>
              Select start time ...
            </option>
            <option value="Flexible time">Flexible time</option>
            <option value="Morning">Morning (8-10 AM)</option>
            <option value="Evening">Evening (3-5 PM)</option>
            <option value="Exact">Exact (Not advised)</option>
          </select>
        </div>
        {exactTime1 && (
          <div
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert"
          >
            <p>
              <strong>Note:</strong> Selecting time around noon is not advised
              as it limits our ability to serve other customers
            </p>
            <p>
              <label htmlFor="time">Preferred Time:</label>
              <input className="ms-2" type="time" id="time1" />
            </p>
          </div>
        )}
        {evnTime1 && (
          <div
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert"
          >
            <p>
              <strong>Note:</strong> The team might become available before 3 PM
            </p>
            <p>
              <label htmlFor="time">
                What is the earliest time we can start:
              </label>
              <input className="ms-2" type="time" id="time1" />
            </p>
          </div>
        )}
      </div>

      <div id="datesBlock" className="row g-2 align-items-center mt-1">
        <div className="col-md-3">
          <label htmlFor="date2" className="d-flex flex-column text-center">
            2nd choice:
            <span className="form-text mt-0 extra-small text-center">
              (Optional)
            </span>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="date"
            id="date2"
            className="form-control"
            min={minDate}
            max={maxDate}
          />
        </div>

        <div className="col-md-5" id="timeSelector">
          <select
            className="col form-select"
            id="timeSelector2"
            aria-label="timeSelector2"
            defaultValue=""
            onInput={(event) => handleTimeChange(event)}
            required
          >
            <option value="" disabled>
              Select start time ...
            </option>
            <option value="Flexible time">Flexible time</option>
            <option value="Morning">Morning (8-10 AM)</option>
            <option value="Evening">Evening (3-5 PM)</option>
            <option value="Exact">Exact (Not advised)</option>
          </select>
        </div>
        {exactTime2 && (
          <div
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert"
          >
            <p>
              <strong>Note:</strong> Selecting time around noon is not advised
              as it limits our ability to serve other customers
            </p>
            <p>
              <label htmlFor="time">Preferred Time:</label>
              <input className="ms-2" type="time" id="time1" />
            </p>
          </div>
        )}
        {evnTime2 && (
          <div
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert"
          >
            <p>
              <strong>Note:</strong> The team might become available before 3 PM
            </p>
            <p>
              <label htmlFor="time">
                What is the earliest time we can start:
              </label>
              <input className="ms-2" type="time" id="time1" />
            </p>
          </div>
        )}
      </div>

      <div id="datesBlock" className="row g-2 align-items-center mt-1">
        <div className="col-md-3">
          <label htmlFor="date2" className="d-flex flex-column text-center">
            3rd choice:
            <span className="form-text mt-0 extra-small text-center">
              (Optional)
            </span>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="date"
            id="date3"
            className="form-control"
            min={minDate}
            max={maxDate}
          />
        </div>

        <div className="col-md-5" id="timeSelector">
          <select
            className="col form-select"
            id="timeSelector3"
            aria-label="timeSelector3"
            defaultValue=""
            onInput={(event) => handleTimeChange(event)}
            required
          >
            <option value="" disabled>
              Select start time ...
            </option>
            <option value="Flexible time">Flexible time</option>
            <option value="Morning">Morning (8-10 AM)</option>
            <option value="Evening">Evening (3-5 PM)</option>
            <option value="Exact">Exact (Not advised)</option>
          </select>
        </div>
        {exactTime3 && (
          <div
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert"
          >
            <p>
              <strong>Note:</strong> Selecting time around noon is not advised
              as it limits our ability to serve other customers
            </p>
            <p>
              <label htmlFor="time">Preferred Time:</label>
              <input className="ms-2" type="time" id="time1" />
            </p>
          </div>
        )}
        {evnTime3 && (
          <div
            className="col-md-12 alert alert-primary align-items-center me-3"
            role="alert"
          >
            <p>
              <strong>Note:</strong> The team might become available before 3 PM
            </p>
            <p>
              <label htmlFor="time">
                What is the earliest time we can start:
              </label>
              <input className="ms-2" type="time" id="time1" />
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const additionalInfo = (
    <div>
      <br />
      <label htmlFor="additionalInfo" className="form-check-label fw-bold mb-1">
        Additional Information:
      </label>
      <textarea
        id="additionalInfo"
        className="form-control"
        rows={3}
        placeholder="Anything else we should know..."
      ></textarea>
    </div>
  );

  const checkAndSubmit = (
    <div key="checkAndSubmit">
      <br />
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="info-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
      </svg>

      <div
        className="alert alert-primary d-flex flex-column align-items-start me-3 w-100"
        role="alert"
      >
        <div className="d-flex align-items-center">
          <svg
            className="bi flex-shrink-0 me-4"
            width="32"
            height="32"
            role="img"
            aria-label="Info:"
          >
            <use xlinkHref="#info-fill" />
          </svg>

          <p className="m-0">
            <strong>Attention!</strong> Your move is not confirmed until you
            receive a confirmation via email. Be sure to check your spam.
          </p>
        </div>
        <div className="mt-2">
          <p className="m-0">
            This is a non-binding moving service request form. While we do our
            best to serve you, availability may vary.
          </p>
        </div>
        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="confirmationCheckbox"
            required
          />
          <label className="form-check-label" htmlFor="gridCheck">
            I agree
          </label>
        </div>
      </div>

      <div className="col-12 text-center mb-3">
        <button type="submit" className="btn btn-primary">
          Submit Reservation Request
        </button>
      </div>
    </div>
  );

  form.push(header);
  form.push(nameField);
  form.push(emailAndPhoneField);
  form.push(pickupAddressFields);
  form.push(additionalStopOne);
  form.push(additionalStopTwo);
  form.push(dropoffAddressFields);
  form.push(optionsSelector);
  form.push(heavyItems);
  form.push(numMoversSelector);
  form.push(movingDates);
  form.push(additionalInfo);
  form.push(checkAndSubmit);

  // custom validation temporarily not available. Add noValidate to className when it's fixed
  return <form className="form-container needs-validation">{form}</form>;
};

export default Form;
