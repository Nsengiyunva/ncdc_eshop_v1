import clsx from "clsx";

import { FieldWrapper } from "./FieldWrapper";

export const RegularTextAreaField = (props) => {
  const {
    rows = 3,
    label,
    className,
    disabled,
    value,
    registration,
    placeholder,
    onChange,
    error,
  } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        id="message"
        rows={rows}
        className={clsx(
          "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500",
          className
        )}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        {...registration}
        onChange={onChange}
      ></textarea>
    </FieldWrapper>
  );
};
