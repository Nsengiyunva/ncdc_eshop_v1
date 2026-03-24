import React, { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { Mail, Globe, AlertTriangle } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDeviceInfo } from "hooks/useDeviceInfo";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar() {
  const { t, i18n } = useTranslation();
  const { deviceType, browser, os } = useDeviceInfo();
  const [showNotice, setShowNotice] = useState(false);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const isCompact =
    deviceType === "mobile" || browser === "Opera Mini" || os === "Android";

  useEffect(() => {
    const toggleNotice = () => {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 20000); // Auto-hide after 7 seconds
    };

    // Initial trigger
    toggleNotice();

    const interval = setInterval(() => {
      toggleNotice();
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {/* {showNotice && process.env.REACT_APP_SERVICE_NOTICE && (
          <motion.div
            key="service-notice"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-3 text-sm shadow-md flex items-center justify-center gap-2 fixed top-0 w-full z-50"
          >
            <AlertTriangle size={18} className="animate-pulse" />
            <div className="">
              <strong>Service Notice!</strong>
              <br />
              <span>{process.env.REACT_APP_SERVICE_NOTICE}</span>
            </div>
          </motion.div>
        )} */}
      </AnimatePresence>

      <div className="text-white text-[11px] sm:text-xs bg-gradient-to-t from-gray-900 to-[#008000] shadow-md">
        <div className="max-w-screen-xl md:mx-auto px-3 py-2 flex flex-col md:flex-row items-center md:justify-between gap-2 sm:gap-4">
          {/* Contact Info */}
          <div
            className={`flex ${
              isCompact ? "flex-col gap-1" : "flex-row gap-4"
            }`}
          >
            <a
              href="tel:+256393112088"
              className="flex items-center gap-1 hover:underline"
            >
              <FiPhoneCall
                className="text-white text-sm sm:text-base"
                size={12}
              />
              <span>{t("contactUs")}: +256-393-112-088</span>
            </a>
            <a
              href="mailto:marketing@ncdc.go.ug"
              className="flex items-center gap-1 hover:underline"
            >
              <Mail className="text-white text-sm sm:text-base" size={12} />
              <span>{t("emailUs")}: marketing@ncdc.go.ug</span>
            </a>
          </div>

          {/* Language Selector */}
          <div className="flex bg-gray-900 px-1 rounded-md items-center">
            <Globe className="text-white" size={14} />
            <label htmlFor="language" className="sr-only">
              {t("selectLanguage")}
            </label>
            <select
              id="language"
              onChange={handleLanguageChange}
              value={i18n.language}
              className="bg-gray-900 text-gray-100 w-fit text-[11px] sm:text-sm rounded px-1.5 py-0.5 focus:outline-none"
              aria-label={t("selectLanguage")}
            >
              <option value="en">{t("english")}</option>
              <option value="sw">{t("swahili")}</option>
              <option value="lg">{t("luganda")}</option>
              <option value="rn">{t("runyankole")}</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
