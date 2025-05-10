import { TIngredient } from '@utils-types';
import reducer, {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  updateTotalPrice,
  clearBurgerConstructor
} from './burgerConstructorSlice';

describe('Тесты для burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: [],
    totalPrice: 0
  };

  const mockIngredient: TIngredient = {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    price: 50,
    calories: 100,
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    image: 'image.png',
    image_mobile: 'imageMobile.png',
    image_large: 'imageLarge.png'
  };

  it('Обрабатывает setBun (установка булки)', () => {
    const action = setBun(mockIngredient);
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      bun: mockIngredient
    });
  });

  it('Обрабатывает addIngredient (добавление ингредиента)', () => {
    const action = addIngredient(mockIngredient);
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: [mockIngredient]
    });
  });

  it('Обрабатывает removeIngredient (удаление ингредиента)', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockIngredient, mockIngredient]
    };
    const action = removeIngredient(0);
    const state = reducer(stateWithIngredients, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: [mockIngredient]
    });
  });

  it('Обрабатывает moveIngredient (перемещение ингредиента)', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, _id: '1', name: 'Ingredient 1' },
        { ...mockIngredient, _id: '2', name: 'Ingredient 2' }
      ]
    };
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const state = reducer(stateWithIngredients, action);
    expect(state.ingredients).toEqual([
      { ...mockIngredient, _id: '2', name: 'Ingredient 2' },
      { ...mockIngredient, _id: '1', name: 'Ingredient 1' }
    ]);
  });

  it('Обрабатывает updateTotalPrice (обновление общей цены)', () => {
    const stateWithData = {
      ...initialState,
      bun: mockIngredient,
      ingredients: [
        { ...mockIngredient, price: 100 },
        { ...mockIngredient, price: 150 }
      ]
    };
    const action = updateTotalPrice();
    const state = reducer(stateWithData, action);
    expect(state.totalPrice).toEqual(50 * 2 + 100 + 150);
  });

  it('Обрабатывает clearBurgerConstructor (сброс конструктора)', () => {
    const stateWithData = {
      bun: mockIngredient,
      ingredients: [mockIngredient],
      totalPrice: 200
    };
    const action = clearBurgerConstructor();
    const state = reducer(stateWithData, action);
    expect(state).toEqual(initialState);
  });

  // Граничные случаи

  it('Обрабатывает удаление ингредиента из пустого конструктора', () => {
    const action = removeIngredient(0);
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('Обрабатывает перемещение ингредиента с неверными индексами', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, _id: '1', name: 'Ingredient 1' },
        { ...mockIngredient, _id: '2', name: 'Ingredient 2' }
      ]
    };
    const action = moveIngredient({ fromIndex: -1, toIndex: 6 });
    const state = reducer(stateWithIngredients, action);
    expect(state.ingredients).toEqual(stateWithIngredients.ingredients);
  });

  it('Обрабатывает добавление ингредиента в пустой конструктор', () => {
    const action = addIngredient(mockIngredient);
    const state = reducer(initialState, action);
    expect(state.ingredients).toEqual([mockIngredient]);
  });
});
