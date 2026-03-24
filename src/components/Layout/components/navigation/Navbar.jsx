import React, { Fragment, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { Archive, ChevronDown, Home, User } from "react-feather";
import { Menu, Transition } from "@headlessui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdFavoriteBorder } from "react-icons/md";
import { BsApp } from "react-icons/bs";
import { useTranslation } from "react-i18next";

import { useAuth } from "lib/auth";
import { useProducts } from "../api/getBooks";
import { Spinner } from "components/Elements";
import { CartItem } from "./components/CartItem";
import { Login } from "features/auth/components/modals";
import { UPLOADS_API_URL } from "config";
import logo from "assets/logo.png";

export const Navbar = ({ openSidebar, setOpenSidebar, page }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [q, setQ] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef(null);

  const productsQuery = useProducts();
  const filteredProducts = productsQuery.data?.filter((row) =>
    row?.slug?.toLowerCase().includes(q.toLowerCase())
  );

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <>
      {/* Overlay */}
      {isSearchFocused && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {
            setIsSearchFocused(false);
            setQ("");
          }}
        />
      )}

      <header className="bg-gray-900 shadow-sm relative z-40">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-2 sm:gap-4">
            {/* Logo and Menu */}
            <div className="flex items-center justify-between w-full sm:flex-row-reverse sm:w-auto">
              {/* Menu Icon (Visible on Mobile) */}
              <div className="flex items-center gap-2 sm:gap-4">
                <HiOutlineMenu
                  className="text-2xl text-gray-700 cursor-pointer sm:hidden"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>

              {/* Logo (Always visible, but appears on left on mobile) */}
              <Link to="/" aria-label={t("home")} className="block sm:mr-4">
                <img
                  src={logo}
                  alt={t("siteLogoAlt")}
                  className="w-28 sm:w-36"
                  loading="lazy"
                />
              </Link>
            </div>

            {/* Search */}
            <div className="w-full sm:flex-1 relative z-50">
              <div className="flex w-full">
                <input
                  type="search"
                  placeholder={`${t("searchPlaceholder")}...`}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  ref={inputRef}
                  className="flex-grow text-xs bg-gray-900 sm:text-sm border border-gray-900 rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-gray-300 placeholder-gray-500 focus:outline-none"
                  aria-label={t("searchPlaceholder")}
                />
              </div>

              {q && (
                <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg max-h-[300px] overflow-y-auto p-4 space-y-2 fade-gradient-mask">
                  {productsQuery.isLoading ? (
                    <div className="text-center py-4">
                      <Spinner />
                    </div>
                  ) : filteredProducts?.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <Link
                        to={`/products/${product.slug}`}
                        key={product.id}
                        className={`flex items-center gap-3 p-2 transition-all duration-300 animate-fade-slide ${
                          index !== filteredProducts.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => {
                          setQ("");
                          setIsSearchFocused(false);
                        }}
                      >
                        <LazyLoadImage
                          src={`${UPLOADS_API_URL}/${product.defaultImage?.name}`}
                          alt={product.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                          effect="blur"
                        />
                        <span className="text-xs sm:text-sm text-gray-800">
                          {product.name}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="text-xs sm:text-sm text-gray-600 py-4 px-2">
                      <p>{t("noResultsFound")}</p>
                      <p className="mt-1">
                        {t("submitRequestMessage")}{" "}
                        <Link to="/contact" className="text-blue-600 underline">
                          {t("contactSupport")}
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User / Nav */}
            <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/"
                className="text-gray-300 text-xs flex flex-row items-center space-x-2 sm:text-sm font-medium"
              >
                <Home size={14} className="mr-2" />
                {t("home")}
              </Link>

              {auth.user ? (
                <>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="flex items-center gap-1 sm:gap-2 text-gray-200 hover:text-green-500 px-2 py-1 text-xs sm:text-sm">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-semibold">
                        {auth.user.name?.charAt(0)}
                      </div>
                      <span>{auth.user.name}</span>
                      <ChevronDown size={14} />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        <div className="py-1 text-xs sm:text-sm">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-green-100" : "",
                                  "flex items-center px-4 py-2 text-gray-700"
                                )}
                              >
                                <User size={14} className="mr-2" />
                                {t("myAccount")}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile/orders"
                                className={classNames(
                                  active ? "bg-green-100" : "",
                                  "flex items-center px-4 py-2 text-gray-700"
                                )}
                              >
                                <Archive size={14} className="mr-2" />
                                {t("orders")}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/purchases"
                                className={classNames(
                                  active ? "bg-green-100" : "",
                                  "flex items-center px-4 py-2 text-gray-700"
                                )}
                              >
                                <BsApp size={14} className="mr-2" />
                                {t("purchases")}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/wishlist"
                                className={classNames(
                                  active ? "bg-green-100" : "",
                                  "flex items-center px-4 py-2 text-gray-700"
                                )}
                              >
                                <MdFavoriteBorder size={14} className="mr-2" />
                                {t("savedItems")}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  auth.logout();
                                  navigate("/");
                                }}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "w-full text-left px-4 py-2 text-gray-700 border-t mt-2"
                                )}
                              >
                                {t("logout")}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Link to="/cart" className="ml-1 sm:ml-2">
                    <CartItem />
                  </Link>
                </>
              ) : (
                <Login />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Styling */}
      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-slide {
          animation: fadeSlide 0.3s ease forwards;
        }

        .fade-gradient-mask {
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0.8)
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0.8)
          );
        }
      `}</style>
    </>
  );
};
