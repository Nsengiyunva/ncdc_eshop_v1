import React from "react";

export const UserDetails = ({ data }) => {
  return (
    <div>
      <div className="space-y-4 px-8 py-4">
        <table className="table-auto overflow-scroll w-full text-left border border-white">
          <tbody className="text-left ">
            <tr>
              <td>Name</td>
              <td>{data?.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{data?.email}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{data?.phone_number}</td>
            </tr>
            <tr>
              <td>TIN number</td>
              <td>{data?.tin}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
