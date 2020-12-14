import React, { useEffect, useState } from "react";
import { StyledButton } from "./styled";

const Button = ({ text, color }) => {

  return (
    <StyledButton color={color}>
      <p>{text}</p>
    </StyledButton>
  );
};

export default Button;
