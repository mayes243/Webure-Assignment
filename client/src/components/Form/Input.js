import React from "react";
import { styles } from "../../constants";
import { ErrorMessage } from "formik";

const Input = ({ label, type, name, ...props }) => {
  return (
    <>
      <label
        className={styles.label}
        htmlFor={label}
        style={{ textTransform: "capitalize" }}
      >
        {label}
      </label>
      <input
        className={styles.field}
        id={label}
        type={type}
        name={name}
        autoComplete={label}
        {...props}
      />
      <ErrorMessage component="a" className={styles.errorMsg} name={name} />
    </>
  );
};

export default Input;
