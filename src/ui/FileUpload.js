import React, { useCallback, useMemo } from "react";
import * as Mui from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useDropzone } from "react-dropzone";
import { toaster, uploadMaxFileSize } from "helpers";
import UploadGraphics from "assets/images/dropzone-graphics.svg";
import { bytesToHuman } from "helpers";

const DropzoneContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  height: "16.25rem",
  display: "flex",
  alignItems: "center",
  gap: "2.1875rem",
  padding: ".625rem",
  border: `1px dashed ${Mui.lighten(theme.palette.primary.main, 0.5)}`,
  borderRadius: "0.5rem",
  backgroundColor: Mui.lighten(theme.palette.primary.main, 0.97),
  cursor: "pointer",
}));

const DroppedItems = Mui.styled(Mui.ListItem)(({ theme }) => ({
  marginTop: ".625rem",
  gap: "1rem",
  border: "1px solid #000",
  borderRadius: "8px",

  "& .MuiListItemIcon-root": {
    minWidth: "initial",
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    backgroundColor: "#d1d5d3",
  },

  "& .MuiListItemText-primary": {
    fontSize: ".875rem",
    fontWeight: 500,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },

  "& .MuiListItemText-secondary": {
    color: "#637381",
  },
}));

const FileUpload = (props) => {
  const { fileTypes, fileSize, multiple = true } = props;

  const theme = Mui.useTheme();

  const [fileList, setFileList] = React.useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: fileTypes,
    multiple: multiple,
    maxSize: fileSize || uploadMaxFileSize * 1024 * 1024, // Default file size 5MB
    onDrop: (e) => onDropFile(e),
    onDropRejected: (file) => {
      file.map((item) => {
        const msg = `${item.file?.name}: ${item.errors[0].message}`;
        return toaster("warn", msg);
      });
    },
  });

  const onDropFile = useCallback(
    (acceptedFiles) => {
      setFileList([...fileList, ...acceptedFiles]);
    },
    [fileList]
  );

  const handleRemoveFile = (file) => {
    const newFiles = [...fileList];
    newFiles.splice(newFiles.indexOf(file), 1);

    setFileList(newFiles);
  };

  const dropedItems = useMemo(
    () =>
      fileList.map((file) => (
        <DroppedItems
          key={file.path}
          secondaryAction={
            <Mui.IconButton
              onClick={() => handleRemoveFile(file)}
              edge="end"
              aria-label="delete"
              sx={{ color: theme.palette.error.main }}
              size="small"
            >
              <ClearIcon />
            </Mui.IconButton>
          }
        >
          <Mui.ListItemIcon>
            <InsertDriveFileOutlinedIcon />
          </Mui.ListItemIcon>

          <Mui.ListItemText primary={file.path} secondary={bytesToHuman(file.size)} />
        </DroppedItems>
      )),
    [handleRemoveFile, fileList]
  );

  return (
    <Mui.Box width="600px">
      <DropzoneContainer {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Mui.Box component="figure" width="10.9375rem" m="0">
          <img src={UploadGraphics} alt="File Upload" />
        </Mui.Box>

        <Mui.Typography component="h5" fontSize="1.25rem" fontWeight="700">
          Drop or Select file
          <Mui.Typography component="small" display="block" mt={1} color="#637381" fontSize=".875rem" fontWeight="400">
            Drop files here or click{" "}
            <Mui.Typography component="small" color="#199B5A">
              browse
            </Mui.Typography>{" "}
            thorough your machine
          </Mui.Typography>
        </Mui.Typography>
      </DropzoneContainer>

      <Mui.List dense sx={{ maxHeight: "17.5rem", p: 0, overflow: "auto" }} className="custom-scrollbar">
        {dropedItems.length > 0 ? dropedItems : null}
      </Mui.List>
    </Mui.Box>
  );
};

export default FileUpload;
