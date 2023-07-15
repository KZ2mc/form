import React from "react";
import { useField } from "formik";
import { MyCheckboxProps } from "./Interfaces.tsx"; // Import your custom types/interfaces

const MyCheckbox: React.FC<MyCheckboxProps> = ({ children, addfunc, req, wrap, ...props }) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });

  // Executes additional functionality and the default onChange behavior
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);
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

export default MyCheckbox;
