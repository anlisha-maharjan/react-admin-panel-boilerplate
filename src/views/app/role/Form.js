import React, { useEffect, useRef } from "react";
import * as Mui from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getRole, addRole, editRole, getModule, getSingleConfigChoice } from "reduxs/actions";
import { InputField, TextareaField } from "ui/form/field";
import { StyledButton, StyledCard, StyledSwitch, StyledCheckbox } from "ui";

const RoleItem = Mui.styled(Mui.ListItem)(({ theme }) => ({
  justifyContent: "space-between",
  padding: ".1563rem 0",
  "& .MuiListItemSecondaryAction-root": {
    position: "static",
    transform: "translate(0)",
  },
}));

const RoleForm = (props) => {
  const { editId } = props;
  const formikRef = useRef();

  const theme = Mui.useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, roleData } = useSelector((state) => state.role);
  const { singleChoiceList, moduleList } = useSelector((state) => state.shared);

  const initialValues = {
    name: editId ? roleData?.name || "" : "",
    status: editId ? roleData?.status || "" : singleChoiceList?.find((val) => val.configChoice === "active")?.id || "",
    description: editId ? roleData?.description || "" : "",
    guardName: "web",
    rolePermission: editId
      ? roleData?.permissions?.map((el) => {
          return el.name;
        }) || []
      : [],
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Enter role name"),
    status: Yup.string().required("Select role status"),
    description: Yup.string().required("Enter role description"),
  });

  const onSubmit = (values) => {
    if (!loading) {
      if (editId) {
        dispatch(editRole(editId, values, navigate));
      } else {
        dispatch(addRole(values, navigate));
      }
    }
  };

  useEffect(() => {
    if (editId) dispatch(getRole(editId));
  }, []);

  useEffect(() => {
    dispatch(getSingleConfigChoice("roleStatus"));
    dispatch(getModule());
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={schema}
      innerRef={formikRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form>
          <StyledCard sx={{ p: "1.5rem" }}>
            <Mui.Grid container spacing={2}>
              <Mui.Grid item xs={12} md={6}>
                <InputField name="name" type="text" label="Name*" />
              </Mui.Grid>

              <Mui.Grid item xs={12} md={6}>
                <Mui.Typography component="label" display="block">
                  Status
                </Mui.Typography>
                <StyledSwitch
                  value={values.status}
                  checked={values.status === singleChoiceList?.find((val) => val.configChoice === "active")?.id}
                  onChange={(e) => {
                    setFieldValue(
                      "status",
                      e.target.checked
                        ? singleChoiceList?.find((val) => val.configChoice === "active")?.id
                        : singleChoiceList?.find((val) => val.configChoice === "inactive")?.id
                    );
                  }}
                  name="status"
                  label={
                    singleChoiceList && values.status
                      ? values.status === singleChoiceList?.find((val) => val.configChoice === "active")?.id
                        ? "Active"
                        : "Inactive"
                      : ""
                  }
                />
              </Mui.Grid>

              <Mui.Grid item xs={12} md={6}>
                <TextareaField name="description" label="Description*" />
              </Mui.Grid>
            </Mui.Grid>

            <Mui.Typography
              component="h4"
              mt={5}
              mb={3}
              color={theme.palette.body.dark}
              fontSize="1.2rem"
              fontWeight="500"
            >
              Permissions
              <Mui.Typography component="small" display="block" color="#777">
                Find all the associated permissions and assign suitable permissions.
              </Mui.Typography>
            </Mui.Typography>

            <Mui.Grid container spacing={2}>
              {moduleList?.map((item, i) => {
                return (
                  <Mui.Grid key={i} item xs={12} lg={4}>
                    <Mui.Paper elevation={0} sx={{ height: "100%", p: "1rem", border: "1px solid #eee" }}>
                      <Mui.Box display="flex" alignItems="center" mb=".9375rem">
                        <Mui.Typography component="h5" fontSize="1.1rem" fontWeight="500">
                          {item.module}
                          <Mui.Divider sx={{ width: "50px", borderColor: theme.palette.primary.main }} />
                        </Mui.Typography>

                        <StyledCheckbox
                          name={item.module}
                          checked={
                            item?.action?.length ===
                            item?.action?.filter((v) => values?.rolePermission?.includes(v))?.length
                          }
                          onChange={(event) => {
                            const rolePermission = [...values.rolePermission];
                            const action = item?.action?.map((el) => {
                              return el;
                            });
                            action.forEach((el) => {
                              if (event.target.checked) {
                                if (!rolePermission.includes(el)) {
                                  rolePermission.push(el);
                                }
                              } else {
                                if (rolePermission.includes(el)) {
                                  const index = rolePermission.indexOf(el);
                                  rolePermission.splice(index, 1);
                                }
                              }
                            });
                            setFieldValue("rolePermission", rolePermission);
                          }}
                        />
                      </Mui.Box>

                      <Mui.List dense sx={{ p: 0 }}>
                        {item?.action?.map((el, k) => {
                          return (
                            <RoleItem
                              key={k}
                              secondaryAction={
                                <Mui.Box width="7.1875rem">
                                  <StyledCheckbox
                                    name={`${el}`}
                                    checked={values?.rolePermission?.includes(el)}
                                    onChange={(event) => {
                                      const index = values.rolePermission.indexOf(el);
                                      let arr = [];
                                      if (index === -1) {
                                        arr = arr.concat(values.rolePermission, el);
                                      } else if (index === 0) {
                                        arr = arr.concat(values.rolePermission.slice(1));
                                      } else if (index === values.rolePermission.length - 1) {
                                        arr = arr.concat(values.rolePermission.slice(0, -1));
                                      } else if (index > 0) {
                                        arr = arr.concat(
                                          values.rolePermission.slice(0, index),
                                          values.rolePermission.slice(index + 1)
                                        );
                                      }
                                      setFieldValue("rolePermission", arr);
                                    }}
                                    label={el.split(" ")?.[0]}
                                  />
                                </Mui.Box>
                              }
                            >
                              <Mui.Typography sx={{ mr: ".625rem" }}>
                                Can {el.split(" ")?.[0] === "list" ? `see list of ${el.split(" ")?.[1]}` : el}
                              </Mui.Typography>
                            </RoleItem>
                          );
                        })}
                      </Mui.List>
                    </Mui.Paper>
                  </Mui.Grid>
                );
              })}
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
                {editId ? "Update Role" : "Create Role"}
              </StyledButton>

              <StyledButton
                type="button"
                variant="outlined"
                color={theme.palette.grey.main}
                sx={{ color: theme.palette.text.primary }}
                component={Link}
                to={"/user-management/role"}
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
        </Form>
      )}
    </Formik>
  );
};

export default RoleForm;
