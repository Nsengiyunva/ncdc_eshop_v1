import React, { useEffect, useState } from "react";
import { Navbar, Sidebar, Footer } from "./components";
import Topbar from "./components/navigation/Topbar";
import { MobileSidebar } from "./components/navigation/MobileSidebar";
import { Head } from "components/Head";
import { FiArrowUp } from "react-icons/fi";
import { useAuth } from "lib/auth";
import { useEmailVerify } from "features/account/api/emailVerify";
import { useTranslation } from "react-i18next";

export const MainLayout = ({ page, children, title }) => {
  const auth = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { t, i18n } = useTranslation();

  const verifyEmailMutation = useEmailVerify();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowTopBtn(window.scrollY > 400);
    });
  }, []);

  return (
    <div className="bg-gray-100 relative">
      {/* Scroll to Top Button */}
      {showTopBtn && (
        <div className="fixed right-12 bottom-10 z-20">
          <button
            className="rounded-full shadow-lg bg-green-800 p-3"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FiArrowUp className="text-white h-6 w-auto" />
          </button>
        </div>
      )}

      {/* Page Head */}
      <Head title={title} />

      {/* Topbar and Nav */}
      <Topbar page={page} />

      <Navbar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        page={page}
      />

      {/* Email Verification Banner */}
      {!verifyEmailMutation.isSuccess &&
        auth?.user?.email_verified_at === null && (
          <div
            className="w-5/6 md:w-3/4 mx-auto my-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded shadow text-sm"
            role="alert"
          >
            <div className="flex justify-between flex-col md:flex-row">
              <span>{t("verifyPrompt")}</span>
              <button
                className="underline mt-2 md:mt-0"
                onClick={async () => {
                  await verifyEmailMutation.mutateAsync({
                    email: auth.user.email,
                  });
                }}
              >
                {verifyEmailMutation.isLoading
                  ? t("sendingEmail")
                  : t("clickToVerify")}
              </button>
            </div>
          </div>
        )}

      {/* Main Layout */}
      <main className="max-w-screen-xl lg:mx-auto">
        <div className="mx-5 my-4 grid grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="hidden lg:block">
              <Sidebar />
            </div>

            <MobileSidebar
              page={page}
              isOpen={openSidebar}
              onClose={() => setOpenSidebar(false)}
            />
          </aside>

          <section className="col-span-12 lg:col-span-9">{children}</section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
