import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetAuth, register } from "reduxs/actions";
import { InputField, InputHiddenField, InputGoogleField, InputPasswordField } from "ui/form/field";
import { StyledButton } from "ui";

const Register = () => {
  const dispatch = useDispatch();
  const theme = Mui.useTheme();

  const { loading, success } = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Please provide your full name")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Contact No is required")
      .min(8, "Atleast 8 digits")
      .max(10, "Cannot exceed 10 digits"),
    address: Yup.string().required("Enter a valid address"),
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

  const onRegister = (values) => {
    if (!loading) {
      dispatch(register(values));
    }
  };

  useEffect(() => {
    dispatch(resetAuth());
  }, []);

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

          <Mui.Box className="xl:ml-20 xl:w-3/12 lg:w-5/12 md:w-8/12">
            {!loading && success ? (
              <Mui.Typography component="h1" fontSize="1.5rem" fontWeight="600">
                🥳 Welcome aboard.
                <Mui.Typography component="span" display="block">
                  You&apos;re almost there. Please check your email, we just sent you a verficaiton mail with a link to
                  confirm your account.
                </Mui.Typography>
              </Mui.Typography>
            ) : (
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                  password: "",
                  passwordConfirmation: "",
                  role: "client",
                }}
                validationSchema={schema}
                onSubmit={onRegister}
              >
                {({ values }) => (
                  <Form>
                    <Mui.Typography component="h1" fontSize="1.5rem" fontWeight="600">
                      Register
                    </Mui.Typography>
                    <Mui.Typography sx={{ mb: 5, "& a": { color: theme.palette.primary.main } }}>
                      Already have a password? Please use the{" "}
                      <Link to={`/auth/login`} className="text-color-primary">
                        login form
                      </Link>
                    </Mui.Typography>

                    <InputHiddenField name="role_id" />
                    <InputField name="name" type="text" label="Full Name*" />
                    <InputField name="email" type="text" label="Email*" />
                    <InputField
                      name="phone"
                      type="number"
                      label="Contact*"
                      InputProps={{
                        startAdornment: <Mui.InputAdornment position="start">+61</Mui.InputAdornment>,
                      }}
                    />
                    <InputGoogleField name="address" label="Address*" placeholder="Enter a Location" />
                    <InputPasswordField name="password" label="Password*" />
                    <InputPasswordField name="passwordConfirmation" label="Confirm Password*" />
                    <StyledButton type="submit" color="#212b36" isloading={loading}>
                      Sign Up
                    </StyledButton>
                  </Form>
                )}
              </Formik>
            )}
          </Mui.Box>
        </div>
      </div>
    </Mui.Container>
  );
};

export default Register;
