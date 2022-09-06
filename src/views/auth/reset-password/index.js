import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { verifyResetToken, resetPassword, resetAuth } from "src/reduxs/actions";
import { InputField, InputHiddenField, InputPasswordField } from "src/components/form";
import { LayoutSplashScreen } from "src/configs/splash-screen";

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
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

  useEffect(() => {
    props.resetAuth();
    props.verifyResetToken(params.token, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResetPassword = (values) => {
    if (!props.loading) {
      props.resetPassword(values, navigate);
    }
  };

  return (
    <>
      {props.loading1 ? (
        <LayoutSplashScreen />
      ) : (
        <Mui.Container className="h-100 d-flex pr-0" maxWidth={false}>
          <Mui.Card className="auth-card">
            <Mui.Grid container spacing={4} className="h-100">
              <Mui.Grid item xs={12} md={6} lg={4}>
                <Mui.Typography className="auth-card__head" variant="h1" component="h1">
                  Please reset <br />{" "}
                  <span className="text-color-primary">
                    YOUR <br /> PASSWORD
                  </span>
                </Mui.Typography>
              </Mui.Grid>

              <Mui.Grid item xs={12} md={6} lg={5} className="d-flex flex-direction-column">
                <Mui.Typography component="h3" variant="h3" className="mb-4 font-weight-normal text-color-white">
                  Enter new password
                </Mui.Typography>

                {props.error ? (
                  <Mui.Typography className="text-color-danger mb-3" variant="body1" component="p">
                    {props.error}
                  </Mui.Typography>
                ) : null}

                <Formik
                  initialValues={{
                    token: params.token,
                    email: "",
                    password: "",
                    password_confirmation: "",
                  }}
                  validationSchema={schema}
                  onSubmit={onResetPassword}
                >
                  {({ values }) => (
                    <Form className="default-form center">
                      <Mui.Grid container spacing={3}>
                        <InputHiddenField name="token" />
                        <Mui.Grid className="form-group-dark" item xs={12}>
                          <InputField name="email" type="text" label="Email" />
                        </Mui.Grid>

                        <Mui.Grid className="form-group-dark mb-2" item xs={12}>
                          <InputPasswordField name="password" label="Password" />
                        </Mui.Grid>
                        <Mui.Grid className="form-group-dark mb-2" item xs={12}>
                          <InputPasswordField name="password_confirmation" label="Confirm Password" />
                        </Mui.Grid>
                      </Mui.Grid>

                      <Mui.Box width="100%" display="flex" justifyContent="space-between">
                        <Mui.Button
                          className="btn-default flex-shrink-0"
                          type="submit"
                          variant="contained"
                          color="primary"
                          disableElevation
                          disabled={props.loading}
                        >
                          Reset
                          {props.loading && <Mui.CircularProgress color="secondary" size={24} />}
                        </Mui.Button>
                      </Mui.Box>
                    </Form>
                  )}
                </Formik>
                <Mui.Typography component="p" variant="body1" className="mt-auto text-center copy">
                  Copyright © 2021 @ SIERRA. All Rights Reserved.
                </Mui.Typography>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Card>
        </Mui.Container>
      )}
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading1, loading, error } = auth;
  return { loading1, loading, error };
};
export default connect(mapStateToProps, {
  verifyResetToken,
  resetPassword,
  resetAuth,
})(ResetPassword);
