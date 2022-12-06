export default () => ({
  "& .MuiInputLabel-root": {
    "&:not(.MuiInputLabel-shrink)": {
      color: "#919eab",
    },
    "&.Mui-focused": { color: "#212b36" || "inherit" },
  },

  "& .MuiInputBase-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(145, 158, 171, 0.32)",
      borderRadius: "0.5rem",
    },

    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#212b36",
      },
    },

    "&.Mui-disabled": {
      "& .MuiInputBase-input": { backgroundColor: "#f8f8f8" },
    },
  },
});
