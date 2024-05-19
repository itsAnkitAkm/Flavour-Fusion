import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCartItem, addItem, updateItem, deleteItem } from './cartAPI'; // Corrected import for deleteItem

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchCartItemAsync = createAsyncThunk(
  'cart/fetchCartItem',
  async () => {
    const response = await fetchCartItem();
    // console.log(response);
    return response.data.data.Order_Item;
  }
);

export const addItemAsync = createAsyncThunk('cart/addItem', async (item) => {
  console.log(item);
  const newitem = { "Order_id":item._id, "quantity": 1 };
  console.log(newitem);
  const response = await addItem(newitem);
  return response.data.data;
});

export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (item) => {
    const response = await updateItem(item.id, item);
    return response.data.data;
  }
);

export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItem',
  async (id) => {
    await deleteItem(id);
    return id;
  }
);
export const resetCartAsync = createAsyncThunk('cart/resetCart', async () => {
  const response = await fetchCartItem();
  const items = response.data.data;
  for (let item of items) {
    await deleteItem(item.id);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[];
      });
  },
});

export const cartItem = (state) => state.cart.items;

export default cartSlice.reducer;
