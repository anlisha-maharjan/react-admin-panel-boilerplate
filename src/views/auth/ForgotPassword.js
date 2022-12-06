import React, { useEffect, useRef } from "react";
import * as Mui from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuth } from "reduxs/actions";
import { InputField } from "ui/form/field";
import { StyledButton } from "ui";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const theme = Mui.useTheme();

  const { loading, success } = useSelector((state) => state.auth);
  const formikRef = useRef();

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  useEffect(() => {
    resetAuth();
  }, []);

  const onForgotPassword = (values) => {
    if (!loading) {
      dispatch(forgotPassword(values));
    }
  };

  useEffect(() => {
    if (success) {
      formikRef.current?.resetForm();
      resetAuth();
    }
  }, [success]);

  return (
    <Mui.Container className="h-screen" maxWidth={false}>
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={schema}
            onSubmit={onForgotPassword}
            innerRef={formikRef}
          >
            {({ values }) => (
              <Form className="xl:ml-20 xl:w-3/12 lg:w-5/12 md:w-8/12">
                <Mui.Typography component="h1" fontSize="1.5rem" fontWeight="600">
                  Forgot Password
                </Mui.Typography>
                <Mui.Typography sx={{ mb: 5, "& a": { color: theme.palette.primary.main } }}>
                  Already have a password? Please use the{" "}
                  <Link to={`/auth/login`} className="text-color-primary">
                    login form
                  </Link>
                </Mui.Typography>

                <InputField name="email" type="text" label="Email" />

                <StyledButton type="submit" color="#212b36" isloading={loading}>
                  Reset
                </StyledButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Mui.Container>
  );
};

export default ForgotPassword;
