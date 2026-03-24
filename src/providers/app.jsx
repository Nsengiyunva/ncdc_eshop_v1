/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */
import { CoolSpinner } from "components/Elements";
import { Notifications } from "components/Notifications/Notifications";
import { AuthProvider } from "lib/auth";
import { queryClient } from "lib/react-query";
import * as React from "react";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Maintenance } from "features/misc";
import Swal from "sweetalert2";
import { ErrorFallback } from "./ErrorFallback";



const handleNetworkError = (error) => {
  if (!navigator.onLine || error.message === "Network Error") {
    toast.error("Network failure, please check your internet connection.");
    return true;
  }
  return false;
};

export const AppProvider = ({ children }) => {
  // useEffect(() => {
  //   const preventRightClick = (e) => {
  //     e.preventDefault();
  //   };

  //   // Disable right-click
  //   window.addEventListener("contextmenu", preventRightClick);

  //   return () => {
  //     window.removeEventListener("contextmenu", preventRightClick);
  //   };
  // }, []);

  useEffect(() => {
    const blockDevToolsShortcuts = (e) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        Swal.fire({
          icon: "warning", // Adds a relevant warning icon
          title: "Action Restricted",
          text: "Developer tools are disabled for security reasons. Please contact support if you need assistance.",
          timer: 4000, // Keeps the message brief and user-focused
          timerProgressBar: true, // Adds a visual progress bar for better user experience
        });
      }
    };

    window.addEventListener("keydown", blockDevToolsShortcuts);

    return () => {
      window.removeEventListener("keydown", blockDevToolsShortcuts);
    };
  }, []);

  return (
    <React.Suspense
      fallback={
        <div className="fixed w-full h-full bg-white flex justify-center items-center">
          <CoolSpinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
              <Notifications />
              <Router>
                {children}
                <ToastContainer />
              </Router>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
