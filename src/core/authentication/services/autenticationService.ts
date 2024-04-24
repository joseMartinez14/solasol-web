
import api from '../../config';
import { User, findOrCreateDto } from '../dtos/Users';

const findOrCreateUser = async (formData: findOrCreateDto) => {
    //SHOULD INCLUDE THE ID. THERE IS NO CASE WHERE I NEED ALL THE PRODUCTS FOR ALL COMPANIES
  return await api
    .post<[User]>('/users', formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
        console.error(err);
        return null
    });
};

export { findOrCreateUser };

