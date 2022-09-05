import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserList, deleteUser, deleteMultipleUser, resetUser } from "src/reduxs/actions";
import DataTable from "src/components/datatable";
import Breadcrumb from "src/components/breadcrumb";
import { Alert } from "src/components/dialog";

const UserList = (props) => {
  const [deleteId, setDeleteId] = useState(null);
  const [deleteIds, setDeleteIds] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert1, setOpenAlert1] = useState(false);

  const searchFields = "email:like;first_name:like;last_name:like;role.name:like;";

  useEffect(() => {
    props.getUserList({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = () => {
    if (!props.loading1) {
      props.deleteUser(deleteId);
    }
  };

  const onDeleteAll = () => {
    if (!props.loading1) {
      props.deleteMultipleUser(deleteIds);
    }
  };

  const handleOpenAlert = (id) => {
    setDeleteId(id);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setDeleteId(null);
  };

  const handleOpenAlert1 = (ids) => {
    setOpenAlert1(true);
    setDeleteIds(ids);
  };

  const handleCloseAlert1 = () => {
    setOpenAlert1(false);
    setDeleteIds(null);
  };

  const onChange = (search, sortOrder, page, pageSize, activeCol) => {
    props.getUserList({
      search: search,
      searchFields: searchFields,
      sortOrder: sortOrder,
      page: page,
      pageSize: pageSize,
      activeCol: activeCol,
    });
  };

  return (
    <>
      <Breadcrumb
        title={"Customer Management"}
        paths={[
          {
            title: "Customer",
          },
        ]}
      />

      <DataTable
        title="Customer"
        headCells={[
          {
            id: "userAvatar",
            sortKey: "first_name",
            label: "Name",
          },
          {
            id: "createdAt",
            sortKey: "created_at",
            label: "Created Date",
          },
        ]}
        rows={props.userList?.data || []}
        totalPage={props.userList?.meta?.pages || 0}
        totalItem={props.userList?.meta?.total || 0}
        start={props.userList?.meta?.start || 0}
        end={props.userList?.meta?.end || 0}
        loading={props.loading}
        route={"/user"}
        createLabel="Add Customer"
        handleOpenAlert={handleOpenAlert}
        handleOpenAlert1={handleOpenAlert1}
        onChange={onChange}
        permission={{ add: 1, edit: 1, view: 1, delete: 1 }}
        actionStyle="kebab"
        enableColumnFilter={false}
        enableCheckbox={false}
        enableRowClick={true}
      />

      <Alert
        open={openAlert}
        close={handleCloseAlert}
        action={onDelete}
        title="Customer Delete"
        info="Are you sure to permanently delete this customers?"
        awaitingInfo="Customer is deleting..."
        actionBtnLabel="Delete"
        loading={props.loading1}
        success={props.success}
        reset={props.resetUser}
      />

      <Alert
        open={openAlert1}
        close={handleCloseAlert1}
        action={onDeleteAll}
        title="Customer Delete"
        info="Are you sure to permanently delete these customers?"
        awaitingInfo="Customer is deleting..."
        actionBtnLabel="Delete"
        loading={props.loading1}
        success={props.success}
        reset={props.resetUser}
      />
    </>
  );
};
const mapStateToProps = ({ user }) => {
  const { userList, loading1, loading, success, error } = user;
  return { userList, loading1, loading, success, error };
};

export default connect(mapStateToProps, {
  getUserList,
  deleteUser,
  deleteMultipleUser,
  resetUser,
})(UserList);
