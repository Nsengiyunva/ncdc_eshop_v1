import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";

export const CommonTopics = () => {
  const { t } = useTranslation();

  const topics = [
    {
      header: t("helpCenter.categories.account"),
      questions: [
        {
          q: t("helpCenter.questions.createAccount"),
          a: t("helpCenter.answers.createAccount"),
        },
        {
          q: t("helpCenter.questions.resetPassword"),
          a: t("helpCenter.answers.resetPassword"),
        },
        {
          q: t("helpCenter.questions.verifyEmail"),
          a: t("helpCenter.answers.verifyEmail"),
        },
      ],
    },
    {
      header: t("helpCenter.categories.orders"),
      questions: [
        {
          q: t("helpCenter.questions.trackOrder"),
          a: t("helpCenter.answers.trackOrder"),
        },
        {
          q: t("helpCenter.questions.refund"),
          a: t("helpCenter.answers.refund"),
        },
        {
          q: t("helpCenter.questions.cancelOrder"),
          a: t("helpCenter.answers.cancelOrder"),
        },
      ],
    },
    {
      header: t("helpCenter.categories.payments"),
      questions: [
        {
          q: t("helpCenter.questions.generatePRN"),
          a: t("helpCenter.answers.generatePRN"),
        },
        {
          q: t("helpCenter.questions.paymentFailed"),
          a: t("helpCenter.answers.paymentFailed"),
        },
        {
          q: t("helpCenter.questions.invoice"),
          a: t("helpCenter.answers.invoice"),
        },
      ],
    },
  ];

  return (
    <section aria-labelledby="common-topics" className="mt-10">
      <h2
        id="common-topics"
        className="text-xl font-semibold text-gray-900 mb-6"
      >
        {t("helpCenter.sections.categories")}
      </h2>

      <div className="space-y-8">
        {topics.map((topic, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <h3 className="text-lg font-bold text-green-700 mb-4">
              {topic.header}
            </h3>
            <div className="divide-y divide-gray-200">
              {topic.questions.map((item, i) => (
                <Disclosure key={i} as="div" className="py-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full text-left text-sm font-medium text-gray-800 hover:text-green-600 focus:outline-none">
                        <span>{item.q}</span>
                        <ChevronDownIcon
                          className={`h-5 w-5 transform transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 pl-2 text-sm text-gray-600">
                        {item.a}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
