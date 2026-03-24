/* eslint-disable jsx-a11y/no-onchange */
import clsx from "clsx";

import { FieldWrapper } from "./FieldWrapper";

export const SelectField = (props) => {
  const {
    label,
    options,
    onChange,
    error,
    className,
    defaultValue,
    registration,
    placeholder,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        name="location"
        className={clsx(
          "mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 shadow-sm focus:outline-none sm:text-sm rounded-sm",
          className
        )}
        defaultValue={defaultValue}
        {...registration}
        onChange={onChange}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
