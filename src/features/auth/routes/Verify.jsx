import React from "react";
import { Layout } from "../components/Layout";
import confetti from "assets/confetti.png";

export const Verify = () => {
  return (
    <Layout title="">
      <div className="text-center">
        <div className="flex justify-around">
          <img
            src={confetti}
            alt="..."
            className="w-12 h-12 my-4"
            loading="lazy"
          />
          <img
            src={confetti}
            alt="..."
            className="w-12 h-12 my-4"
            loading="lazy"
          />
        </div>
        <p className="text-2xl font-bold my-4">
          Thank you for creating an account with us.
        </p>
        <p className="text-xl my-4">
          Please check your email to activate your account.
        </p>
      </div>
    </Layout>
  );
};
