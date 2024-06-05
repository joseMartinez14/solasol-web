import { useQuery } from "@tanstack/react-query";
import { fetchAllCompanies, fetchMyCompany } from "../services/companyService";

const useMyCompany = () => {
  return useQuery({
    queryKey: ["company"],
    queryFn: () => fetchMyCompany(),
  });
};

const useAllCompanies = () => {
  return useQuery({
    queryKey: ["company"],
    queryFn: () => fetchAllCompanies(),
  });
};

export { useMyCompany, useAllCompanies };
