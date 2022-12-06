import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { login, resetAuth } from "reduxs/actions";
import { InputField, InputPasswordField } from "ui/form/field";
import { StyledButton } from "ui";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = Mui.useTheme();

  const { loading } = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onLogin = (values) => {
    if (!loading) {
      dispatch(login(values, navigate));
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
              <Form className="xl:ml-20 xl:w-3/12 lg:w-5/12 md:w-8/12">
                <Mui.Typography component="h1" fontSize="1.5rem" fontWeight="600">
                  Sign in to Sierra
                </Mui.Typography>
                <Mui.Typography sx={{ mb: 5, "& a": { color: theme.palette.primary.main } }}>
                  New user? <Link to={`/auth/register`}>Create and account</Link>.
                </Mui.Typography>

                <InputField name="email" type="text" label="Email" />

                <InputPasswordField name="password" label="Password" />

                <Mui.Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Mui.FormControlLabel
                    control={
                      <Mui.Checkbox
                        color="primary"
                        checked={values.remember === 1}
                        onChange={(event) => setFieldValue("remember", event.target.checked ? 1 : 0)}
                      />
                    }
                    label="Remember Me"
                  />

                  <Link to={`/auth/forgot-password`} className="text-gray-800">
                    Forgot password
                  </Link>
                </Mui.Box>

                <StyledButton type="submit" color="#212b36" isloading={loading}>
                  Sign In
                </StyledButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Mui.Container>
  );
};

export default Login;
