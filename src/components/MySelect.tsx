import React from "react";
import { useField } from "formik";
import { MySelectProps } from "./Interfaces.tsx";

const MySelect: React.FC<MySelectProps> = ({ addfunc, ...props }) => {
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

export default MySelect;
