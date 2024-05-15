import { Company } from "../authentication/dtos/Users";
import api from "../config";
import { CompanyCategory } from "../dtos/Products";

const fetchMyCompany = async () => {
    //SHOULD INCLUDE THE ID. THERE IS NO CASE WHERE I NEED ALL THE PRODUCTS FOR ALL COMPANIES
  return await api
    .get<[Company]>('/company')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {throw err});
};


export { fetchMyCompany};
