import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

export const forgotPassword = ({ email }) => {
  return axios.post(`/forgot-password`, email);
};

forgotPassword.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export const useForgotPassword = ({ config } = {}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { addNotification } = useNotificationStore();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries("forgotPassword");
      addNotification({
        type: "success",
        title:
          "You requested to reset your password. Check your email for instructions.",
      });
    },
    ...config,
    mutationFn: forgotPassword,
  });
};
