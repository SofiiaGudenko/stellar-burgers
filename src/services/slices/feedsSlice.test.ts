import reducer, { fetchFeeds } from './feedsSlice';

describe('Тесты для feedsSlice', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: null,
    total: 0,
    totalToday: 0
  };

  it('Обрабатывает fetchFeeds.pending (начало загрузки)', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('Обрабатывает fetchFeeds.fulfilled (успешная загрузка)', () => {
    const payload = {
      orders: [
        { id: '1', name: 'Burger 1' },
        { id: '2', name: 'Burger 2' }
      ],
      total: 100,
      totalToday: 20
    };
    const action = { type: fetchFeeds.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday
    });
  });

  it('Обрабатывает fetchFeeds.rejected (ошибка загрузки)', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      payload: 'Ошибка загрузки'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
