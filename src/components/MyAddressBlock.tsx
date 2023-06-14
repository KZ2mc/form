import React from "react";
import { useFormikContext } from "formik";
import MyTextInput from "./MyTextInput.tsx";
import MySelect from "./MySelect.tsx";
import MyCheckbox from "./MyCheckbox.tsx";
import HelpIcon from "./HelpIcon.tsx";
import states from "states-us";
import { FormValues, MyAddressBlockProps } from "./FormInterfaces.tsx";

const MyAddressBlock: React.FC<MyAddressBlockProps> = ({ location, ...props }) => {
  const { setFieldValue } = useFormikContext<FormValues>();

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

export default MyAddressBlock;
