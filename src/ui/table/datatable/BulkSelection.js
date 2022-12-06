import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const BulkSelection = (props) => {
  const { selected, data, selectedFlatRows, resetBulkSelection, ...options } = props;

  const { title, buttonText, icon, handleOnBulk, classes, type } = options?.bulkSelectionOptions;

  return (
    <div className={`flex items-center ${classes?.root || ""}`}>
      <h6 className="text-lg text-primary-1000 font-normal">
        {selected} {title || "Selected items"}
      </h6>

      <button
        type="button"
        onClick={() => {
          handleOnBulk(data);
          resetBulkSelection(false);
          if (type === "addProduct") {
            selectedFlatRows?.map((d) => {
              const original = d.original;
              original.disabled = true;
              return original;
            });
          }
        }}
        className={classes?.button || "btn-icon secondary lg ml-8 !p-3 flex-shrink-0 svg-fill svg-white"}
      >
        {buttonText || ""}
        <span className={classes?.icon || ""}>{icon || <DeleteIcon />}</span>
      </button>
    </div>
  );
};

export default BulkSelection;
