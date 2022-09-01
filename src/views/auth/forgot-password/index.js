import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Mui from "@mui/material";
import { connect } from "react-redux";
import { forgotPassword, resetAuth } from "src/reduxs/actions";
import { Formik, Form } from "formik";
import { InputField } from "src/components/form";
import * as Yup from "yup";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.validationSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
    });
    this.props.resetAuth();
  }

  onForgotPassword = (values) => {
    if (!this.props.loading) {
      this.props.forgotPassword(values);
    }
  };

  render() {
    return (
      <Mui.Container className="h-100 d-flex pr-0" maxWidth={false}>
        <Mui.Card className="auth-card">
          <Mui.Grid container spacing={4} className="h-100">
            <Mui.Grid item xs={12} md={6} lg={4}>
              <Mui.Typography className="auth-card__head" variant="h1" component="h1">
                Forgot <br /> Password <br />
                <span className="text-color-primary">NOT TO WORRY</span>
              </Mui.Typography>
            </Mui.Grid>

            <Mui.Grid item xs={12} md={6} lg={5} className="d-flex flex-direction-column">
              <Mui.Typography component="h3" variant="h3" className="mb-4 font-weight-normal text-color-white">
                Send Reset Password Link
              </Mui.Typography>

              {this.props.error ? (
                <Mui.Typography className="text-color-danger mb-3" variant="body1" component="p">
                  {this.props.error}
                </Mui.Typography>
              ) : null}

              {!this.props.loading && this.props.success ? (
                <Mui.Typography className="text-color-primary mb-3" variant="p" component="body1">
                  {this.props.message}
                </Mui.Typography>
              ) : null}

              <Formik
                initialValues={{ email: "" }}
                validationSchema={this.validationSchema}
                onSubmit={this.onForgotPassword}
              >
                {(props) => (
                  <Form className="default-form center">
                    <Mui.Grid container spacing={3}>
                      <Mui.Grid className="form-group-dark" item xs={12}>
                        <InputField name="email" type="text" label="Email" />
                      </Mui.Grid>
                    </Mui.Grid>
                    <Mui.Box width="100%" display="flex" justifyContent="space-between" className="mt-3">
                      <Mui.Button
                        className="btn-default flex-shrink-0"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disableElevation
                        disabled={this.props.loading}
                      >
                        Reset
                        {this.props.loading && <Mui.CircularProgress color="secondary" size={24} />}
                      </Mui.Button>

                      <Mui.Typography
                        component="p"
                        variant="body1"
                        className="font-weight-light text-color-white text-right"
                      >
                        Already have a password? Please use the{" "}
                        <Link to={`/auth/login`} className="text-color-primary">
                          login form
                        </Link>
                      </Mui.Typography>
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
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { success, message, loading, error } = auth;
  return { success, message, loading, error };
};

export default connect(mapStateToProps, {
  forgotPassword,
  resetAuth,
})(ForgotPassword);
