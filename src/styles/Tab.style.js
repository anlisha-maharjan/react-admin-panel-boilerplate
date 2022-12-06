export default (theme) => ({
  marginBottom: "2.5rem",

  "& .MuiTab-root": {
    minWidth: "3rem",
    minHeight: "3rem",
    padding: 0,
    color: "#637381",
    fontSize: ".875rem",
    fontWeight: 600,
    textTransform: "none",

    "& svg": { width: "1.25rem", height: "1.25rem" },

    "&:not(:last-of-type)": {
      marginRight: "1.5rem",
    },

    "&.Mui-selected": { color: theme.palette.text.primary },
    [theme.breakpoints.up("md")]: {
      "&:not(:last-of-type)": {
        marginRight: "2.5rem",
      },
    },
  },
});
