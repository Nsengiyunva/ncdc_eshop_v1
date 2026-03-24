import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Layout } from "../components/Layout";
import { RegisterForm } from "../components/RegisterForm";
import { RegisterTin } from "../components/RegisterTin";

export const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (withTIN) => {
    setSelection(withTIN ? "tin" : "basic");
  };

  const handleBack = () => {
    setSelection(null);
  };

  return (
    <div className="">
      <Layout title={t("registerTitle")}>
        <div className="max-w-xl mx-auto">
          <div className="">
            {!selection && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 text-sm text-gray-700"
              >
                <p className="mb-2">{t("tinPrompt")}</p>

                <button
                  onClick={() => handleSelect(true)}
                  className="w-full text-left px-4 py-2 rounded border border-gray-300 bg-gray-50 hover:bg-green-600 hover:text-white hover:border-green-600 transition"
                >
                  {t("iHaveTin")}
                </button>

                <button
                  onClick={() => handleSelect(false)}
                  className="w-full text-left px-4 py-2 rounded border border-gray-300 bg-gray-50 hover:bg-green-600 hover:text-white hover:border-green-600 transition"
                >
                  {t("iDontHaveTin")}
                </button>

                <div className="mt-5 text-xs text-gray-500">
                  <p>{t("legalNotice1")}</p>
                  <p className="mt-2">{t("legalNotice2")}</p>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {selection && (
                <motion.div
                  key={selection}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <button
                    className="text-xs text-gray-600 flex items-center gap-1 hover:text-green-700 mb-4"
                    onClick={handleBack}
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    {t("backToOptions")}
                  </button>

                  {selection === "tin" ? (
                    <RegisterTin />
                  ) : (
                    <RegisterForm
                      onSuccess={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Layout>
    </div>
  );
};
