import { useEffect } from "react";
import { AppProvider } from "./providers/app";
import { AppRoutes } from "./routes";
import Swal from "sweetalert2";

function App() {

  // if (process.env.REACT_APP_NODE_ENV === 'production') {
  //   console.log = function() {};
  //   console.warn = function() {};
  //   console.error = function() {};
  // }

  
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

  // useEffect(() => {
  //   const blockDevToolsShortcuts = (e) => {
  //     if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
  //       e.preventDefault();
  //       Swal.fire({
  //         title: "Oops",
  //         text: "Sorry, developer tools are disabled by system admin.",
  //         timer: 4000,
  //       });
  //     }
  //   };

  //   window.addEventListener("keydown", blockDevToolsShortcuts);

  //   return () => {
  //     window.removeEventListener("keydown", blockDevToolsShortcuts);
  //   };
  // }, []);

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
