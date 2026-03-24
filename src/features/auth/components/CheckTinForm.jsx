import React, { useEffect, useRef, useState } from "react";
import { Form } from "components/Form";
import {
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { z } from "zod";
import { useCheckTIN } from "../api/validateTin";
import { useTranslation } from "react-i18next";

export const CheckTinForm = ({ setDetails }) => {
  const checkTin = useCheckTIN();
  const [tinDigits, setTinDigits] = useState(Array(10).fill(""));
  const inputRefs = useRef([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = z.object({
    tin: z.string().length(10, { message: t("tinMustBe10Digits") }),
  });

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...tinDigits];
    newDigits[index] = value;
    setTinDigits(newDigits);

    if (value && index < 9) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !tinDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const tinValue = tinDigits.join("");
    if (tinValue.length === 10) {
      const details = await checkTin.mutateAsync({ data: { tin: tinValue } });
      setDetails(details);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Form onSubmit={handleSubmit} schema={schema}>
        {() => (
          <div className="flex flex-col items-start space-y-4 w-full">
            {/* Label and Info Icon */}
            <div
              className="relative group"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <label
                htmlFor="tin"
                className="text-base sm:text-lg font-medium text-gray-800 flex items-center gap-2"
              >
                {t("enterTINLabel")}
                <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
              </label>

              {showTooltip && (
                <div
                  id="tin-tooltip"
                  role="tooltip"
                  className="absolute left-0 top-10 z-10 w-64 p-3 text-xs rounded-md bg-gray-800 text-white shadow-lg"
                >
                  {t("tinTooltip")}
                </div>
              )}
            </div>

            {/* TIN Input Boxes */}
            <div className="grid grid-cols-10 gap-2 w-full max-w-md">
              {tinDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`text-center border rounded-md w-8 h-8 sm:w-8 sm:h-8 text-lg sm:text-xl font-bold transition-all ${
                    digit
                      ? "bg-green-600 text-white border-green-700"
                      : "bg-white text-gray-700 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={tinDigits.join("").length !== 10}
              className={`mt-4 w-full flex justify-center items-center py-2 px-4 rounded-full text-white text-sm sm:text-base font-medium transition ${
                tinDigits.join("").length === 10 && !checkTin.isLoading
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {checkTin.isLoading ? (
                <span>{t("verifying")}...</span>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>{t("verifyAndContinue")}</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </div>
              )}
            </button>
          </div>
        )}
      </Form>
    </div>
  );
};
