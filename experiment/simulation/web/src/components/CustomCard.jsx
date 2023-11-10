import { Card } from "@mui/material";
import React from "react";

const CustomCard = ({ Children, large, small }) => {
  return (
    <Card
      sx={{
        width: large ? 400 : 200,
        height: small ? 200 : 270,
        backgroundColor: "transparent",
        border: "1px solid #22eff1",
        marginTop: large ? 0 : 5,
        marginRight: 3,
      }}
    >
      {Children}
    </Card>
  );
};
export default CustomCard;
