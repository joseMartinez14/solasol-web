import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMyCategories } from '../services/categoryService';

const useAllCompanyCategories = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () =>fetchMyCategories(),
  });
};


export { useAllCompanyCategories};