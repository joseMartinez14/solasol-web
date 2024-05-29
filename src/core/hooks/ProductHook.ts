import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductsByCompany,
  createOrUpdateProduct,
  fetchProductById,
  deleteProduct,
} from "../services/productsService";
import { createOrUpdateDto } from "../dtos/Products";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });
};

const useProductsByCompanyID = (company_id: string) => {
  return useQuery({
    queryKey: ["productsByCompany"],
    queryFn: () => fetchProductsByCompany(company_id),
  });
};

const useProductByID = (id: string) => {
  return useQuery({
    queryKey: ["productByID"],
    queryFn: () => fetchProductById(id),
  });
};

const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: createOrUpdateDto) => createOrUpdateProduct(data),
  });
};

const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
};

export {
  useProductByID,
  useProducts,
  useProductsByCompanyID,
  useCreateProduct,
  useDeleteProduct,
};
