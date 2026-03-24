import clsx from "clsx";

import { FieldWrapper } from "./FieldWrapper";

export const UrlField = (props) => {
  const {
    type = "url",
    label,
    className,
    disabled,
    value,
    registration,
    onChange,
    error,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(
          "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
          className
        )}
        disabled={disabled}
        value={value}
        {...registration}
        onChange={onChange}
      />
    </FieldWrapper>
  );
};
