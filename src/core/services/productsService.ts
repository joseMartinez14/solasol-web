
import api from '../config';
import { Product, createOrUpdateDto } from '../dtos/Products';

const fetchProducts = async () => {
    //SHOULD INCLUDE THE ID. THERE IS NO CASE WHERE I NEED ALL THE PRODUCTS FOR ALL COMPANIES
  return await api
    .get<[Product]>('/products')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {throw err});
};


const fetchProductsByCompany = async (company_id: string) => {
    //SHOULD INCLUDE THE ID. THERE IS NO CASE WHERE I NEED ALL THE PRODUCTS FOR ALL COMPANIES
  return await api
    .get<[Product]>(`/products/client/${company_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {throw err});
};

const fetchProductById = async (id: string) => {
    //SHOULD INCLUDE THE ID. THERE IS NO CASE WHERE I NEED ALL THE PRODUCTS FOR ALL COMPANIES
    console.log("Me cago en la putaa")
    return await api
    .get<Product>(`/products/${id}`)
    .then((res) => {
      console.log("Resultado de fetchProductById: ");
      console.log(res)
      return res.data;
    })
    .catch((err) => {
      console.log("MIerdaaaaaaa");
      throw err});
};

const createOrUpdateProduct = async (data: createOrUpdateDto) => {
  console.log("on createOrUpdateProduct **");

  const formData = new FormData();
  formData.append('id', String(data.id));
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', String(data.price));
  formData.append('currency', String(data.currency));
  formData.append('discount', String(data.discount));
  formData.append('stock', String(data.stock));
  //formData.append('productNewImages', data.productNewImages[0]);


  if(data.productNewImages){ 
    data.productNewImages.forEach((file, index) => {
      formData.append(`productNewImages`, file);
    });
  }

  if(data.productImagesIDToDelete){ 
    data.productImagesIDToDelete.forEach((id, index) => {
      formData.append(`productImagesIDToDelete`, String(id));
    });
  }

  if(data.addCategories){ 
    data.addCategories.forEach((category, index) => {
      formData.append(`addCategories`, category);
    });
  }

  if(data.deleteCategories){ 
    const categories = Array.isArray(data.deleteCategories) ? data.deleteCategories : [data.deleteCategories];
    data.deleteCategories.forEach((category, index) => {
      formData.append(`deleteCategories`, category);
    });
  }

  console.log("This is the form data");
  console.log(formData);

  return await api
    .post<Product>(`/products`, formData, {headers: { "Content-Type": "multipart/form-data" },})
    .then((res)=>{
      console.log("createOrUpdateProduct si paso y funciono");
      console.log(res);
    })
    .catch((err)=>{
      console.log("createOrUpdateProduct no funciono y fallo");
      console.log(err);
    })
};

export { fetchProducts, fetchProductsByCompany, createOrUpdateProduct, fetchProductById};