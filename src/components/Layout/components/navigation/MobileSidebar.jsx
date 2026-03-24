import React from "react";
import { useAuth } from "lib/auth";
import { Link } from "react-router-dom";
import { useCategories } from "../api/getCategories";
import { Home, Lock } from "react-feather";
import { BsCart2 } from "react-icons/bs";
import { MdFavoriteBorder, MdKeyboardArrowDown } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Drawer } from "components/Elements";

export const MobileSidebar = ({ page, isOpen, onClose }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const categoriesQuery = useCategories();

  return (
    <Drawer
      title={t("navigation.menu")}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      renderFooter={() => null}
    >
      <motion.div
        className="px-2 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Home Link */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-gray-700 text-sm flex items-center gap-2 hover:text-green-600"
          >
            <Home />
            <span>{t("nav.home")}</span>
          </Link>
        </div>

        {/* Authenticated Section */}
        {auth.user ? (
          <>
            <div className="mt-4 space-y-3">
              {/* User dropdown */}
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <div className="h-8 w-8 flex items-center justify-center bg-green-500 text-white rounded-full text-xs font-medium">
                  {auth?.user?.name?.[0]}
                </div>
                <span>{auth.user.name}</span>
                <MdKeyboardArrowDown className="h-5 w-5 text-gray-600" />
              </div>

              {/* Account links */}
              <div className="space-y-2 pl-6">
                <Link
                  to="/profile"
                  className="block text-sm hover:text-green-600"
                >
                  {t("account.myAccount")}
                </Link>
                <Link
                  to="/wishlist"
                  className="block text-sm hover:text-green-600"
                >
                  {t("account.wishlist")}
                </Link>
                <Link
                  to="/profile/orders"
                  className="block text-sm hover:text-green-600"
                >
                  {t("account.orders")}
                </Link>
                <button
                  onClick={() => {
                    auth.logout();
                    onClose();
                  }}
                  className="block text-left w-full text-sm text-red-500 hover:text-red-700"
                >
                  {t("account.signOut")}
                </button>
              </div>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist">
              <div className="text-sm text-gray-700 py-2 flex items-center gap-2">
                <MdFavoriteBorder className="text-xl" />
                <span>{t("account.wishlist")}</span>
              </div>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <div className="text-sm text-gray-700 py-2 flex items-center gap-2">
                <BsCart2 className="text-xl" />
                <span>{t("account.cart")}</span>
              </div>
            </Link>
          </>
        ) : (
          <Link to="/auth/login">
            <div className="text-gray-700 py-2 flex items-center text-sm gap-2">
              <Lock className="text-xl" />
              <span>{t("auth.loginRegister")}</span>
            </div>
          </Link>
        )}

        {/* Services and Categories */}
        <div className="mt-6 text-sm text-gray-700">
          <Header title={t("services.title")} />
          <Link to="/services/bids" className="block mb-2 hover:text-green-600">
            {t("services.bids")}
          </Link>
          <Link
            to="/services/book-evaluation"
            className="block hover:text-green-600 mb-6"
          >
            {t("services.bookEvaluation")}
          </Link>
          <div className="">
            <Header title={t("categories")} />
          </div>
          {categoriesQuery?.data?.map((category, index) => (
            <Link
              key={index}
              to={`/categories/${category.slug}`}
              className="block mb-2 hover:text-green-600"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </Drawer>
  );
};

const Header = ({ title }) => (
  <div className="px-4 mb-2 flex justify-between items-center">
    <h2 className="uppercase text-xs font-bold tracking-wide text-gray-700">
      {title}
    </h2>
    <div className="flex gap-1">
      <div className="w-3 h-1 rounded-full bg-green-600" />
      <div className="w-1 h-1 rounded-full bg-gray-400" />
      <div className="w-1 h-1 rounded-full bg-gray-400" />
    </div>
  </div>
);
