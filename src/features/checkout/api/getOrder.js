import { axios } from 'lib/axios';
import { useQuery } from 'react-query';

export const getOrder = async ({ orderId }) => {
	return await axios.get(`/orders/${orderId}`);
};

export const useOrder = ({ orderId, config }) => {
	console.log(orderId);
	return useQuery({
		...config,
		queryKey: ['order', orderId],
		queryFn: () => getOrder({ orderId }),
	});
};
