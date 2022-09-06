import React, { Component } from "react";
import * as Mui from "@mui/material";
import { connect } from "react-redux";
import { uploadMedia, deleteMedia } from "src/reduxs/actions";
import defaultAvatar from "src/assets/images/user-avatar.svg";

class FileUpload extends Component {
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      this.props.uploadMedia(file, this.props.field);
    }
  };

  componentDidUpdate(previousProps) {
    if (
      previousProps.mediaData !== this.props.mediaData &&
      this.props.mediaData.field === this.props.field
    ) {
      let arr = [
        {
          id: "",
          name: "1.jpg",
          value: this.props.mediaData.name,
          url: this.props.mediaData.url,
        },
      ];
      this.props.upload(this.props.field, arr);
    }
  }

  render() {
    return (
      <Mui.Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        className="upload-avatar-style1 mb-5"
      >
        <Mui.Avatar
          alt={""}
          src={
            this.props.imgArr?.[0]?.url
              ? this.props.imgArr?.[0]?.url
              : defaultAvatar
          }
          className="mr-3"
        />
        <Mui.Typography
          component="h4"
          variant="h4"
          className="font-weight-normal"
        >
          Change Avatar
          <Mui.Typography
            component="span"
            variant="body1"
            className="d-block text-color-muted font-weight-light"
          >
            Add recent photo
          </Mui.Typography>
        </Mui.Typography>

        <Mui.Button
          type="button"
          variant="contained"
          color="primary"
          className="btn-default ml-4"
        >
          <input
            type="file"
            className="w-100 h-100 pos-absolute opacity-0 pointer"
            onChange={this.onSelectFile}
          />
          Upload Image
        </Mui.Button>
      </Mui.Box>
    );
  }
}
const mapStateToProps = ({ media }) => {
  const { mediaData, success, message, loading, error } = media;
  return { mediaData, success, message, loading, error };
};

export default connect(mapStateToProps, {
  uploadMedia,
  deleteMedia,
})(FileUpload);
