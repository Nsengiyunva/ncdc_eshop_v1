import { Spinner } from "components/Elements/Spinner";
import clsx from "clsx";
import PropTypes from "prop-types";
import * as React from "react";

const variants = {
  primary: "border-0 bg-green-500 text-white hover:bg-green-600",
  warning: "border-0 bg-orange-500 text-white hover:bg-orange-600",
  inverse: "bg-white text-green-600",
  danger: "bg-red-600 text-white",
  outline: "border border-2 border-green-500 text-green-500 hover:text-white hover:bg-green-500"
};

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

export const Button = React.forwardRef(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-white" />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "inverse", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  isLoading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};
