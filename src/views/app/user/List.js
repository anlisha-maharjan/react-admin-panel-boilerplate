import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserList, deleteUser, resendVerificationCode, getAllRole, resetUser } from "reduxs/actions";
import AddIcon from "@mui/icons-material/Add";
import { checkPermission, capitalizeFirstLetter } from "helpers";
import {
  StyledCard,
  BreadcrumbContainer,
  StatusChip,
  TableInstance,
  Table,
  TablePagination,
  Toolbar,
  Action,
  AlertDialog,
} from "ui";
import InputFieldStyles from "styles/form/InputField.style";
import SelectFieldStyles from "styles/form/SelectField.style";

const UserList = (props) => {
  const theme = Mui.useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FieldStyles = InputFieldStyles();
  const SelectStyles = SelectFieldStyles(theme);

  const [pageValue, setPageValue] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeCol, setActiveCol] = useState("created_at");
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [search, setSearch] = useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [role, setRole] = useState("");

  const { userList, metaData, delLoading, codeLoading, loading, success } = useSelector((state) => state.user);
  const { permissionList } = useSelector((state) => state.shared);
  const { roles } = useSelector((state) => state.role);
  const searchFields =
    "name:like;phone:like;email:like;address:like,roles.name:like;statusConfigChoice.display_name:like;";

  const onChange = (search, sortOrder, page, perPage, activeCol, role) => {
    dispatch(
      getUserList({
        search: search,
        searchFields: searchFields,
        sortedBy: sortOrder,
        page: page,
        pageSize: perPage,
        orderBy: activeCol,
        role: role,
      })
    );
  };

  const handleOnRoleFilter = (event) => {
    const value = event.target.value;
    setRole(value);
    onChange(search, sortOrder, pageValue, perPage, activeCol, value || null);
  };

  const handleOnClearAll = () => {
    setRole("");
    onChange(search, sortOrder, pageValue, perPage, activeCol, null);
  };

  const handleSort = (order, val) => {
    setSortOrder(order);
    setActiveCol(val);
    onChange(search, order, pageValue, perPage, val);
  };

  const handleChangePage = (val) => {
    setPageValue(val);
    onChange(search, sortOrder, val, perPage, activeCol);
  };

  const handleChangePerPage = (val) => {
    setPerPage(val);
    onChange(search, sortOrder, pageValue, val, activeCol);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const val = event.target.value;
    setSearch(event.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(function () {
        onChange(val, sortOrder, pageValue, perPage, activeCol);
      }, 1000)
    );
  };

  const handleEditClick = (e, id) => {
    e.preventDefault();
    navigate(`/user-management/user/edit/${id}`);
  };

  const handleOnDelete = () => {
    if (!delLoading && deleteId) dispatch(deleteUser(deleteId));
  };

  const handleOnResendVerificationCode = (e, id) => {
    e.preventDefault();
    if (id && !codeLoading) dispatch(resendVerificationCode(id));
  };

  const columns = React.useMemo(() => [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Full Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: (value) => capitalizeFirstLetter(value.role),
      id: "roles|name",
    },
    {
      Header: "Verified",
      accessor: "isVerified",
      id: "is_verified",
      Cell: (props) => {
        return (
          <StatusChip
            uitype="only icon"
            variant="outlined"
            status={props.value ? "active" : "inactive"}
            label={props.value ? "Yes" : "No"}
          />
        );
      },
    },
    {
      Header: "Status",
      accessor: "statusConfigChoice",
      id: "status",
      Cell: (props) => {
        return <StatusChip status={props.value.configChoice} label={props.value.displayName} />;
      },
    },
    {
      Header: "Actions",
      accessor: "actions",
      disableSortBy: true,
      Cell: (props) => {
        const rowIdx = props.row.values.id;

        return (
          <Action
            id={props.row.id}
            handleOnDelete={() => {
              setDeleteId(rowIdx);
              setOpenDeleteAlert(true);
            }}
            handleOnEdit={(e) => handleEditClick(e, rowIdx)}
            handleOnResendVerificationCode={(e) => handleOnResendVerificationCode(e, rowIdx)}
            permission={props.permission}
            {...props}
          />
        );
      },
    },
  ]);

  const data = React.useMemo(() => userList, [userList]);

  useEffect(() => {
    dispatch(getUserList({}));
    dispatch(getAllRole());
  }, []);

  return (
    <>
      <BreadcrumbContainer
        title="User List"
        paths={[
          {
            title: "User",
            path: "/user-management/user",
          },
        ]}
      />

      <StyledCard>
        <TableInstance
          columns={columns}
          data={data || []}
          permission={{
            // view: checkPermission(permissionList, "view user"),
            edit: checkPermission(permissionList, "edit user"),
            delete: checkPermission(permissionList, "delete user"),
            resendCode: checkPermission(permissionList, "resendCode user"),
          }}
          totalPage={metaData?.totalPages}
          currentPage={metaData?.page}
          total={metaData?.total}
        >
          <Toolbar
            title="User"
            subTitle="List of all available user"
            buttonA="Add User"
            allowButtonA={checkPermission(permissionList, "add user")}
            buttonAIcon={<AddIcon />}
            handleButtonA={() => navigate("/user-management/user/add")}
            search={search}
            handleSearch={handleSearch}
            handleOnClearAll={handleOnClearAll}
          >
            <Mui.FormControl sx={FieldStyles}>
              <Mui.Select
                MenuProps={{
                  sx: SelectStyles.paper,
                }}
                displayEmpty
                value={role}
                onChange={handleOnRoleFilter}
              >
                <Mui.MenuItem className="select-item" value="">
                  Select Role
                </Mui.MenuItem>
                {roles
                  ?.filter((role) => role.name !== "client")
                  ?.map((role) => {
                    return (
                      <Mui.MenuItem className="select-item" key={role.name} value={role.name}>
                        {capitalizeFirstLetter(role.name)}
                      </Mui.MenuItem>
                    );
                  })}
              </Mui.Select>
            </Mui.FormControl>
          </Toolbar>

          <Table handleSort={handleSort} loading={loading} />
          <TablePagination
            meta={metaData}
            goToStart={() => handleChangePage(1)}
            goToPrev={() => handleChangePage(pageValue === 0 ? 1 : pageValue - 1)}
            goToNext={() => handleChangePage(pageValue !== metaData?.totalPage ? pageValue + 1 : 1)}
            goToLast={() => handleChangePage(metaData?.totalPage)}
            handleChangePerPage={(val) => handleChangePerPage(val)}
            perPage={perPage}
            handleChangePage={handleChangePage}
          />
        </TableInstance>
      </StyledCard>

      <AlertDialog
        open={openDeleteAlert}
        handleCancel={() => {
          setOpenDeleteAlert(false);
          setDeleteId(null);
        }}
        handleAction={handleOnDelete}
        title="Delete"
        info="Are you sure to permanently delete selected user?"
        loadingInfo="User is deleting..."
        actionLabel="Delete"
        loading={delLoading}
        success={success}
        reset={() => dispatch(resetUser())}
      />
    </>
  );
};

export default UserList;
