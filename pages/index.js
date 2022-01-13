import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import AddProduct from 'components/add-product';
import ProductList from 'components/product-list';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
    selectIsLoading,
    selectProductList,
    fetchProducts
} from 'slices/product-slice';

export default function Home() {
    const isLoading = useAppSelector(selectIsLoading);
    const productList = useAppSelector(selectProductList);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Sample CRUD</title>
                <meta name="description" content="Sample CRUD created for Github" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>Sample CRUD</h1>
                <ProductList productList={productList} />
                <AddProduct />
            </main>
            <Backdrop open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
