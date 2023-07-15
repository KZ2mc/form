import React from "react";
import { useField, useFormikContext } from "formik";
import { MyTextInputProps, FormValues } from "./Interfaces.tsx";

const MyTextInput: React.FC<MyTextInputProps> = ({ addfunc, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext<FormValues>();

  // Allows only digits and inserts dashes to get ###-###-#### format
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = input
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{3})(\d{0,3})(\d{0,4})$/, (_, g1, g2, g3) => {
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

export default MyTextInput;
