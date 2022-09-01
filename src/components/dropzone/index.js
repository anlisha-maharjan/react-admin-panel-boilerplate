import React, { Component } from "react";
import * as Mui from "@mui/material";
import DropzoneComponent from "react-dropzone-component";
import { connect } from "react-redux";
import { IconClose, IconCloudUpload } from "src/components/svg";
import { deleteMedia } from "src/reduxs/actions";
import fileIcon from 'src/assets/images/icon-file.svg';
import "dropzone/dist/min/dropzone.min.css";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.myDropzone = "";
    this.reactDOMServer = require("react-dom/server");
    this.dropzoneComponentConfig = {
      postUrl: process.env.REACT_APP_API_URL + "/api/medias",
    };
    this.dropzoneConfig = {
      url: process.env.REACT_APP_API_URL + "/api/medias",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
        "Cache-Control": null,
        "X-Requested-With": null,
      },
      paramName: "file",
      thumbnailHeight: 160,
      maxFiles: props.multiple ? 100 : 1,
      acceptedFiles: props.accept ? props.accept : null,
      maxThumbnailFilesize: 50, // In MB. When the filename exceeds this limit, the thumbnail will not be generated.
      dictDefaultMessage: "Browser or Drag n drop files",
      dictInvalidFileType: "Invalid File",
      accept: function (file, done) {
        done();
      },
      previewTemplate: this.reactDOMServer.renderToStaticMarkup(
        <div
          className={
            "dz-preview dz-file-preview " +
            (!props.multiple ? "single-file" : "")
          }
        >
          <span className="dz-error-mark">
            <i />{" "}
          </span>

          <span className="dz-success-mark">
            <i />
          </span>

          <figure className="preview-container">
            <img
              data-dz-thumbnail
              className="img-thumbnail border-0 file-preview"
              alt=""
            />
            <i className="simple-icon-doc preview-icon" />
          </figure>

          {this.props.markFeature ? (
            <span className="markFeature">Mark Featured</span>
          ) : null}
          <div className="dz-details">
            <h6 data-dz-name> </h6>
            <div className="dz-progress">
              <span className="file-size" data-dz-size />
              <span className="dz-upload" data-dz-uploadprogress />
            </div>
            <div className="dz-error-message">
              <span data-dz-errormessage />
            </div>
          </div>

          <a href="#/" className="remove" data-dz-remove>
            <IconClose />
          </a>
        </div>
      ),
    };
  }

  /*clear = () => {
    this.myDropzone.removeAllFiles(true);
  };

  b64toBlob(dataURI, filetype) {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: filetype });
  }
*/
  addAttachment = (file) => {
    let _self = this;
    if (!file.id) {
      const filetypeRaw = file?.type?.split("/")[0];

      if (filetypeRaw !== "image") {
        let previewSelector =
          file.previewElement.querySelector(".file-preview");
        if (previewSelector) {
          previewSelector.setAttribute("src", fileIcon);
          previewSelector.classList.add("icon");
        }
      }
    }
    if (this.props.markFeature) {
      // Click event for make cover.
      file.previewElement
        .querySelector(".markFeature")
        .addEventListener("click", function () {
          // Remove featured class from all other elements
          Array.from(document.querySelectorAll(".markFeature")).forEach(
            (el) => {
              el.classList.remove("featured");
              el.innerHTML = "Mark Featured";
            }
          );
          // Update label value in array
          _self.props.imgArr.forEach((item) => {
            item.label = "";
            if (file.name === item.name) {
              // Set label value to cover and add featured class
              item.label = "cover";
              file.previewElement
                .querySelector(".markFeature")
                .classList.add("featured");
              file.previewElement.querySelector(".markFeature").innerHTML =
                "Featured";
            }
          });
        });
    }
  };

  removeAttachment = (file) => {
    file.previewElement.remove();
    for (let index = 0; index < this.props.imgArr.length; index++) {
      const element = this.props.imgArr[index];
      if (element.name === file.name) {
        if (!element.id) {
          this.props.deleteMedia(element.value);
        }
        this.props.imgArr.splice(index, 1);
        this.props.upload(this.props.field, this.props.imgArr);
        break;
      }
    }
  };

  initAttachment = (dropzone) => {
    if (this.props.imgArr && this.props.imgArr.length > 0) {
      this.props.imgArr.forEach((element, index) => {
        let mockFile = {
          id: element.id,
          name: element.name,
          size: element.size,
          label: element.label,
          url: element.url,
        };
        dropzone.emit("addedfile", mockFile);
        dropzone.emit("thumbnail", mockFile, element.url);
        dropzone.emit("complete", mockFile);

        if (this.props.markFeature) {
          if (element.label === "cover") {
            mockFile.previewElement
              .querySelector(".markFeature")
              .classList.add("featured");
            mockFile.previewElement.querySelector(".markFeature").innerHTML =
              "Featured";
          }
        }
        if (
          element.mimeType?.includes("application") ||
          element.mimeType?.includes("text")
        ) {
          let previewSelector =
            mockFile.previewElement.querySelector(".file-preview");
          if (previewSelector) {
            previewSelector.setAttribute("src", fileIcon);
            previewSelector.classList.add("icon");
          }
        }
        dropzone.files.push(mockFile);
      });
    }
  };

  render() {
    return (
      <DropzoneComponent
        config={this.dropzoneComponentConfig}
        djsConfig={this.dropzoneConfig}
        eventHandlers={{
          init: (dropzone) => {
            if (this.props.init) {
              this.myDropzone = dropzone;
              setTimeout(() => {
                this.initAttachment(dropzone);
              }, 1000);
            }
          },
          success: (file, response) => {
            if (response.success) {
              if (this.props.markFeature) {
                // Cover image logic for first image.
                if (this.props.imgArr?.length === 0) {
                  file.previewElement
                    .querySelector(".markFeature")
                    .classList.add("featured");
                  file.previewElement.querySelector(".markFeature").innerHTML =
                    "Featured";
                }
              }
              this.props.imgArr.push({
                id: "",
                name: file.name,
                size: file.size,
                value: response.data.name,
                url: response.data.url,
                label: this.props.imgArr?.length > 0 ? "" : "cover",
                mimeType: response.data.mimeType,
              });

              this.props.upload(this.props.field, this.props.imgArr);
            }
          },
          addedfile: (file) => {
            this.addAttachment(file);
          },
          removedfile: (file) => {
            this.removeAttachment(file);
          },
        }}
      >
        <div className="dz-message">
          <IconCloudUpload />
          Drag & Drop your files here <br />
          <br /> or <br />
          <Mui.Button
            variant="contained"
            color="primary"
            className="btn-default"
          >
            Browse File
          </Mui.Button>
        </div>
      </DropzoneComponent>
    );
  }
}
const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  deleteMedia,
})(Dropzone);
