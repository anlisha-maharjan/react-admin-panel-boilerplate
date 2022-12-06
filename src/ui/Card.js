import React from "react";
import * as Mui from "@mui/material";

const StyledCard = Mui.styled(Mui.Paper)(({ theme }) => ({
  borderRadius: "1rem",
  boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
  backgroundColor: theme.palette.body.light,
}));

const Card = (props) => {
  return <StyledCard {...props}>{props.children}</StyledCard>;
};

export default Card;
