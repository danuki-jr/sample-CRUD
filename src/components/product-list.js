import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ProductUpdateModal from 'components/product-update-modal';

import { useAppDispatch } from 'app/hooks';
import { useState } from 'react';

import {
    updateProduct,
    deleteProduct
} from 'slices/product-slice';

export default function ProductList( {productList} ) {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productItem, setProductItem] = useState({
        id: 0,
        name: '',
        product: ''
    });

    const onUpdateClicked = (data) => {
        setProductItem(data);
        setIsModalOpen(true);
    }

    const onHandleModalClose = () => {
        setIsModalOpen(false);
    }

    const onHandleModalSubmit = () => {
        dispatch(updateProduct(productItem));
        setIsModalOpen(false);
    }

    const onDeleteClicked = (id) => {
        dispatch(deleteProduct(id));
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            productList.length == 0 ? (
                                <TableRow>
                                    <TableCell>No data found.</TableCell>
                                </TableRow>
                            ): (
                                <>
                                    {
                                        productList.map((productItem, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{productItem.id}</TableCell>
                                                    <TableCell>{productItem.name}</TableCell>
                                                    <TableCell>{productItem.description}</TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" onClick={() => onUpdateClicked(productItem)} sx={{marginRight: "1em"}}>Update</Button>
                                                        <Button variant="contained" onClick={() => onDeleteClicked(productItem.id)}>Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <ProductUpdateModal isModalOpen={isModalOpen} onHandleModalClose={onHandleModalClose} onHandleModalSubmit={onHandleModalSubmit} productItem={productItem} setProductItem={setProductItem} />
        </>
    )
}
