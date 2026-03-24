import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import { User } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

import { useForgotPassword } from "../api/forgotPassword";

const schema = z.object({
  email: z.string().min(1, "Required").email({ message: "Enter valid email" }),
});

export const ForgotPasswordForm = () => {
  const forgotPasswordMutation = useForgotPassword();

  const navigate = useNavigate();

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          await forgotPasswordMutation.mutateAsync({ email: values });
          navigate("/auth/reset-password");
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              icon={<User />}
              placeholder="Email Address"
              error={formState.errors["email"]}
              registration={register("email")}
            />

            <div>
              <Button
                isLoading={forgotPasswordMutation.isLoading}
                type="submit"
                className="w-full bg-green-600"
              >
                Forgot Password
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-center">
        <div className="text-sm">
          <Link to="/auth/login" className="font-medium  hover:text-green-500">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
