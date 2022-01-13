import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchProducts as fetchProductsAPI,
    addProduct as addProductAPI,
    updateProduct as updateProductAPI,
    deleteProduct as deleteProductAPI
} from 'api/products';

const initialState = {
    isLoading: false,
    productList: []
}

export const fetchProducts = createAsyncThunk(
    'FETCH_PRODUCT',
    async () => {
        const response = await fetchProductsAPI();
        return response.data
    }
)

export const addProduct = createAsyncThunk(
    'ADD_PRODUCT',
    async (data) => {
        const response = await addProductAPI(data);
        return response.data;
    }
)

export const updateProduct = createAsyncThunk(
    'UPDATE_PRODUCT',
    async (data) => {
        const response = await updateProductAPI(data);
        return response.data;
    }
)

export const deleteProduct = createAsyncThunk(
    'DELETE_PRODUCT',
    async (id) => {
        const response = await deleteProductAPI({
            id: id
        });
        return response.data;
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload;
        });

        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList.push(action.payload);
        });

        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = state.productList.map((productItem) => {
                if(productItem.id == action.payload.id)
                    productItem = action.payload;
                    
                return productItem;
            });
        })

        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = state.productList.filter((productItem) => {
                return productItem.id != action.payload.id;
            });
        })
    }
});


export const selectProductList = (state) => state.product.productList;
export const selectIsLoading = (state) => state.product.isLoading;

export const productReducer = productSlice.reducer
