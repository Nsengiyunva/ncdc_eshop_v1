import { axios } from 'lib/axios';
import { useNotificationStore } from 'stores/notifications';
import { useMutation } from 'react-query';
import { queryClient } from 'lib/react-query';

export const generatePRN = ({ data }) => {
	return axios.post('payments/ura/generate-prn', data);
};

export const useGeneratePRN = ({ config } = {}) => {
	const { addNotification } = useNotificationStore();

	return useMutation({
		
		onSuccess: (data) => {
			queryClient.invalidateQueries("order");
			localStorage.removeItem('totalCost');
			localStorage.removeItem('gtp_pay_url');
			addNotification({
				type: 'success',
				title: 'PRN has been generated',
			});
			return data;
		},
		...config,
		mutationFn: generatePRN,
	});
};
