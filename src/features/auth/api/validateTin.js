import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const checkTIN = ({ data }) => {
  // return axios.post("validate-tin", data);
  return axios.get( `https://api.itco.go.ug/api/auth/tin_registration_details/${data?.tin}` )
};

export const useCheckTIN = ({ config } = {}) => {
  
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
        addNotification({
            type: "success",
            title: "Nice. Your Tin is Valid",
        });
    },
    ...config,
    mutationFn: checkTIN,
  })
}
