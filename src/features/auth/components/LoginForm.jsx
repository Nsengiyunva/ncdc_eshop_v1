import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as z from "zod";

import { Form, InputField } from "components/Form";
import { Button } from "components/Elements";
import { useAuth } from "lib/auth";
import storage from "utils/storage";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "A valid email address is required" })
    .email({ message: "Enter valid email" }),
  password: z.string().min(1, { message: "Provide your password" }),
});

export const LoginForm = ({ onSuccess, twoFAuth }) => {
  const { login, isLoggingIn } = useAuth();
  const { t } = useTranslation();

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          const result = await login(values);
          if (result?.requires_2fa) {
            storage.setRequire2FA(true);
            storage.getUserId(result.user_id);
            twoFAuth();
          } else {
            onSuccess();
          }
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label={t("email")}
              error={formState.errors["email"]}
              registration={register("email")}
              autoComplete="email"
              className="text-xs sm:text-sm"
            />
            <InputField
              type="password"
              label={t("password")}
              error={formState.errors["password"]}
              registration={register("password")}
              autoComplete="current-password"
              className="text-xs sm:text-sm"
            />
            <div className="mt-4">
              <Button
                isLoading={isLoggingIn}
                type="submit"
                className={`w-full py-2 text-xs sm:text-sm ${
                  isLoggingIn ? "bg-green-400" : "bg-green-600"
                }`}
              >
                {isLoggingIn ? t("loggingIn") : t("login")}
              </Button>
            </div>
          </>
        )}
      </Form>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm">
        <Link
          to="/auth/register"
          className="font-medium text-green-600 hover:underline focus:outline-none"
        >
          {t("createAccount")}
        </Link>
        <Link
          to="/auth/forgot-password"
          className="font-medium text-green-600 hover:underline focus:outline-none"
        >
          {t("forgotPassword")}
        </Link>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  twoFAuth: PropTypes.func.isRequired,
};
