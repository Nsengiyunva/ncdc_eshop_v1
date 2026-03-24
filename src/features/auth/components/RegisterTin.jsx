import React, { useState } from "react";
import { CheckTinForm } from "./CheckTinForm";
import { RegisterTinForm } from "./RegisterTinForm";
import { Link, useNavigate } from "react-router-dom";

export const RegisterTin = () => {
  const [details, setDetails] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <CheckTinForm setDetails={setDetails} />
      {details ? (
        <div className="my-8">
          <RegisterTinForm
            details={details}
            onSuccess={() => {
              localStorage.clear();
              navigate("/");
            }}
          />
        </div>
      ) : (
        ""
      )}
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="/auth/login"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Login instead
          </Link>
        </div>
      </div>
    </div>
  );
};
