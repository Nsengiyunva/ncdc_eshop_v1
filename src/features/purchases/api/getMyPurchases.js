import { axios } from 'lib/axios';
import { useQuery } from 'react-query';

export const getMyPurchases = () => {
  return axios.get('/product-attachments/paid/all');
};

export const useMyPurchases = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['mypurchases'],
    queryFn: () => getMyPurchases(),
  });
};
