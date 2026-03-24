import { Dialog, DialogTitle } from "components/Elements";
import React from "react";
import { LoginForm } from "../LoginForm";
import { Lock } from "react-feather";
import { RegisterForm } from "../RegisterForm";

export function Register() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="font-medium text-green-600 hover:text-green-500"
      >
        Create new account
      </button>

      <Dialog isOpen={show} onClose={handleClose} initialFocus={null}>
        <div className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <DialogTitle className="text-xl text-center font-bold mb-4">
            Register new account
          </DialogTitle>
          <>
            <RegisterForm onSuccess={handleClose} />
          </>
        </div>
      </Dialog>
    </div>
  );
}
