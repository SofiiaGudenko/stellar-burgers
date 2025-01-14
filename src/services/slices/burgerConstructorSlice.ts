import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface BurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  totalPrice: number;
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const ingredient = state.ingredients[fromIndex];
      state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, ingredient);
    },

    updateTotalPrice(state) {
      const bunPrice = state.bun ? state.bun.price * 2 : 0;
      const ingredientsPrice = state.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      );
      state.totalPrice = bunPrice + ingredientsPrice;
    },

    clearBurgerConstructor(state) {
      state.bun = null;
      state.ingredients = [];
      state.totalPrice = 0;
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  updateTotalPrice,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
