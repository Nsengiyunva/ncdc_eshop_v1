import React from "react";
import { ContentLayout } from "./ContentLayout";

export const How = () => {
  return (
    <ContentLayout>
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-8 text-center">
        How to Buy
      </h1>
      <div className="space-y-6">
        <p className="text-base">
          If you're interested in buying a product from National Curriculum
          Development Center, we're happy to help you through the process.
        </p>

        <p className="text-base">
          Firstly, browse through our website to find the product you're
          interested in. You can use the search bar to look for a specific item
          or browse through our categories to find what you need.
        </p>

        <p className="text-base">
          Once you've found the product you want to buy, add it to your cart and
          proceed to checkout. You'll be prompted to enter your shipping and
          billing information, as well as any discount codes you may have.
        </p>

        <p className="text-base">
          After reviewing your order and making sure everything is correct, you
          can complete your purchase by making a payment. We accept various
          payment methods, including credit/debit cards, bank transfers, and
          mobile money.
        </p>

        <p className="text-base">
          Once your payment has been confirmed, we'll process your order. You'll
          receive an email with your order details.
        </p>

        <p className="text-base">
          If you have any questions or concerns about the buying process or our
          products, don't hesitate to contact us. Our customer support team is
          always happy to assist you. Thank you for choosing National Curriculum
          Development Center for your educational needs.
        </p>
      </div>
    </ContentLayout>
  );
};
