import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "components/Layout";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "react-feather";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { Contact } from "../components/Contact";

export const HelpCenter = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const routes = [
    { path: "/help-center", name: t("helpCenter.title") },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const helpTopics = [
    {
      category: t("helpCenter.categories.account"),
      items: [
        t("helpCenter.questions.createAccount"),
        t("helpCenter.questions.resetPassword"),
        t("helpCenter.questions.verifyEmail"),
      ],
    },
    {
      category: t("helpCenter.categories.orders"),
      items: [
        t("helpCenter.questions.trackOrder"),
        t("helpCenter.questions.refund"),
        t("helpCenter.questions.cancelOrder"),
      ],
    },
    {
      category: t("helpCenter.categories.payments"),
      items: [
        t("helpCenter.questions.generatePRN"),
        t("helpCenter.questions.paymentFailed"),
        t("helpCenter.questions.invoice"),
      ],
    },
  ];

  const filteredTopics = helpTopics
    .map((section) => ({
      ...section,
      items: section.items.filter((q) =>
        q.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <MainLayout page={t("helpCenter.title")}>
      <Breadcrumbs routes={routes} />

      <section
        role="main"
        aria-labelledby="page-title"
        className="relative w-full px-4 py-8 bg-white text-gray-800"
      >
        <h1 id="page-title" className="text-2xl font-bold mb-4">
          {t("helpCenter.heading")}
        </h1>
        <p className="text-gray-600 mb-6 max-w-2xl">
          {t("helpCenter.intro")}
        </p>

        {/* Search Input */}
        <div className="relative z-30 mb-12">
          <div className="max-w-3xl mx-auto relative">
            <label htmlFor="search" className="sr-only">
              {t("helpCenter.search")}
            </label>
            <div className="flex items-center border-b border-gray-300 focus-within:border-green-600">
              <Search className="mr-2 text-gray-500" />
              <input
                id="search"
                type="text"
                role="searchbox"
                placeholder={t("helpCenter.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full py-2 px-2 text-gray-800 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Overlay when focused */}
          <AnimatePresence>
            {focused && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Filtered Results */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-lg shadow-lg p-6 z-40 relative"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {t("helpCenter.results")}
            </h2>
            <div className="space-y-6">
              {filteredTopics.map((section, index) => (
                <div key={index}>
                  <h3 className="text-md font-bold text-green-700 mb-2">
                    {section.category}
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {section.items.map((item, i) => (
                      <li key={i} className="hover:text-green-600 cursor-pointer">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Help Sections */}
        <div className="max-w-4xl mx-auto mt-10 space-y-12">
          {/* Categories (Accordions) */}
          <section aria-labelledby="categories-heading">
            <h2
              id="categories-heading"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              {t("helpCenter.sections.categories")}
            </h2>

            <div className="divide-y divide-gray-200 border rounded-lg">
              {helpTopics.map((section, index) => (
                <Disclosure key={index} as="div" className="px-4 py-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="w-full flex justify-between items-center text-left text-green-700 font-medium focus:outline-none">
                        <span>{section.category}</span>
                        <ChevronDownIcon
                          className={`h-5 w-5 transform transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-3 pl-4 text-gray-700 text-sm">
                        <ul className="list-disc list-inside space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </section>

          {/* System Notices */}
          <section aria-labelledby="status-heading">
            <h2
              id="status-heading"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              {t("helpCenter.sections.status")}
            </h2>
            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg border border-blue-200">
              <p className="mb-2">{t("helpCenter.systemStatus")}</p>
              <Link
                to="/system-status"
                className="text-blue-700 underline font-medium hover:text-blue-900"
              >
                {t("helpCenter.viewSystemStatus")}
              </Link>
            </div>
          </section>

          {/* Contact CTA */}
          <section aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              {t("helpCenter.sections.contact")}
            </h2>
            <div className="bg-green-50 border border-green-200 text-green-900 p-6 rounded-lg">
              <p className="mb-3">{t("helpCenter.stillNeedHelp")}</p>
              <Contact />
            </div>
          </section>
        </div>
      </section>
    </MainLayout>
  );
};
