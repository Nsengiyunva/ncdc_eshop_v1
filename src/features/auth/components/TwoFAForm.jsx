import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import storage from "utils/storage";
import * as z from "zod";
import { twoFAuth } from "../api/twoFa";
import { useState } from "react";


const schema = z.object({
  code: z.string().min(1, "Required"),
});

export const TwoFAForm = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          setIsLoading(true);
          const userId = storage.getUserId();
          await twoFAuth({
            user_id: userId,
            code: values.code,
          });
          setIsLoading(false);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="Code"
              error={formState.errors["code"]}
              registration={register("code")}
            />
            <div>
              <Button
                isLoading={isLoading}
                type="submit"
                className={`w-full ${
                  isLoading ? "bg-green-400" : "bg-green-600"
                }`}
              >
                {isLoading ? "Logging in..." : "Continue"}
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-between text-sm">
        <div>
          <Link
            to="/auth/register"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Create new account
          </Link>
        </div>
        <div>
          <Link
            to="/auth/forgot-password"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

TwoFAForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
