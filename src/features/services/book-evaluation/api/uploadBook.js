import { axios } from 'lib/axios';
import { useNotificationStore } from 'stores/notifications';
import { useMutation } from 'react-query';

export const uploadBook = ({ data }) => {
	return axios.post('evaluation', data);
};

export const useUploadBook = ({ config } = {}) => {
	const { addNotification } = useNotificationStore();

	return useMutation({
		onError: () => {
			addNotification({
				type: 'error',
				title: 'Error occured while uploading book',
			});
		},
		onSuccess: () => {
			addNotification({
				type: 'success',
				title: 'Book uploaded',
			});
		},
		...config,
		mutationFn: uploadBook,
	});
};
