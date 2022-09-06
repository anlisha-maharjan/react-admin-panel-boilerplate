import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Breadcrumb from "src/components/breadcrumb";
import { getUser, addUser, editUser } from "src/reduxs/actions";
import { InputField, InputHiddenField, InputGoogleField } from "src/components/form";

const EditUser = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const isWidthDownXs = useMediaQuery(theme.breakpoints.down("xs"));

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required("Please provide first name")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    lastName: Yup.string()
      .required("Please provide last name")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Contact No is required")
      .min(8, "Atleast 8 digits")
      .max(10, "Cannot exceed 10 digits"),
    address: Yup.string().required("Enter a valid address"),
  });

  useEffect(() => {
    if (params.id) {
      props.getUser(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    if (!props.loading) {
      if (params.id) {
        props.editUser(params.id, values, navigate);
      } else {
        props.addUser(values, navigate);
      }
    }
  };

  return (
    <>
      <Breadcrumb
        title={"User Management"}
        paths={[
          {
            title: "User",
            page: `/user`,
          },
          {
            title: params.id ? "Edit" : "Add",
          },
        ]}
      />

      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: params.id ? props.userData?.firstName || "" : "",
          lastName: params.id ? props.userData?.lastName || "" : "",
          email: params.id ? props.userData?.email || "" : "",
          phone: params.id ? props.userData?.phone || "" : "",
          address: params.id ? props.userData?.address || "" : "",
          role_id: "2",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ values, resetForm }) => (
          <Form className="default-form">
            <Mui.Card className="default-card">
              <Mui.Typography component="h4" variant="h4" className="mb-4 font-weight-medium">
                User Information
              </Mui.Typography>

              <Mui.Grid container spacing={2}>
                <InputHiddenField name="role_id" />

                <Mui.Grid item xs={12} md={6} lg={4} className="form-group">
                  <InputField name="firstName" type="text" label="First Name" />
                </Mui.Grid>

                <Mui.Grid item xs={12} md={6} lg={4} className="form-group">
                  <InputField name="lastName" type="text" label="Last Name" />
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6} lg={4} className="form-group">
                  <InputField name="email" type="text" label="Email" />
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6} lg={4} className="form-group">
                  <InputField
                    name="phone"
                    type="number"
                    label="Contact"
                    InputProps={{
                      startAdornment: <Mui.InputAdornment position="start">+61</Mui.InputAdornment>,
                    }}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6} lg={4} className="form-group">
                  <InputGoogleField name="address" label="Address*" placeholder="Enter a Location" />
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Card>

            <Mui.Box
              width="100%"
              display="flex"
              flexDirection={isWidthDownXs ? "column" : "row"}
              // flexDirection={Mui.isWidthDown("xs", props.width) ? "column" : "row"}
              className="mt-5"
            >
              <Mui.Button
                className={`btn-default ${isWidthDownXs ? "mb-3" : "mr-3"}`}
                // className={`btn-default ${Mui.isWidthDown("xs", props.width) ? "mb-3" : "mr-3"}`}
                type="submit"
                color="primary"
                variant="contained"
                disableElevation
              >
                Save
                {props.loading && <Mui.CircularProgress color="secondary" size={24} />}
              </Mui.Button>
              <Mui.Button
                className={`btn-default ${isWidthDownXs ? "mb-3" : "mr-3"}`}
                // className={`btn-default ${Mui.isWidthDown("xs", props.width) ? "mb-3" : "mr-3"}`}
                color="primary"
                type="button"
                variant="outlined"
                disableElevation
                component={Link}
                to={"/user"}
              >
                Back
              </Mui.Button>
              <Mui.Button
                className="font-weight-normal"
                type="button"
                variant="text"
                disableElevation
                onClick={resetForm}
              >
                Reset
              </Mui.Button>
            </Mui.Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
const mapStateToProps = ({ user }) => {
  const { userData, success, message, loading, error } = user;
  return {
    userData,
    success,
    message,
    loading,
    error,
  };
};
export default connect(mapStateToProps, {
  getUser,
  addUser,
  editUser,
})(EditUser);
