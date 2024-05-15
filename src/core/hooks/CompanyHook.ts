import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMyCompany } from '../services/companyService';

const useMyCompany = () => {
  return useQuery({
    queryKey: ['company'],
    queryFn: () =>fetchMyCompany(),
  });
};


export { useMyCompany};