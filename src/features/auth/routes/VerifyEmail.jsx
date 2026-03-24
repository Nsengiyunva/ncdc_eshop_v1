import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmail } from "../api/verifyEmail";
import { Layout } from "../components/Layout";

export const VerifyEmail = () => {
  const { username, code } = useParams();

  const navigate = useNavigate();
  const verifyEmailMutation = useVerifyEmail();
  // scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout title="Verify Account">
      <div className="p-10">
        Thank you for creating an account with us. Please click the link below
        to activate your account.
        <br />
        <br />
        <button
          className="bg-green-500 text-white p-4 rounded-md w-full"
          onClick={async () => {
            const values = {
              username,
              code,
            };
            await verifyEmailMutation.mutateAsync({ data: values });
            navigate("/");
            window.location.reload(); // Refresh the page after navigation
          }}
        >
          Click to activate account
        </button>
      </div>
    </Layout>
  );
};
