import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Visa } from "./Visa";
import { MobileMoney } from "./MobileMoney";
import { ManualBank } from "./ManualBank";

const tabOptions = [
  { key: "mobileMoney", labelKey: "payment.method.mobileMoney" },
  { key: "visa", labelKey: "payment.method.visa" },
  { key: "manualBank", labelKey: "payment.method.manualBank" },
];

export const PaymentMethods = ({ orderId, order }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("mobileMoney");

  const renderTabContent = () => {
    switch (activeTab) {
      case "visa":
        return <Visa orderId={orderId} />;
      case "manualBank":
        return <ManualBank order={order} />;
      case "mobileMoney":
      default:
        return <MobileMoney />;
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-100 mb-4">
        <nav className="flex space-x-4" aria-label={t("payment.selectMethod")}>
          {tabOptions.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition ${
                activeTab === tab.key
                  ? "bg-green-100 text-green-600"
                  : "text-gray-500 hover:text-green-600"
              }`}
              aria-selected={activeTab === tab.key}
              role="tab"
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div role="tabpanel" className="p-4 bg-white border border-gray-100 rounded-md">
        {renderTabContent()}
      </div>
    </div>
  );
};
