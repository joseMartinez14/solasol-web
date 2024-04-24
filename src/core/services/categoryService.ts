import api from "../config";
import { CompanyCategory } from "../dtos/Products";

const fetchMyCategories = async () => {
    //SHOULD INCLUDE THE ID. THERE IS NO CASE WHERE I NEED ALL THE PRODUCTS FOR ALL COMPANIES
  return await api
    .get<[CompanyCategory]>('/companyCategory')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {throw err});
};


export { fetchMyCategories};
