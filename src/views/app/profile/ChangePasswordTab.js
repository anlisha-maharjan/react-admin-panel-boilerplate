import React, { useEffect, useRef } from "react";
import * as Mui from "@mui/material";
import GppGoodSharpIcon from "@mui/icons-material/GppGoodSharp";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetAuth } from "reduxs/actions";
import { InputPasswordField } from "ui/form/field";
import { StyledCard, StyledButton } from "ui";

const passwordRequirements = [
  "Password should be at least 8 digits.",
  "Should include at least 1 number.",
  "Should include at least  1 uppercase.",
  "Should include at least 1 lowercase.",
  "Should include at least 1 special character.",
];

const ChangePasswordTab = () => {
  const theme = Mui.useTheme();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    password: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password should be at least 8 digits including 1 number, 1 uppercase, 1 lowercase and 1 special character"
      ),
    passwordConfirmation: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passsword and Confirm Password didn't match"),
  });

  const onChangePassword = (values) => {
    if (!loading) dispatch(changePassword(values));
  };

  useEffect(() => {
    if (success) {
      formikRef.current?.resetForm();
      dispatch(resetAuth());
    }
  }, [success]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ oldPassword: "", password: "", passwordConfirmation: "" }}
      validationSchema={schema}
      onSubmit={onChangePassword}
      innerRef={formikRef}
    >
      {({ values }) => (
        <Form>
          <Mui.Grid container spacing={6}>
            <Mui.Grid item xs={12} md={6}>
              <StyledCard sx={{ p: "1.5rem" }}>
                <Mui.Box display="flex" flexDirection="column" gap={2}>
                  <InputPasswordField name="oldPassword" label="Old Password" />

                  <InputPasswordField name="password" label="New Password" />

                  <InputPasswordField name="passwordConfirmation" label="Confirm Password" />
                </Mui.Box>

                <Mui.Box
                  width="100%"
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  justifyContent={{ sm: "flex-end" }}
                  gap={2}
                  mt={5}
                >
                  <StyledButton type="submit" isloading={loading}>
                    Save Changes
                  </StyledButton>
                </Mui.Box>
              </StyledCard>
            </Mui.Grid>

            <Mui.Grid item xs={12} md={5}>
              <Mui.Typography component="h4" mb={2} fontSize="1.3rem" fontWeight="700">
                Password Requirements
              </Mui.Typography>

              <Mui.List dense>
                {passwordRequirements.map((item, i) => {
                  return (
                    <Mui.ListItem key={i} sx={{ p: 0, mb: 1 }}>
                      <Mui.ListItemIcon
                        sx={{
                          minWidth: "initial",
                          marginRight: "1rem",
                          color: theme.palette.primary.dark,
                          "& svg": { width: "1.25rem", height: "1.25rem" },
                        }}
                      >
                        <GppGoodSharpIcon />
                      </Mui.ListItemIcon>
                      <Mui.ListItemText primary={item} sx={{ "& .MuiTypography-root": { fontSize: "1rem" } }} />
                    </Mui.ListItem>
                  );
                })}
              </Mui.List>
            </Mui.Grid>
          </Mui.Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordTab;
