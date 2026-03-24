import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import { Link, useNavigate } from "react-router-dom";

import { useResetPassword } from "../api/resetPassword";

export const ResetPasswordForm = () => {
  const resetPasswordMutation = useResetPassword();
  const navigate = useNavigate();

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          await resetPasswordMutation.mutateAsync({ data: values });
          navigate("/auth/login");
        }}
        // schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="number"
              placeholder="Code"
              error={formState.errors["code"]}
              registration={register("code")}
            />
            <InputField
              type="password"
              placeholder="Password"
              error={formState.errors["password"]}
              registration={register("password")}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              error={formState.errors["password_confirmation"]}
              registration={register("password_confirmation")}
            />

            <div>
              <Button
                isLoading={resetPasswordMutation.isLoading}
                type="submit"
                className="w-full text-gray-g9"
              >
                Reset Password
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-center">
        <div className="text-sm">
          <Link
            to="/auth/login"
            className="font-medium text-orange-o10 hover:text-blue-500"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
