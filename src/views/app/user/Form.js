import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUser, addUser, editUser, getAllRole } from "reduxs/actions";
import { capitalizeFirstLetter } from "helpers";
import { StyledCard, UserAvatarCard, StyledButton } from "ui";
import { InputField, InputGoogleField, SelectField } from "ui/form/field";

const UserForm = (props) => {
  const { editId } = props;

  const theme = Mui.useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, userData } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);

  const initialValues = {
    name: editId ? userData?.name || "" : "",
    email: editId ? userData?.email || "" : "",
    phone: editId ? userData?.phone || "" : "",
    address: editId ? userData?.address || "" : "",
    role: editId ? userData?.role || "admin" : "admin",
    media: editId ? userData?.media || [] : [],
    route: "user",
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Please provide full name")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Contact No is required")
      .min(8, "Atleast 8 digits")
      .max(10, "Cannot exceed 10 digits"),
    address: Yup.string().required("Enter a valid address"),
  });

  const onSubmit = (values) => {
    if (!loading) {
      if (editId) {
        dispatch(editUser(editId, values, navigate));
      } else {
        dispatch(addUser(values, navigate));
      }
    }
  };

  useEffect(() => {
    if (editId) dispatch(getUser(editId));
    dispatch(getAllRole());
  }, []);

  return (
    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ values, resetForm, setFieldValue }) => (
        <Form>
          <Mui.Grid container spacing={4}>
            <Mui.Grid item xs={12} xl={4}>
              <UserAvatarCard isedit={editId} media={values.media} setFieldValue={setFieldValue}>
                {editId && userData && (
                  <Mui.Box
                    component="header"
                    display="flex"
                    justifyContent="flex-end"
                    position="absolute"
                    top="1.5rem"
                    right="1.5rem"
                  >
                    <Mui.Chip
                      label={userData?.statusConfigChoice?.displayName || ""}
                      color={userData?.statusConfigChoice?.configChoice === "active" ? "primary" : "warning"}
                      sx={{ height: "1.5rem", borderRadius: 1.5 }}
                    />
                  </Mui.Box>
                )}

                <Mui.Box display="flex" justifyContent="space-between" alignItems="center" mt={5}>
                  <Mui.Typography component="h6" variant="body1" fontWeight="600">
                    User Role
                  </Mui.Typography>
                </Mui.Box>

                <SelectField
                  name="role"
                  type="text"
                  placeholder="Select Role"
                  options={
                    roles &&
                    roles
                      ?.filter((role) => role.name !== "client")
                      .map((role) => {
                        return { id: role.name, name: capitalizeFirstLetter(role.name) };
                      })
                  }
                />
              </UserAvatarCard>
            </Mui.Grid>

            <Mui.Grid item xs={12} xl={8}>
              <StyledCard sx={{ p: "1.5rem" }}>
                <Mui.Grid container spacing={2}>
                  <Mui.Grid item xs={12} md={6}>
                    <InputField name="name" type="text" label="Full Name*" />
                  </Mui.Grid>

                  <Mui.Grid item xs={12} md={6}>
                    <InputField name="email" type="text" label="Email*" />
                  </Mui.Grid>

                  <Mui.Grid item xs={12} md={6}>
                    <InputField
                      name="phone"
                      type="number"
                      label="Contact*"
                      InputProps={{
                        startAdornment: <Mui.InputAdornment position="start">+61</Mui.InputAdornment>,
                      }}
                    />
                  </Mui.Grid>

                  <Mui.Grid item xs={12} md={6}>
                    <InputGoogleField name="address" label="Address*" placeholder="Enter a Location" />
                  </Mui.Grid>
                </Mui.Grid>

                <Mui.Box
                  width="100%"
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  justifyContent={{ sm: "flex-end" }}
                  gap={2}
                  mt={5}
                >
                  <StyledButton type="submit" isloading={loading}>
                    {editId ? "Update User" : "Create User"}
                  </StyledButton>

                  <StyledButton
                    type="button"
                    variant="outlined"
                    color={theme.palette.grey.main}
                    sx={{ color: theme.palette.text.primary }}
                    component={Link}
                    to={"/user-management/user"}
                  >
                    Cancel
                  </StyledButton>

                  <StyledButton
                    type="button"
                    variant="text"
                    color={theme.palette.grey.main}
                    sx={{ color: theme.palette.text.primary }}
                    onClick={resetForm}
                  >
                    Reset
                  </StyledButton>
                </Mui.Box>
              </StyledCard>
            </Mui.Grid>
          </Mui.Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
