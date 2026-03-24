import React, { useState } from "react";
import { Lock } from "react-feather";
import { useTranslation } from "react-i18next";
import { Dialog, DialogTitle } from "components/Elements";
import { LoginForm } from "../LoginForm";
import { Register } from "./Register";
import { TwoFAForm } from "../TwoFAForm";

export function Login() {
  const [show, setShow] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTwoFa(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="text-gray-300 py-2 px-2 flex items-center gap-2 rounded-sm hover:underline focus:outline-none text-xs sm:text-sm"
      >
        <Lock size={14} className="text-gray-300" />
        <span>{t("loginRegister")}</span>
      </button>

      <Dialog isOpen={show} onClose={handleClose} initialFocus={null}>
        <div className="inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm w-full sm:p-6">
          <DialogTitle className="text-center text-lg font-semibold text-gray-800 mb-4">
            {t("loginTitle")}
          </DialogTitle>

          {twoFa ? (
            <TwoFAForm onSuccess={handleClose} />
          ) : (
            <LoginForm
              twoFAuth={() => setTwoFa(true)}
              onSuccess={handleClose}
              registerModal={<Register />}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
}
