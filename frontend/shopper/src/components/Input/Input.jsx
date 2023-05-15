import React from "react";
import "./Input.css";

const Input = (props) => {
  const {
    type = "text",
    width = 4,
    placeholder = "Insira a informação",
    value = "",
  } = props;
  return (
    <div>
      <input
        type={`${type}`}
        className={`input w-${width}`}
        placeholder={`${placeholder}`}
        value={`${value}`}
      />
    </div>
  );
};

export default Input;
