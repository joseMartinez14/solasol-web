import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useDeleteProduct } from '../../../core/hooks/ProductHook';
import { useEffect } from 'react';
import LoadingModal from '../../shared/LoadingModal';

interface Column {
    id: number;
    name: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 1, name: 'name', label: 'Nombre', minWidth: 120 },
    { id: 2, name: 'description', label: 'Descripcion', minWidth: 200 },
    { id: 3, name: 'price', label: 'Precio', minWidth: 70 },
    { id: 4, name: 'discount', label: 'Descuento %', minWidth: 50 },
    { id: 5, name: 'stock', label: '# Disponible', minWidth: 50 },
    { id: 6, name: 'currency', label: 'Moneda', minWidth: 50 },
    { id: 7, name: 'update', label: 'Modificar', minWidth: 50 },
    { id: 8, name: 'delete', label: 'Eliminar', minWidth: 50 },
];

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

interface ProductListProps {
    products: Data[];
}


const ProductsTable = (props: ProductListProps) => {

    const { products } = props;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const navigate = useNavigate();
    const { mutate, error, isSuccess, isPending } = useDeleteProduct();

    const Swal = require('sweetalert2')



    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Se elimino el producto",
                showConfirmButton: false,
                timer: 2500
            });
        }
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al eliminar producto.",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, error]);



    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onUpdateClick = (data: Data) => {
        navigate(`/company/product/${data.id}`);
    }

    const onDeleteClick = (data: Data) => {
        mutate(String(data.id));
    }

    return (
        <>
            <LoadingModal open={isPending} />
            <Paper elevation={5} sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow sx={{ backgroundColor: 'lightblue' }}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell > {row.name}</TableCell>
                                            <TableCell > {row.description}</TableCell>
                                            <TableCell > {row.price}</TableCell>
                                            <TableCell > {row.discount}</TableCell>
                                            <TableCell > {row.stock}</TableCell>
                                            <TableCell > {row.currency}</TableCell>
                                            <TableCell >
                                                <Button variant="outlined" onClick={() => { onUpdateClick(row) }}>
                                                    Modificar
                                                </Button>
                                            </TableCell>
                                            <TableCell >
                                                <Button variant="outlined" sx={{ color: 'red', borderColor: 'red' }} onClick={() => { onDeleteClick(row) }}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default ProductsTable;