export const CheckboxField = (props) => {
  const { label, disabled, value, registration, onChange, error } = props;
  return (
    <div className="flex justify-start p-4 border border-gray-100">
      <div>
        <div className="form-check">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-green-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            disabled={disabled}
            value={value}
            {...registration}
            onChange={onChange}
            id="flexCheckDefault"
          />
          <label
            className="form-check-label inline-block text-gray-600 text-xs"
            for="flexCheckDefault"
          >
            {label}
          </label>
        </div>
        {error}
      </div>
    </div>
  );
};
