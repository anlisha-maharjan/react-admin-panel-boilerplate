import React, { useMemo } from "react";
import * as Mui from "@mui/material";
import { Link } from "react-router-dom";
import { StyledCard, StyledButton } from "ui";
import graphics from "assets/images/graphics--001.svg";

const Dashboard = () => {
  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  }, [localStorage.getItem("currentUser")]);

  return (
    <StyledCard sx={{ padding: "2.5rem", backgroundColor: "#c8facd" }}>
      <Mui.Box display="flex" justifyContent="space-between" gap="5rem">
        <Mui.Box maxWidth="50%">
          <Mui.Typography component="h4" fontSize="2.5rem" fontWeight="700">
            Welcome back! <br /> {user?.name}
          </Mui.Typography>
          <Mui.Typography component="p" my={3}>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout.
          </Mui.Typography>
          <StyledButton type="button" component={Link} to={"/profile"}>
            Go to Profile
          </StyledButton>
        </Mui.Box>

        <Mui.Box maxWidth="20rem" flexShrink="0" component="figure" sx={{ m: 0 }}>
          <img className="w-full" src={graphics} alt="" />
        </Mui.Box>
      </Mui.Box>
    </StyledCard>
  );
};

export default Dashboard;
