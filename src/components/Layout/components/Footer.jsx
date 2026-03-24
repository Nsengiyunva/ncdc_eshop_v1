import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import shoppingCart from "assets/shopping-cart.png";
import mtn from "assets/mtn.png";
import airtel from "assets/airtel.png";
import visa from "assets/visa.png";
import MinistryOfICTLogo from "assets/integrations/ict.png";
import GTBankLogo from "assets/integrations/gtbank.png";
import NITAULogo from "assets/integrations/nita.png";
import UGHubLogo from "assets/integrations/ughub.png";
import URALogo from "assets/integrations/ura.png";
import { Contact } from "./content/Contact";

export const Footer = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState();
  const navigate = useNavigate();

  const integrationLogos = [
    {
      src: MinistryOfICTLogo,
      alt: "Ministry of ICT",

      link: "https://ict.go.ug",
    },
    { src: GTBankLogo, alt: "GTBank", link: "https://www.gtbank.com.ug/" },
    { src: NITAULogo, alt: "NITA-U", link: "https://www.nita.go.ug" },
    {
      src: UGHubLogo,
      alt: "UGHUB",

      link: "https://demo.nita.go.ug/nita-u-services/egovernment-services/public-private-digital-systems/integration-service-ughub",
    },
    { src: URALogo, alt: "URA", link: "https://www.ura.go.ug" },
  ];

  return (
    <footer className="relative bg-gray-900 text-white text-sm overflow-hidden">
      {/* Motion Mesh Background */}
      <div className="absolute inset-0 bg-gray-900  z-0 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-4 py-10 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-[#008000] font-bold uppercase">
            {t("footer.help")}
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <button
                onClick={() => navigate("/help-center")}
                className="hover:text-[#008000]"
              >
                {t("footer.helpCenter")}
              </button>
            </li>
            <li>
              <Link to="/buy-guide" className="hover:text-[#008000]">
                {t("footer.howToBuy")}
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setModal({ title: t("footer.contact"), body: <Contact /> });
                  setShowModal(true);
                }}
                className="hover:text-[#008000]"
              >
                {t("footer.reportProduct")}
              </button>
            </li>
          </ul>
        </div>


        <div>
          <h2 className="text-[#008000] font-bold uppercase">
            {t("footer.about")}
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/IPR" className="hover:text-[#008000]">
                {t("footer.ipr")}
              </Link>
            </li>
            <li>
              <Link to="/dispute" className="hover:text-[#14a014]">
                {t("footer.dispute")}
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-[#008000]">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link to="/terms-conditions" className="hover:text-[#008000]">
                {t("footer.terms")}
              </Link>
            </li>
          </ul>
        </div>


        <div>
          <h2 className="text-[#008000] font-bold uppercase">
            {t("footer.payments")}
          </h2>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <img
                src={mtn}
                alt="mtn"
                className="w-6 h-6 grayscale hover:grayscale-0 rounded-full"
              />{" "}
              MTN Mobile Money
            </li>
            <li className="flex items-center gap-2">
              <img
                src={airtel}
                alt="airtel"
                className="w-6 grayscale hover:grayscale-0 rounded-full"
              />{" "}
              Airtel Money
            </li>
            <li className="flex items-center gap-2">
              <img
                src={visa}
                alt="visa"
                className="w-6 grayscale hover:grayscale-0 rounded-full"
              />{" "}
              Visa Card
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[#008000] font-bold uppercase">
            {t("footer.follow")}
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://www.facebook.com/NCDCUg/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#008000]"
              >
                <FaFacebookF /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/NCDCUg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#008000]"
              >
                <FaTwitter /> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/c/NCDCUgEduc"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#008000]"
              >
                <FaYoutube /> YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/national-curriculum-development-centre/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#008000]"
              >
                <FaLinkedinIn /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 py-4 border-t border-gray-800 text-center text-xs z-10 relative">
        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          {integrationLogos.map((logo, index) => (
            <a
              href={logo.link}
              key={index}
              className="flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="w-16 h-16 bg-white border border-gray-800  object-contain rounded-full shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
              />
            </a>
          ))}
        </div>
        <p className="text-gray-300">
          © {new Date().getFullYear()} {t("footer.rights")} |{" "}
          <img src={shoppingCart} alt="cart" className="inline w-3 mx-1" />{" "}
          {t("footer.eshopName")} | {t("footer.dataProtection")}
        </p>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white w-5/6 md:w-1/2 lg:w-1/3 rounded shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h4 className="text-lg font-semibold text-gray-800">
                  {modal.title}
                </h4>
                <button onClick={() => setShowModal(false)}>
                  <FiXCircle className="w-6 h-6 text-gray-600 hover:text-[#008000]" />
                </button>
              </div>
              <div className="p-4">{modal.body}</div>
            </div>
          </div>
        </>
      )}
    </footer>
  );
};
