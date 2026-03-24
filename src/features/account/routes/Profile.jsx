import { Spinner } from "components/Elements";
import { MainLayout } from "components/Layout";
import { useAuth } from "lib/auth";
import { useState, useEffect } from "react";
import { useUpdateProfile } from "features/auth/api/updateUser";
import { useOrders } from "../api/getOrders";
import { useCartItems } from "features/cart/api/getCartItems";
import { useWishlist } from "features/wishlist/api/getWishlist";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();
  const ordersQuery = useOrders();
  const wishlistQuery = useWishlist();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [tin, setTIN] = useState(user?.tin || "");
  const [phone_number, setPhone_number] = useState(user?.phone_number || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title={t("accountOverview")}>
      <div className="bg-white shadow rounded-xl p-5 mt-4 md:mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            {t("accountOverview")}
          </h1>
          <button
            className="text-sm font-medium text-green-700 hover:text-green-800 mt-2 md:mt-0"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            {t("editProfile")}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Personal Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h2 className="text-md font-semibold text-gray-700">{t("personalDetails")}</h2>
            <p><span className="font-semibold">{t("name")}:</span> {user?.name}</p>
            <p><span className="font-semibold">{t("email")}:</span> {user?.email}</p>
            <p><span className="font-semibold">{t("phone")}:</span> {user?.phone_number}</p>
            <p><span className="font-semibold">{t("tin")}:</span> {user?.tin || t("notProvided")}</p>
          </div>

          {/* Transactions */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h2 className="text-md font-semibold text-gray-700">{t("transactionSummary")}</h2>
            <div className="flex justify-between">
              <span className="font-semibold">{t("orders")}</span>
              <span>{ordersQuery?.data?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">{t("wishlist")}</span>
              <span>{wishlistQuery?.data?.wishlistItems?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade fixed top-0 left-0 w-full h-full outline-none hidden overflow-x-hidden overflow-y-auto"
        id="editModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-lg mx-auto mt-12">
          <div className="modal-content bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="modal-header px-5 py-4 border-b">
              <h5 className="text-lg font-semibold text-gray-800">{t("editProfile")}</h5>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="modal-body p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("name")}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("email")}</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("phone")}</label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="UG"
                  value={phone_number}
                  onChange={(val) => setPhone_number(val)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                {phone_number && !isValidPhoneNumber(phone_number) && (
                  <p className="text-xs text-red-600 mt-1">
                    {t("invalidPhone")}
                  </p>
                )}
              </div>

              <button
                onClick={async () => {
                  await updateProfileMutation.mutateAsync({
                    data: {
                      name,
                      email,
                      phone_number,
                      tin,
                      role: user.role,
                    },
                  });
                }}
                className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-2 rounded-md text-sm"
                data-bs-dismiss="modal"
              >
                {updateProfileMutation.isLoading ? (
                  <Spinner />
                ) : (
                  t("submit")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
