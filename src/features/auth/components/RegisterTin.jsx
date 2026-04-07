import React, { useState } from "react";
import { CheckTinForm } from "./CheckTinForm";
import { RegisterTinForm } from "./RegisterTinForm";
import { Link, useNavigate } from "react-router-dom";

let details = {
  "ContactNumber": 256773917523,
  "County": "NAKAWA DIVISION ",
  "District": "KAMPALA ",
  "ErrorCode": "E000",
  "ErrorDesc": "SUCCESS",
  "IsCustomsAgent": "N",
  "IsLicenseValid": {
      "@nil": "true"
  },
  "LicenseNumber": {
      "@nil": "true"
  },
  "MobileNumber": 256773917523,
  "PostalAddress": {
      "@nil": "true"
  },
  "RegistrationStatus": "ACTIVE",
  "SubCounty": "NAKAWA DIVISION",
  "TIN": 1010968941,
  "TaxPayerEmail": "kingbecks07@gmail.com",
  "TaxPayerName": "Mr. KING NSENGIYUNVA ISAAC",
  "TelephoneNumber": "00256",
  "TypeofUser": "NON-AGENT",
  "Village": {
      "@nil": "true"
  }
}

export const RegisterTin = () => {
  const [details, setDetails] = useState( null );
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
            Login please
          </Link>
        </div>
      </div>
    </div>
  );
};
