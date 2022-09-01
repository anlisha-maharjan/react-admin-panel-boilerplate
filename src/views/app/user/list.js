import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList, deleteUser, deleteMultipleUser, resetUser } from "src/reduxs/actions";
import DataTable from "src/components/datatable";
import Breadcrumb from "src/components/breadcrumb";
import { Alert } from "src/components/dialog";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      deleteIds: null,
      openAlert: false,
      openAlert1: false,
    };
    this.searchFields = "email:like;first_name:like;last_name:like;role.name:like;";
  }

  componentDidMount() {
    this.props.getUserList({});
  }

  onDelete = () => {
    if (!this.props.loading1) {
      this.props.deleteUser(this.state.deleteId);
    }
  };

  onDeleteAll = () => {
    if (!this.props.loading1) {
      this.props.deleteMultipleUser(this.state.deleteIds);
    }
  };

  handleOpenAlert = (id) => {
    this.setState({ openAlert: true, deleteId: id });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false, deleteId: null });
  };

  handleOpenAlert1 = (ids) => {
    this.setState({ openAlert1: true, deleteIds: ids });
  };

  handleCloseAlert1 = () => {
    this.setState({ openAlert1: false, deleteIds: null });
  };

  onChange = (search, sortOrder, page, pageSize, activeCol) => {
    this.props.getUserList({
      search: search,
      searchFields: this.searchFields,
      sortOrder: sortOrder,
      page: page,
      pageSize: pageSize,
      activeCol: activeCol,
    });
  };

  render() {
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
          rows={this.props.userList?.data || []}
          totalPage={this.props.userList?.meta?.pages || 0}
          totalItem={this.props.userList?.meta?.total || 0}
          start={this.props.userList?.meta?.start || 0}
          end={this.props.userList?.meta?.end || 0}
          loading={this.props.loading}
          route={"/user"}
          createLabel="Add Customer"
          handleOpenAlert={this.handleOpenAlert}
          handleOpenAlert1={this.handleOpenAlert1}
          onChange={this.onChange}
          permission={{ add: 1, edit: 1, view: 1, delete: 1 }}
          actionStyle="kebab"
          enableColumnFilter={false}
          enableCheckbox={false}
          history={this.props.history}
          enableRowClick={true}
        />

        <Alert
          open={this.state.openAlert}
          close={this.handleCloseAlert}
          action={this.onDelete}
          title="Customer Delete"
          info="Are you sure to permanently delete this customers?"
          awaitingInfo="Customer is deleting..."
          actionBtnLabel="Delete"
          loading={this.props.loading1}
          success={this.props.success}
          reset={this.props.resetUser}
        />

        <Alert
          open={this.state.openAlert1}
          close={this.handleCloseAlert1}
          action={this.onDeleteAll}
          title="Customer Delete"
          info="Are you sure to permanently delete these customers?"
          awaitingInfo="Customer is deleting..."
          actionBtnLabel="Delete"
          loading={this.props.loading1}
          success={this.props.success}
          reset={this.props.resetUser}
        />
      </>
    );
  }
}
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
