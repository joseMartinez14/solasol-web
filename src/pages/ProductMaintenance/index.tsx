import { Box, Button, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { useCreateProduct, useProductByID } from "../../core/hooks/ProductHook";
import { useEffect, useMemo, useState } from "react";
import { CompanyCategory } from "../../core/dtos/Products";
import { useNavigate, useParams } from "react-router-dom";
import { ProductMaintenanceForm } from "./type";
import { useForm } from "react-hook-form";
import DropdownInput from "../../components/shared/DropdownInput";
import TextInput from "../../components/shared/TextInput";
import ProductItem from "../../components/catalog/productList/productItem";
import InsertImages from "../../components/catalog/insertImages";
import ManageCategories from "../../components/catalog/manageCategories";
import { useAllCompanyCategories } from "../../core/hooks/CategoryHook";
import LoadingModal from "../../components/shared/LoadingModal";

interface ImageItem {
    id: number;
    url: string;
    file?: File;
}

interface Data {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    created_at?: Date;
    updated_at?: Date;
    currency: string;
}

const ProductMaintenance = () => {

    const navigate = useNavigate();
    const [imageList, setImageList] = useState<ImageItem[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<ImageItem[]>([]);
    const [categoryList, setcategoryList] = useState<CompanyCategory[]>([]);
    const [categoriesToDelete, setcategoriesToDelete] = useState<CompanyCategory[]>([]);
    //const [allCategories, setallCategories] = useState<CompanyCategory[]>([]); // Esto es un use Product by id
    const { product_id } = useParams();

    const { data: product, isLoading: productsLoading, error: productError } = useProductByID(product_id || '-1');
    const { data: allCategories, isLoading: categoriesLoading, error: categoriesError } = useAllCompanyCategories();

    const Swal = require('sweetalert2')

    useEffect(() => {
        if (categoriesError) {
            navigate("/signin");
        }

    }, [categoriesError]);

    const { mutate, data: createProductReturn, error, isSuccess, isPending } = useCreateProduct();

    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Se guardo el producto",
                showConfirmButton: false,
                timer: 2500
            });
        }
    }, [isSuccess]);

    useEffect((() => {
        if (createProductReturn) {
            console.log(createProductReturn);
        }
    }), [createProductReturn]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<ProductMaintenanceForm>({
        defaultValues: {
            id: -1,
            name: '',
            description: '',
            price: '',
            discount: '',
            stock: '',
            currency: 'Colones',
        },
    });

    const formData = watch();


    useEffect(() => {
        console.log("This is the product: ", product);
        if (product) {
            setValue('id', product.id);
            setValue('name', product.name);
            setValue('description', product.description);
            setValue('price', String(product.price));
            setValue('discount', String(product.discount));
            setValue('stock', String(product.stock));
            setValue('currency', product.currency);

            if (product.productImages) {
                setImageList([...product.productImages]);
            }

            if (product.categories) {
                setcategoryList([...product.categories]);
            }
        }
    }, [product]);

    //setValue('number_of_passengers', passengerNumber[0]);

    const selectCategory = (category: CompanyCategory) => {
        setcategoryList([...categoryList, category])
    };

    const deleteCategory = (id: number) => {
        if (id > 0) {
            const item = categoryList.find(item => item.id === id);
            if (item) {
                setcategoriesToDelete([...categoriesToDelete, item]);
            }
        }
        // Update the categoryList state
        const updatedCategoryList = categoryList.filter(item => item.id !== id);
        setcategoryList(updatedCategoryList);
    };

    const onSubmit = (data: ProductMaintenanceForm) => {
        console.log("Estoy en onsubmit", data);
        const newImagelist = imageList.filter(obj => obj.id < 0);
        const oldImagelist = imageList.filter(obj => obj.id > 0);
        const structure_data = {
            id: data.id,
            name: data.name,
            description: data.description,
            price: Number(data.price),
            currency: data.currency,
            discount: Number(data.discount),
            stock: Number(data.stock),
            productNewImages: newImagelist.map(obj => obj.file!),
            oldImagesIDs: oldImagelist.map(obj => obj.id),
            addCategories: categoryList.map(obj => obj.name),
            deleteCategories: categoriesToDelete.map(obj => obj.name)
        };
        console.log("structured data")
        console.log(structure_data)
        mutate(structure_data);
    };

    const OnImageDelete = (imageID: number) => {
        if (imageID > 0) {
            const item = imageList.find(item => item.id === imageID);
            if (item) {
                setImagesToDelete([...imagesToDelete, item]);
            }
        }
        const updatedImageList = imageList.filter((item) => item.id !== imageID);
        setImageList(updatedImageList);
    }

    return (
        <div  >
            <LoadingModal open={(productsLoading || categoriesLoading || isPending)} />
            <Box textAlign="center" pt={4}>
                <Typography variant="h4" sx={{ fontSize: "32px" }}>
                    Agregar/Modificar Producto
                </Typography>
            </Box>
            <Box
                component="form"
                autoComplete="on"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ pt: 0, pb: 0 }}>
                <Grid container spacing={2} sx={{ px: 4, width: "100%" }} >
                    <Grid item md={6} xs={12}>
                        <TextInput
                            control={control}
                            title={"Nombre"}
                            value="name"
                            isRequired={true}
                            styles={{ mb: 3 }}
                            error={errors?.name ? "Inserte el nombre" : undefined}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextInput
                            control={control}
                            title={"Descripcion"}
                            value="description"
                            isRequired={false}
                            styles={{ mb: 3 }}
                            error={errors?.description ? "Inserte la descripcion" : undefined}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextInput
                            control={control}
                            title={"Precio"}
                            value="price"
                            placeholder="Inserte un numero"
                            isRequired={true}
                            styles={{ mb: 3 }}
                            error={errors?.price ? "Inserte el precio" : undefined}
                            justNumber
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextInput
                            control={control}
                            title={"Descuento"}
                            value="discount"
                            placeholder="Inserte un numero"
                            isRequired={false}
                            styles={{ mb: 3 }}
                            error={errors?.discount ? "insert el descuento" : undefined}
                            justNumber
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextInput
                            control={control}
                            title={"Cantidad disponible"}
                            value="stock"
                            placeholder="Inserte un numero"
                            isRequired={true}
                            styles={{ mb: 3 }}
                            error={errors?.stock ? "Hay un error en stock" : undefined}
                            justNumber
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <DropdownInput
                            control={control}
                            title={"Moneda"}
                            /*title={t('myInformation.country')!}*/
                            value="currency"
                            isRequired={true}
                            data={["Colones", "Dolares"]}
                            styles={{ mb: 3 }}
                            error={errors?.currency ? "hay error en moneda" : undefined}
                        />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <ManageCategories allCategories={allCategories || []} selectedCategories={categoryList} selectCategory={selectCategory} deleteCategory={deleteCategory} />
                    </Grid>
                </Grid>
                <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={'center'}>
                    <Button
                        sx={{
                            my: 5,
                            height: 48,
                            fontSize: '16px',
                            fontWeight: 500,
                        }}
                        variant="contained"
                        type="submit">
                        {"Agregar/Modificar Producto"}
                    </Button>
                </Box>
                <Grid container spacing={2} sx={{ px: 4, width: "100%" }}>
                    <Grid item md={6} xs={12} >
                        <Box
                            sx={{
                                width: '100%', // Make the box fill all the width
                                display: 'flex',
                                justifyContent: 'center', // Center items horizontally
                                alignItems: 'center',
                                flexDirection: 'column',
                                pb: 5
                            }}
                        >
                            <Typography variant="h4" sx={{ fontSize: "24px", pb: 4 }}>
                                Preview:
                            </Typography>
                            <ProductItem images={imageList} title={formData.name || ""} subtitle={formData.description || ""} cardHeight={600} cardWidth={350} price={Number(formData.price || "")} stock={Number(formData.stock || "")} discount={Number(formData.discount || "")} currency={formData.currency || ""} whatsapp={product?.company?.phoneNumber} />
                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <Box
                            sx={{
                                width: '80%', // Make the box fill all the width
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                minHeight: '250px',
                                pt: 2
                            }}
                        >
                            <InsertImages imageList={imageList} setImageList={setImageList} onImageDelete={OnImageDelete} />
                        </Box>
                    </Grid>

                </Grid>




            </Box>
        </div >
    )
}

export default ProductMaintenance;

