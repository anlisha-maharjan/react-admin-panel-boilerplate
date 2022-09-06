import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as Mui from "@mui/material";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { register, resetAuth } from "src/reduxs/actions";
import { InputField, InputPasswordField, InputHiddenField, InputGoogleField } from "src/components/form";

const Register = (props) => {
  useEffect(() => {
    props.resetAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required("Please provide your first name")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    lastName: Yup.string()
      .required("Please provide your last name")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Contact No is required")
      .min(8, "Atleast 8 digits")
      .max(10, "Cannot exceed 10 digits"),
    address: Yup.string().required("Enter a valid address"),
    recaptchaToken: Yup.string().required("Captcha required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password should be at least 8 digits including 1 number, 1 uppercase, 1 lowercase and 1 special character"
      ),
    password_confirmation: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passsword and Confirm Password didn't match"),
  });

  const onRegister = (values) => {
    if (!props.loading) {
      props.register(values);
    }
  };

  return (
    <Mui.Container className="h-100 d-flex pr-0" maxWidth={false}>
      <Mui.Card className="auth-card">
        <Mui.Grid container spacing={4} className="h-100">
          <Mui.Grid item xs={12} md={6} lg={4}>
            <Mui.Typography className="auth-card__head" variant="h1" component="h1">
              Welcome <br /> To <br /> <span className="text-color-primary">SHANGRI-LA CHAUFFEURS</span>
            </Mui.Typography>
          </Mui.Grid>

          <Mui.Grid item xs={12} md={6} lg={5} className="d-flex flex-direction-column">
            {!props.loading && props.success ? (
              <>
                <Mui.Typography className="text-center auth-card__head" variant="h2" component="h2">
                  🥳 Welcome aboard.
                  <Mui.Typography
                    component="span"
                    variant="h5"
                    className="d-block mt-2 font-weight-normal text-color-grey"
                  >
                    You're almost there. Please check your email, we just sent you a verficaiton mail with a link to
                    confirm your account.
                  </Mui.Typography>
                </Mui.Typography>
              </>
            ) : (
              <>
                <Mui.Typography component="h3" variant="h3" className="mb-4 font-weight-normal text-color-white">
                  Register your account
                </Mui.Typography>

                {props.error ? (
                  <Mui.Typography className="text-color-danger mb-3" variant="body1" component="p">
                    {props.error}
                  </Mui.Typography>
                ) : null}

                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    address: "",
                    password: "",
                    password_confirmation: "",
                    roleId: "2",
                    recaptchaToken: "",
                  }}
                  validationSchema={schema}
                  onSubmit={onRegister}
                >
                  {(props) => (
                    <Form className="default-form center">
                      <Mui.Grid container spacing={3}>
                        <InputHiddenField name="role_id" />
                        <Mui.Grid className="form-group-dark" item xs={6}>
                          <InputField name="firstName" type="text" label="First Name*" />
                        </Mui.Grid>
                        <Mui.Grid className="form-group-dark" item xs={6}>
                          <InputField name="lastName" type="text" label="Last Name*" />
                        </Mui.Grid>

                        <Mui.Grid className="form-group-dark mb-2" item xs={12}>
                          <InputField name="email" type="text" label="Email*" />
                        </Mui.Grid>
                        <Mui.Grid className="form-group-dark" item xs={6}>
                          <InputField
                            name="phone"
                            type="number"
                            label="Contact*"
                            InputProps={{
                              startAdornment: <Mui.InputAdornment position="start">+61</Mui.InputAdornment>,
                            }}
                          />
                        </Mui.Grid>
                        <Mui.Grid className="form-group-dark" item xs={6}>
                          <InputGoogleField name="address" label="Address*" placeholder="Enter a Location" />
                        </Mui.Grid>
                        <Mui.Grid className="form-group-dark mb-2" item xs={12}>
                          <InputPasswordField name="password" label="Password*" />
                        </Mui.Grid>
                        <Mui.Grid className="form-group-dark mb-2" item xs={12}>
                          <InputPasswordField name="password_confirmation" label="Confirm Password*" />
                        </Mui.Grid>
                      </Mui.Grid>

                      <Mui.Box width="100%" display="flex" justifyContent="space-between" className="mt-3">
                        <Mui.Button
                          className="btn-default flex-shrink-0"
                          type="submit"
                          variant="contained"
                          color="primary"
                          disableElevation
                          disabled={props.loading}
                        >
                          Sign Up
                          {props.loading && <Mui.CircularProgress color="secondary" size={24} />}
                        </Mui.Button>

                        <Mui.Typography
                          component="p"
                          variant="body1"
                          className="font-weight-light text-color-white text-right"
                        >
                          Already a member? Please use the{" "}
                          <Link to={`/auth/login`} className="text-color-primary">
                            login form
                          </Link>
                        </Mui.Typography>
                      </Mui.Box>
                    </Form>
                  )}
                </Formik>
              </>
            )}

            <Mui.Typography component="p" variant="body1" className="pt-2 mt-auto text-center copy">
              Copyright © 2021 @ SHANGRI-LA CHAUFFEURS. All Rights Reserved.
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Card>
    </Mui.Container>
  );
};

const mapStateToProps = ({ auth }) => {
  const { success, message, loading, error } = auth;
  return { success, message, loading, error };
};

export default connect(mapStateToProps, {
  register,
  resetAuth,
})(Register);
