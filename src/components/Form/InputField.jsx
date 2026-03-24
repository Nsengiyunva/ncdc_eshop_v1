import clsx from "clsx";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { FieldWrapper } from "./FieldWrapper";

export const InputField = ({
  id,
  type = "text",
  label,
  className,
  onChange,
  maxLength,
  caption,
  registration,
  placeholder,
  passwordField,
  error,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClasses = clsx(
    "block w-full px-3 py-2 sm:py-2.5 rounded-md shadow-sm text-sm sm:text-base transition duration-150 ease-in-out",
    "placeholder-gray-400 focus:outline-none",
    {
      "border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500": !error,
      "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500": error,
    },
    className
  );

  return (
    <FieldWrapper label={label} error={error}>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : type}
          maxLength={maxLength}
          className={inputClasses}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          {...registration}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {passwordField && (
          <button
            type="button"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {caption && (
        <div className="mt-1 text-xs text-gray-500 text-right">{caption}</div>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error.message}
        </p>
      )}
    </FieldWrapper>
  );
};
