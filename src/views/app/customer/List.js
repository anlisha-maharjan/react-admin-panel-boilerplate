import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserList, deleteUser, resendVerificationCode, resetUser } from "reduxs/actions";
import AddIcon from "@mui/icons-material/Add";
import { checkPermission } from "helpers";
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

const CustomerList = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pageValue, setPageValue] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeCol, setActiveCol] = useState("created_at");
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [search, setSearch] = useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { userList, metaData, delLoading, codeLoading, loading, success } = useSelector((state) => state.user);
  const { permissionList } = useSelector((state) => state.shared);
  const searchFields = "name:like;phone:like;email:like;address:like,statusConfigChoice.display_name:like;";

  const onChange = (search, sortOrder, page, perPage, activeCol) => {
    dispatch(
      getUserList({
        search: search,
        searchFields: searchFields,
        sortedBy: sortOrder,
        page: page,
        pageSize: perPage,
        orderBy: activeCol,
        role: "client",
      })
    );
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
    navigate(`/user-management/customer/edit/${id}`);
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
      Header: "Contact",
      accessor: "phone",
      Cell: (props) => {
        return `+61 ${props.value}`;
      },
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
    dispatch(getUserList({ role: "client" }));
  }, []);

  return (
    <>
      <BreadcrumbContainer
        title="Customer List"
        paths={[
          {
            title: "Customer",
            path: "/user-management/customer",
          },
        ]}
      />

      <StyledCard>
        <TableInstance
          columns={columns}
          data={data || []}
          permission={{
            // view: checkPermission(permissionList, "view customer"),
            edit: checkPermission(permissionList, "edit customer"),
            delete: checkPermission(permissionList, "delete customer"),
            resendCode: checkPermission(permissionList, "resendCode customer"),
          }}
          totalPage={metaData?.totalPages}
          currentPage={metaData?.page}
          total={metaData?.total}
        >
          <Toolbar
            title="Customer"
            subTitle="List of all available customer"
            buttonA="Add Customer"
            allowButtonA={checkPermission(permissionList, "add customer")}
            buttonAIcon={<AddIcon />}
            handleButtonA={() => navigate("/user-management/customer/add")}
            search={search}
            handleSearch={handleSearch}
          />

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
        info="Are you sure to permanently delete selected customer?"
        loadingInfo="Customer is deleting..."
        actionLabel="Delete"
        loading={delLoading}
        success={success}
        reset={() => dispatch(resetUser())}
      />
    </>
  );
};

export default CustomerList;
