import React from "react";
import { useFormikContext } from "formik";
import { FormValues, MyDateAndTimeBlockProps } from "./Interfaces.tsx";
import DatePicker from "react-datepicker";
import MyDateInput from "./MyDateInput";
import MySelect from "./MySelect.tsx";
import { setHours, setMinutes } from "date-fns";

const MyDateAndTimeBlock: React.FC<MyDateAndTimeBlockProps> = ({
  label,
  flags,
  flagSetters,
  ...props
}) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

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

  const handleTimeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectedValue = e.currentTarget.value;
    const id = e.currentTarget.id;

    if (id === "timeSlot1") {
      flagSetters.setExactTimeFlag1(selectedValue === "Exact");
      flagSetters.setEvnTimeFlag1(selectedValue === "Evening");
    } else if (id === "timeSlot2") {
      flagSetters.setExactTimeFlag2(selectedValue === "Exact");
      flagSetters.setEvnTimeFlag2(selectedValue === "Evening");
    } else if (id === "timeSlot3") {
      flagSetters.setExactTimeFlag3(selectedValue === "Exact");
      flagSetters.setEvnTimeFlag3(selectedValue === "Evening");
    }
  };

  const largeMoveWarning = flags.largeMove && (
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

  const id = props.id;
  const exactTimeFlags = {
    "1": flags.exactTimeFlag1,
    "2": flags.exactTimeFlag2,
    "3": flags.exactTimeFlag3,
  };

  const evnTimeFlags = {
    "1": flags.evnTimeFlag1,
    "2": flags.evnTimeFlag2,
    "3": flags.evnTimeFlag3,
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

export default MyDateAndTimeBlock;
