import React, { useEffect } from "react";
import * as Mui from "@mui/material";
// import PowerSettingsNewSharpIcon from "@mui/icons-material/PowerSettingsNewSharp";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUser, editUser, getAllRole } from "reduxs/actions";
import { capitalizeFirstLetter } from "helpers";
import { InputField, InputGoogleField, SelectField } from "ui/form/field";
import { StyledCard, UserAvatarCard, StyledButton, AlertDialog } from "ui";

const GeneralTab = () => {
  // const theme = Mui.useTheme();
  const dispatch = useDispatch();

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const { user } = useSelector((state) => state.auth);
  const { loading, userData } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);

  const initialValues = {
    id: userData?.id || "",
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    role: userData?.role || "",
    media: userData?.media || [],
    route: "profile",
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
    if (!loading && values.id) dispatch(editUser(values.id, values));
  };

  useEffect(() => {
    if (user?.id) dispatch(getUser(user?.id));
    dispatch(getAllRole());
  }, []);

  return (
    <>
      <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <Mui.Grid container spacing={4}>
              <Mui.Grid item xs={12} xl={4}>
                <UserAvatarCard isedit={user?.id} media={values.media} setFieldValue={setFieldValue}>
                  {/* <Mui.Box display="flex" justifyContent="center" mt={4}>
                    <StyledButton
                      color={theme.palette.error.main}
                      onClick={() => {
                        setOpenDeleteAlert(true);
                      }}
                    >
                      <PowerSettingsNewSharpIcon />
                      Deactivate Account
                    </StyledButton>
                  </Mui.Box> */}
                </UserAvatarCard>
              </Mui.Grid>

              <Mui.Grid item xs={12} xl={8}>
                <StyledCard sx={{ p: "1.5rem" }}>
                  <Mui.Grid container spacing={2}>
                    <Mui.Grid item xs={12} md={6}>
                      <InputField name="name" type="text" label="Full Name*" />
                    </Mui.Grid>

                    {userData && userData.role !== "superadmin" && userData.role !== "client" && (
                      <Mui.Grid item xs={12} md={6}>
                        <SelectField
                          name="role"
                          type="text"
                          label="Role"
                          placeholder="Select Role"
                          options={
                            roles &&
                            roles.map((role) => {
                              return { id: role.name, name: capitalizeFirstLetter(role.name) };
                            })
                          }
                          disabled
                        />
                      </Mui.Grid>
                    )}

                    <Mui.Grid item xs={12} md={6}>
                      <InputField name="email" type="text" label="Email*" disabled />
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
                      Save Changes
                    </StyledButton>
                  </Mui.Box>
                </StyledCard>
              </Mui.Grid>
            </Mui.Grid>{" "}
          </Form>
        )}
      </Formik>

      <AlertDialog
        open={openDeleteAlert}
        handleCancel={() => {
          setOpenDeleteAlert(false);
        }}
        handleAction={() => {
          setOpenDeleteAlert(false);
        }}
        title="Deactivate"
        info={
          <>
            You cannot revert back this action. <br />
            Are you sure to deactivate your account?
          </>
        }
        loadingInfo="User is deleting..."
        actionLabel="Yes Deactivate"
      />
    </>
  );
};

export default GeneralTab;
