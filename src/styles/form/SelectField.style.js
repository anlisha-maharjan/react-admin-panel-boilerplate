export default (theme) => ({
  root: {
    "& .MuiInputBase-root": {
      "&.Mui-disabled": {
        backgroundColor: "#f8f8f8",
      },
    },
  },

  icon: {
    color: theme ? theme.palette.primary.light : "#9ad1b7",
    right: 12,
    position: "absolute",
    userSelect: "none",
    pointerEvents: "none",
  },
  paper: {
    "& .MuiPaper-root": {
      padding: ".3125rem 0",
      borderRadius: 3,
      marginTop: 1,
      boxShadow: "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px",
      oveflow: "hidden",
    },

    "& .MuiList-root": {
      paddingTop: 0,
      paddingBottom: 0,
      background: "white",
    },

    "& .MuiButtonBase-root.MuiMenuItem-root": {
      fontWeight: 400,
      paddingTop: ".75rem",
      paddingBottom: ".75rem",
    },
    "& .MuiButtonBase-root.MuiMenuItem-root:hover": {
      background: theme ? theme.palette.primary.light : "#9ad1b7",
    },
    "& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected": {
      color: "white",
      background: theme ? theme.palette.primary.dark : "#101828",
    },
    "& .MuiButtonBase-root.MuiMenuItem-root.MuiAutocomplete-option[aria-selected='true']": {
      color: "white",
      background: theme ? theme.palette.primary.dark : "#101828",
    },
    "& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected:hover": {
      background: theme ? theme.palette.primary.light : "#9ad1b7",
    },
    "& .MuiButtonBase-root.MuiMenuItem-root.MuiAutocomplete-option[aria-selected='true']:hover": {
      background: theme ? theme.palette.primary.light : "#9ad1b7",
    },
  },
});
