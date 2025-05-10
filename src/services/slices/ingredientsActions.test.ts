import reducer, { fetchIngredients } from './inrgedientsActions';

describe('Тесты для ingredientsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('Обрабатывает fetchIngredients.pending (начало загрузки ингредиентов)', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('Обрабатывает fetchIngredients.fulfilled (успешная загрузка ингредиентов)', () => {
    const payload = [
      { id: '1', name: 'Bun', type: 'bun', price: 1 },
      { id: '2', name: 'Patty', type: 'main', price: 5 }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      items: payload
    });
  });

  it('Обрабатывает fetchIngredients.rejected (ошибка загрузки ингредиентов)', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки ингредиентов'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });
});
