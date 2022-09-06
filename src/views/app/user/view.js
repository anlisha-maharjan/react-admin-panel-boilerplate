import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Breadcrumb from "src/components/breadcrumb";
import { getUser } from "src/reduxs/actions";
import { IconChevronLeft, IconMail, IconPhone, IconPin } from "src/components/svg";

const ViewUser = (props) => {
  const theme = useTheme();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      props.getUser(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        title={"Customer Management"}
        paths={[
          {
            title: "Customer",
            page: `/user`,
          },
          {
            title: "View",
          },
        ]}
      />

      <Mui.Card className="default-card spacing-md pb-5">
        <Mui.Box className="mb-4" width="100%" display="flex" alignItems="center" flexWrap="wrap">
          <Mui.IconButton
            className="border-1 border-color-grey"
            type="button"
            component={Link}
            to={"/user"}
            size="small"
            style={{ padding: 6, marginRight: 15 }}
          >
            <Mui.Box width="1.2rem" className="svg-color-grey svg-size-flexible line-height-null">
              <IconChevronLeft />
            </Mui.Box>
          </Mui.IconButton>

          <Mui.Typography component="h5" variant="h5" className="mr-auto font-weight-medium">
            Personal Information
          </Mui.Typography>
        </Mui.Box>

        <Mui.Box
          display="flex"
          flexDirection={useMediaQuery(theme.breakpoints.down("xs")) ? "column" : "row"}
          // flexDirection={Mui.isWidthDown("xs", props.width) ? "column" : "row"}
        >
          <Mui.Avatar
            className={`img-size-xl ${useMediaQuery(theme.breakpoints.down("xs")) ? "mb-5" : "mr-5"}`}
            // className={`img-size-xl ${Mui.isWidthDown("xs", props.width) ? "mb-5" : "mr-5"}`}
            src={
              props.userData?.userPhoto?.[0]?.url ? props.userData?.userPhoto?.[0]?.url : "/static/images/avatar/1.jpg"
            }
            alt={props.userData?.firstName || ""}
          />

          <Mui.Box display="flex" flexWrap="wrap">
            <Mui.Typography
              component="h1"
              variant="h1"
              className={`mb-3 svg-color-primary font-weight-medium ${
                useMediaQuery(theme.breakpoints.down("xs")) ? "flex-direction-column" : ""
              }`}
              // className={`mb-3 svg-color-primary font-weight-medium ${
              //   Mui.isWidthDown("xs", props.width) ? "flex-direction-column" : ""
              // }`}
            >
              {props.userData?.firstName || ""} {props.userData?.lastName || ""}
            </Mui.Typography>

            <Mui.Typography
              component="h5"
              variant="h5"
              className="w-100 d-flex mb-2  svg-color-primary text-color-grey font-weight-normal"
            >
              <span className="flex-shrink-0 mr-2">
                <IconPin />
              </span>
              {props.userData?.address || ""}
            </Mui.Typography>

            <Mui.Box
              display="flex"
              flexDirection={useMediaQuery(theme.breakpoints.down("sm")) ? "column" : "row"}
              // flexDirection={Mui.isWidthDown("sm", props.width) ? "column" : "row"}
            >
              <Mui.Typography
                component="h5"
                variant="h5"
                className="d-flex mb-2  mr-5 svg-color-primary font-weight-normal"
              >
                <span className="flex-shrink-0 mr-2">
                  <IconMail />
                </span>
                {props.userData?.email || "-"}
              </Mui.Typography>

              <Mui.Typography
                component="h5"
                variant="h5"
                className="d-flex mb-2  mr-5 svg-color-primary font-weight-normal"
              >
                <span className="flex-shrink-0 mr-2">
                  <IconPhone />
                </span>
                +61 {props.userData?.phone || "-"}
              </Mui.Typography>
            </Mui.Box>
          </Mui.Box>
        </Mui.Box>
      </Mui.Card>
    </>
  );
};
const mapStateToProps = ({ user }) => {
  const { userData, loading, error } = user;
  return { userData, loading, error };
};
export default connect(mapStateToProps, { getUser })(ViewUser);
