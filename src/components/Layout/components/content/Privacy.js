import React from "react";
import { ContentLayout } from "./ContentLayout";

export const Privacy = () => {
  return (
    <ContentLayout>
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-8 text-center">
        Privacy Policy
      </h1>
      <div className="space-y-4">
        <p className="text-base">
          At National Curriculum Development Center, we are committed to
          protecting the privacy and personal information of our customers,
          users, and visitors to our website. This Privacy Policy outlines the
          type of information we collect, how we use it, and how we protect it.
        </p>

        <h2 className="font-semibold">Information we collect:</h2>
        <ul className="text-base list-disc mx-4">
          <li>
            Personal information such as name, email, address, and phone number
          </li>
          <li>Payment information for purchasing our products and services</li>
          <li>Demographic information such as gender</li>
        </ul>

        <h2 className="font-semibold">How we use the information:</h2>
        <ul className="text-base list-disc mx-4">
          <li>
            To process orders and deliver products and services to customers
          </li>
          <li>
            To improve our products and services based on customer feedback
          </li>
          <li>
            To communicate with customers about their orders, account
            information, and promotions
          </li>
        </ul>

        <h1 className="font-semibold">
          {" "}
          We do not share or sell any personal information to third parties
          unless required by law.
        </h1>

        <h2 className="font-semibold">How we protect the information:</h2>
        <ul className="text-base list-disc mx-4">
          <li>
            We use secure servers to store and transmit personal and payment
            information
          </li>
          <li>
            We limit access to personal information to only authorized personnel
          </li>
          <li>
            We use industry-standard security measures to protect against
            unauthorized access, alteration, or destruction of personal
            information
          </li>
        </ul>

        <h2 className="font-semibold">Changes to this Privacy Policy:</h2>
        <p className="text-base">
          We reserve the right to update or change this Privacy Policy at any
          time. Any changes will be posted on our website with the updated
          policy effective immediately upon posting.
        </p>
      </div>
    </ContentLayout>
  );
};
