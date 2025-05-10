import { rootReducer } from './store';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);

    expect(initialState).toEqual({
      ingredients: {
        items: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        totalPrice: 0
      },
      auth: {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      },
      order: {
        orders: [],
        orderData: null,
        loading: false,
        error: null
      },
      feeds: {
        orders: [],
        isLoading: false,
        error: null,
        total: 0,
        totalToday: 0
      }
    });
  });
});
