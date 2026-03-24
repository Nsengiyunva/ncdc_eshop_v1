import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "..";
import Topbar from "../navigation/Topbar";
import { MobileSidebar } from "../navigation/MobileSidebar";
import { FiArrowUp } from "react-icons/fi";

export const ContentLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <div>
      {/* Scroll to top */}
      {showTopBtn && (
        <div className="fixed right-12 bottom-10 z-20">
          <button
            className="rounded-md bg-green-800 px-4 py-4"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FiArrowUp className="text-white h-8 w-auto" />
          </button>
        </div>
      )}
      <Topbar />
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="max-w-screen-xl lg:mx-auto">
        <div className="mx-5 my-4 h-fit lg:gap-8">
          <div className="">
            <div
              className={`${
                openSidebar ? "w-5/6 flex" : "w-0 hidden"
              } absolute duration-300 backdrop-blur-md bg-white/80 flex w-5/6 h-screen -my-4 `}
            >
              <div
                className={`text-black origin-left font-medium text-xl duration-300 w-fit ${
                  !openSidebar && "scale-0"
                }`}
              >
                <MobileSidebar />
              </div>
            </div>
          </div>
          <div className="px-12 md:w-4/6 mx-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
