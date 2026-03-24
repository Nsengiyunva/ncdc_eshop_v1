import { useAuth } from "lib/auth";
import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

export const updateProfile = ({ data }) => {
  return axios.post(`/profile?_method=PUT`, data);
};

updateProfile.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export const useUpdateProfile = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: "success",
        title: "User Profile Updated Successfully",
      });
      refetchUser();
    },
    ...config,
    mutationFn: updateProfile,
  });
};
