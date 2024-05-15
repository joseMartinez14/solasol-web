import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCategoriesByCompanyID, fetchMyCategories } from '../services/categoryService';

const useAllCompanyCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>fetchMyCategories(),
  });
};

const useCategoriesByCompanyID = (id: string) => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>fetchCategoriesByCompanyID(id),
  });
};


export { useAllCompanyCategories, useCategoriesByCompanyID};