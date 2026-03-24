import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  const navigate = useNavigate();
  // scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout title="Login to account">
      <LoginForm onSuccess={() => navigate("/")} />
    </Layout>
  );
};
