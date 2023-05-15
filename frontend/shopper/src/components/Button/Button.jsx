import React from "react";
import "./Button.css";

const Button = (props) => {
  const { children, funcao = () => {} } = props;
  return (
    <button onClick={funcao} className="button">
      {children}
    </button>
  );
};

export default Button;
