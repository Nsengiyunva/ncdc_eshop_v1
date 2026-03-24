import clsx from "clsx";

export const FieldWrapper = (props) => {
  const { label, className, error, children, required } = props;
  return (
    <div>
      <label
        className={clsx("block text-sm font-medium text-gray-700", className)}
      >
        <span className="text-gray-600">{label}</span>
        {required && <span className="text-red-600"> *</span>}
        <br />
        <div className="mt-2">{children}</div>
      </label>
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-sm font-semibold text-red-500"
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
