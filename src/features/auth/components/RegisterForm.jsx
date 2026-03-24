import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import { useAuth } from "lib/auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { useTranslation } from "react-i18next";

export const RegisterForm = ({ onSuccess }) => {
  const { register, isRegistering } = useAuth();
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = z.object({
    name: z.string().min(1, { message: t("required") }),
    email: z
      .string()
      .email(t("enterValidEmail"))
      .min(1, { message: t("required") }),
    password: z
      .string()
      .refine(
        (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/.test(val),
        {
          message: t("passwordRequirements"),
          path: ["password"],
        }
      ),
  });

  const phoneError =
    phoneTouched && (!phoneNumber || !isValidPhoneNumber(phoneNumber));

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          Object.assign(values, { phone_number: phoneNumber });
          values.role = "USER";
          await register(values);
          onSuccess();
        }}
        schema={schema}
        options={{ shouldUnregister: true }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label={t("fullName")}
              error={formState.errors["name"]}
              registration={register("name")}
              required
            />
            <InputField
              type="email"
              label={t("emailAddress")}
              error={formState.errors["email"]}
              registration={register("email")}
              required
            />

            {/* Styled Phone Number Input */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("phoneNumber")} <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                id="phone"
                name="phone"
                country="UG"
                international
                value={phoneNumber}
                onChange={setPhoneNumber}
                onBlur={() => setPhoneTouched(true)}
                className={`block w-full px-3 py-2 rounded-md shadow-sm text-sm sm:text-base transition focus:outline-none ${
                  phoneError
                    ? "border border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="+256 712 345678"
              />
              {phoneError && (
                <p className="mt-1 text-xs text-red-600">
                  {t("enterValidPhone")}
                </p>
              )}
            </div>

            {/* Password Input with Toggle */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("password")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder={t("enterPassword")}
                  className={`block w-full px-3 py-2 rounded-md shadow-sm text-sm transition focus:outline-none ${
                    formState.errors["password"]
                      ? "border border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                  aria-label={
                    showPassword ? t("hidePassword") : t("showPassword")
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">{t("passwordHint")}</p>
              {formState.errors["password"] && (
                <p className="mt-1 text-xs text-red-600">
                  {formState.errors["password"].message}
                </p>
              )}
            </div>

            <Button
              isLoading={isRegistering}
              type="submit"
              className={`w-full py-2 ${
                isRegistering ? "bg-gray-400" : "bg-green-600"
              }`}
            >
              {isRegistering ? t("registering") : t("register")}
            </Button>
          </>
        )}
      </Form>

      <div className="mt-4 flex items-center justify-end text-sm">
        <Link
          to="/auth/login"
          className="font-medium text-green-600 hover:underline"
        >
          {t("loginInstead")}
        </Link>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
