import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, resetAuth } from "src/reduxs/actions";
import { InputField, InputPasswordField } from "src/components/form";

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const responseMsg = location?.state?.responseMsg || "";

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    props.resetAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogin = (values) => {
    if (!props.loading) {
      props.login(values, navigate);
    }
  };

  return (
    <Mui.Container className="h-100 d-flex pr-0" maxWidth={false}>
      <Mui.Card className="auth-card">
        <Mui.Grid container spacing={4} className="h-100">
          <Mui.Grid item xs={12} md={6} lg={4}>
            <Mui.Typography className="auth-card__head" variant="h1" component="h1">
              Welcome <br /> To <br /> <span className="text-color-primary">SIERRA</span>
            </Mui.Typography>
          </Mui.Grid>

          <Mui.Grid item xs={12} md={6} lg={5} className="d-flex flex-direction-column">
            <Mui.Typography component="h3" variant="h3" className="mb-4 font-weight-normal text-color-white">
              Login to your account
            </Mui.Typography>

            {props.error ? (
              <Mui.Typography className="text-color-danger mb-3" variant="body1" component="p">
                {props.error}
              </Mui.Typography>
            ) : null}

            {/* Success/error message while navigation */}
            {responseMsg && !props.error ? (
              <Mui.Typography className="d-block mt-2 text-center text-color-primary" component="span" variant="body2">
                {responseMsg}
              </Mui.Typography>
            ) : null}

            <Formik
              initialValues={{
                email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
                password: localStorage.getItem("password") ? localStorage.getItem("password") : "",
                remember: localStorage.getItem("remember") ? parseInt(localStorage.getItem("remember")) : 0,
              }}
              validationSchema={schema}
              onSubmit={onLogin}
            >
              {({ values, setFieldValue }) => (
                <Form className="default-form center">
                  <Mui.Grid container spacing={3}>
                    <Mui.Grid className="form-group-dark" item xs={12}>
                      <InputField name="email" type="text" label="Email" />
                    </Mui.Grid>

                    <Mui.Grid className="form-group-dark mb-2" item xs={12}>
                      <InputPasswordField name="password" label="Password" />
                    </Mui.Grid>
                  </Mui.Grid>

                  <Mui.Box width="100%" className="mb-3">
                    <Mui.FormControlLabel
                      className="default-checkbox-dark"
                      control={
                        <Mui.Checkbox
                          color="primary"
                          checked={values.remember === 1}
                          onChange={(event) => setFieldValue("remember", event.target.checked ? 1 : 0)}
                        />
                      }
                      label="Remember Me"
                    />
                  </Mui.Box>

                  <Mui.Box width="100%" display="flex" justifyContent="space-between">
                    <Mui.Button
                      className="btn-default flex-shrink-0"
                      type="submit"
                      variant="contained"
                      color="primary"
                      disableElevation
                      disabled={props.loading}
                    >
                      Sign In
                      {props.loading && <Mui.CircularProgress color="secondary" size={24} />}
                    </Mui.Button>

                    <Mui.Typography
                      component="p"
                      variant="body1"
                      className="font-weight-light text-color-white text-right"
                    >
                      Did you forgot password? Please use the{" "}
                      <Link to={`/auth/forgot-password`} className="text-color-primary">
                        reset form
                      </Link>
                    </Mui.Typography>
                  </Mui.Box>
                </Form>
              )}
            </Formik>

            <Mui.Typography
              component="p"
              variant="body1"
              className="mt-5 pt-2 font-weight-light text-color-white text-center"
            >
              Don't have account yet? Please use the <br />
              <Link to={`/auth/register`} className="text-color-primary">
                register form
              </Link>
              .
            </Mui.Typography>

            <Mui.Typography component="p" variant="body1" className="mt-auto text-center copy">
              Copyright © 2021 @ SIERRA. All Rights Reserved.
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Card>
    </Mui.Container>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, error } = auth;
  return { loading, error };
};

export default connect(mapStateToProps, {
  login,
  resetAuth,
})(Login);
