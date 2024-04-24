import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchProducts, fetchProductsByCompany, createOrUpdateProduct, fetchProductById} from '../services/productsService';
import { createOrUpdateDto, MutationResponse, Product } from '../dtos/Products';
import { AxiosError } from 'axios';

const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });
};

const useProductsByCompanyID = (company_id: string) => {
  return useQuery({
    queryKey: ['productsByCompany'],
    queryFn: () => fetchProductsByCompany(company_id),
  });
};

const useProductByID = (id: string) => {
  return useQuery({
    queryKey: ['productByID'],
    queryFn: () => fetchProductById(id),
  });
};

const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: createOrUpdateDto) => createOrUpdateProduct(data)
  })
}

export { useProductByID, useProducts, useProductsByCompanyID, useCreateProduct };
