import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (err) {
    return rejectWithValue('Ошибка при загрузке заказов пользователя');
  }
});

export const fetchAllOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchAllOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await getFeedsApi();
    return response.orders;
  } catch (err) {
    return rejectWithValue('Ошибка при загрузке всех заказов');
  }
});

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('orders/createOrder', async (ingredientIds, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  } catch (err) {
    return rejectWithValue('Ошибка при создании заказа');
  }
});

interface OrderState {
  orders: TOrder[];
  orderData: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  orderData: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при загрузке заказов';
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при загрузке всех заказов';
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при создании заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
