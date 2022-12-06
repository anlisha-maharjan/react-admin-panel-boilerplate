import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoleList, deleteRole, resetRole } from "reduxs/actions";
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

const RoleList = (props) => {
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

  const { roleList, metaData, delLoading, loading, success } = useSelector((state) => state.role);
  const { permissionList } = useSelector((state) => state.shared);
  const searchFields = "name:like;statusConfigChoice.display_name:like;";

  const onChange = (search, sortOrder, page, perPage, activeCol) => {
    dispatch(
      getRoleList({
        search: search,
        searchFields: searchFields,
        sortedBy: sortOrder,
        page: page,
        pageSize: perPage,
        orderBy: activeCol,
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
    navigate(`/user-management/role/edit/${id}`);
  };

  const handleOnDelete = () => {
    if (!delLoading && deleteId) dispatch(deleteRole(deleteId));
  };

  const columns = React.useMemo(() => [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: (value) => capitalizeFirstLetter(value.name),
    },
    {
      Header: "Description",
      accessor: "description",
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
            permission={props.permission}
            {...props}
          />
        );
      },
    },
  ]);

  const data = React.useMemo(() => roleList, [roleList]);

  useEffect(() => {
    dispatch(getRoleList({}));
  }, []);

  return (
    <>
      <BreadcrumbContainer
        title="Role List"
        paths={[
          {
            title: "Role",
            path: "/user-management/role",
          },
        ]}
      />

      <StyledCard>
        <TableInstance
          columns={columns}
          data={data || []}
          permission={{
            edit: checkPermission(permissionList, "edit role"),
            delete: checkPermission(permissionList, "delete role"),
          }}
          totalPage={metaData?.totalPages}
          currentPage={metaData?.page}
          total={metaData?.total}
        >
          <Toolbar
            title="Role"
            subTitle="List of all available role"
            buttonA="Add Role"
            allowButtonA={checkPermission(permissionList, "add role")}
            buttonAIcon={<AddIcon />}
            handleButtonA={() => navigate("/user-management/role/add")}
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
        info="Are you sure to permanently delete selected role?"
        loadingInfo="Role is deleting..."
        actionLabel="Delete"
        loading={delLoading}
        success={success}
        reset={() => dispatch(resetRole())}
      />
    </>
  );
};

export default RoleList;
