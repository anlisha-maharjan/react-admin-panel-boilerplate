import React, { useEffect, forwardRef, useRef } from "react";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <label>
      <input {...rest} ref={resolvedRef} type="checkbox" className={`peer hidden`} />

      {/* Checbox Graphics */}
      <span
        className={`w-4 h-4 flex items-center justify-center flex-shrink-0 p-[3px] border border-gray-300 rounded svg-fill cursor-pointer
        ${rest?.checked ? "bg-green-200 border-green-500" : ""}
        ${indeterminate ? "bg-green-100 border-green-400" : ""}
        `}
      >
        {rest?.checked && (
          <svg className="fill-current !block" viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}

        {indeterminate && (
          <svg className="fill-current !block" viewBox="0 0 298.667 298.667" fill="current">
            <rect y="128" width="298.667" height="42.667" />
          </svg>
        )}
      </span>
    </label>
  );
});

IndeterminateCheckbox.displayName = "IndeterminateCheckbox";
export default IndeterminateCheckbox;
