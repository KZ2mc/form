import React from "react";
import { useField, useFormikContext } from "formik";
import { FormValues, MyDateInputProps } from "./FormInterfaces.tsx";

const currentDate = new Date();
const minDate = currentDate.toISOString().split("T")[0];
const maxDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 6,
  currentDate.getDate()
)
  .toISOString()
  .split("T")[0];

const MyDateInput: React.FC<MyDateInputProps> = ({ name, label, ...props }) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
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

export default MyDateInput;
