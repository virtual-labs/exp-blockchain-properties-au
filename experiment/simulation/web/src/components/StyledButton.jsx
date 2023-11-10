import React from "react";
import styled from "styled-components/macro";

const Button = styled.button`
  background: ${(props) => (props["data-active"] ? "grey" : "transparent")};
  border-radius: 10px;
  color: #bf4f74;
  margin: 0 1em;
  padding: 1em 1em;
  transition: all 0.3s ease 0s;
  box-shadow: ${(props) =>
    props["data-active"] ? "none" : "0 3px 10px 2px #22eff1"};
  width: ${(props) => (props["data-small"] ? "50px" : "150px ")};
  fontsize: 10px;
  border: null;
  &:hover {
    transform: translateY(8px);

    box-shadow: 0 3px 5px 2px #ecf3ab;
  }
  button.btn {
    backgroundcolor: "white";
  }
`;
const StyledButton = ({ onClick, children, disabled, small = false }) => {
  console.log("hello", disabled);
  return (
    <Button
      data-active={disabled}
      data-small={small}
      style={{ fontSize: 12, color: "white" }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
export default StyledButton;
