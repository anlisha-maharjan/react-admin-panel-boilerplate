import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { initialChangePassword, resetAuth } from "reduxs/actions";
import { InputHiddenField, InputPasswordField } from "ui/form/field";
import { StyledButton } from "ui";

const InitialChangePassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password should be at least 8 digits including 1 number, 1 uppercase, 1 lowercase and 1 special character"
      ),
    passwordConfirmation: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passsword and Confirm Password didn't match"),
  });

  useEffect(() => {
    dispatch(resetAuth());
  }, []);

  const onResetPassword = (values) => {
    if (!loading) {
      dispatch(initialChangePassword(values, navigate));
    }
  };

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
            initialValues={{
              userId: params?.id || "",
              verificationCode: params?.token || "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={schema}
            onSubmit={onResetPassword}
          >
            {({ values }) => (
              <Form className="xl:ml-20 xl:w-3/12 lg:w-5/12 md:w-8/12">
                <Mui.Typography component="h1" fontSize="1.5rem" fontWeight="600">
                  Initial Change Password
                </Mui.Typography>
                <Mui.Typography sx={{ mb: 5 }}>
                  Please set new password to access the account further.
                </Mui.Typography>

                <InputHiddenField name="userId" />
                <InputHiddenField name="verificationCode" />
                <InputPasswordField name="password" label="Password" />
                <InputPasswordField name="passwordConfirmation" label="Confirm Password" />
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

export default InitialChangePassword;
