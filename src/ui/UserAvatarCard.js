import React, { useEffect, useState, useMemo, useRef } from "react";
import * as Mui from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { uploadMedia, resetMedia } from "reduxs/actions";
import { uploadMaxFileSize, toaster } from "helpers";
import { StyledCard, StyledSpinner } from "ui";
import DefaultUserAatar from "assets/images/default-user.png";

const UserAvatar = Mui.styled(Mui.Box, { shouldForwardProp: (prop) => prop !== "isedit" })(({ theme, isedit }) => ({
  width: "9rem",
  height: "9rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  margin: "0 auto",
  borderRadius: "50%",
  border: "1px dashed rgba(145, 158, 171, 0.32)",
  color: isedit ? theme.palette.body.light : "#919eab",

  "& .user-avatar": {
    width: "7.875rem",
    height: "7.875rem",
    backgroundColor: "#DFE2E7",
    fontSize: "0.75rem",
    lineHeight: "1.5",

    "& img": { objectPosition: "top" },

    "&.placeholder": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      borderRadius: "50%",
      backgroundColor: isedit ? Mui.alpha(theme.palette.body.dark, 0.75) : "#f4f6f8",
      opacity: isedit ? 0 : 1,
      transform: "translate(-50%,-50%)",
      transition: theme.transitions.create("opacity", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      cursor: "pointer",
      zIndex: 1,

      "& input": {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        opacity: 0,
        cursor: "pointer",
        zIndex: 5,
      },
    },

    "&:hover": {
      "&.placeholder": {
        opacity: 1,
      },
    },
  },
}));

const UserAvatarCard = (props) => {
  const { isedit, media, setFieldValue, children } = props;
  const theme = Mui.useTheme();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const { mediaData, loading } = useSelector((state) => state.media);

  const [name, setName] = useState(null);
  const [imgLoading, setImageLoading] = useState(false);

  const hasMedia = useMemo(() => {
    return isedit || media?.length > 0 ? true : false;
  }, [isedit, media]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const uploadError = parseInt(file.size) / 1024 / 1024 > uploadMaxFileSize;
      if (uploadError) {
        e.target.value = "";
        toaster("error", `File exceeds the max upload limit.`);
      } else {
        setName(file.name);
        dispatch(uploadMedia(file));
      }
    }
  };

  const onDelete = () => {
    setFieldValue("media", []);
  };

  useEffect(() => {
    if (mediaData?.name) {
      setFieldValue("media", [
        {
          id: "",
          name: name,
          value: mediaData.name,
          url: mediaData.url,
        },
      ]);
      dispatch(resetMedia());
    }
  }, [mediaData]);

  useEffect(() => {
    if (hasMedia && loading) {
      setImageLoading(true);
    }
  }, [loading, hasMedia]);

  return (
    <StyledCard sx={{ position: "relative", p: hasMedia ? "5.5rem 1.5rem 1.5rem" : "3rem 1.5rem 1.5rem" }}>
      <UserAvatar isedit={hasMedia}>
        {hasMedia ? (
          <Mui.Avatar
            className="user-avatar"
            src={media?.[0]?.url || DefaultUserAatar}
            imgProps={{
              onLoad: () =>
                setTimeout(() => {
                  setImageLoading(false);
                }, 1000),
            }}
          />
        ) : null}

        <Mui.Box className={`user-avatar placeholder`}>
          <AddAPhotoIcon />
          <Mui.Typography component="span" variant="body2" mt={1}>
            Upload Photo
          </Mui.Typography>

          <input ref={inputRef} name="media" type="file" accept="image/*" onChange={onSelectFile} />

          {media?.length > 0 && (
            <Mui.IconButton
              sx={{ position: "absolute", bottom: 0, color: theme.palette.error.main, zIndex: 6 }}
              onClick={() => {
                inputRef.current.value = "";
                onDelete();
              }}
            >
              <DeleteForeverIcon />
            </Mui.IconButton>
          )}
        </Mui.Box>

        {loading || (hasMedia && imgLoading) ? (
          <Mui.Box
            className="backdrop-blur-sm"
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: "50%",
              zIndex: 1,
            }}
          >
            <StyledSpinner trailcolor="#bbb" spinnercolor={theme.palette.primary.main} />
          </Mui.Box>
        ) : null}
      </UserAvatar>

      <Mui.Typography
        sx={{
          margin: "1rem auto 0px",
          color: theme.palette.grey.dark,
          fontSize: "0.75rem",
          textAlign: "center",
          lineHeight: "1.5",
        }}
      >
        Allowed *.jpeg, *.jpg, *.png, *.gif <br /> Max size of {uploadMaxFileSize} MB
      </Mui.Typography>

      {children}
    </StyledCard>
  );
};

export default UserAvatarCard;
