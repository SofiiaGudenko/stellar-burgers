import reducer, {
  fetchUserOrders,
  fetchAllOrders,
  createOrder,
  clearOrder
} from './orderSlice';

describe('Тесты для orderSlice', () => {
  const initialState = {
    orders: [],
    orderData: null,
    loading: false,
    error: null
  };

  it('Обрабатывает fetchUserOrders.pending (начало загрузки заказов пользователя)', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('Обрабатывает fetchUserOrders.fulfilled (успешная загрузка заказов пользователя)', () => {
    const payload = [
      { id: '1', name: 'Order 1' },
      { id: '2', name: 'Order 2' }
    ];
    const action = { type: fetchUserOrders.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      orders: payload
    });
  });

  it('Обрабатывает fetchUserOrders.rejected (ошибка загрузки заказов пользователя)', () => {
    const action = {
      type: fetchUserOrders.rejected.type,
      payload: 'Ошибка при загрузке заказов пользователя'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка при загрузке заказов пользователя'
    });
  });

  it('Обрабатывает fetchAllOrders.pending (начало загрузки всех заказов)', () => {
    const action = { type: fetchAllOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('Обрабатывает fetchAllOrders.fulfilled (успешная загрузка всех заказов)', () => {
    const payload = [
      { id: '3', name: 'Order 3' },
      { id: '4', name: 'Order 4' }
    ];
    const action = { type: fetchAllOrders.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      orders: payload
    });
  });

  it('Обрабатывает fetchAllOrders.rejected (ошибка загрузки всех заказов)', () => {
    const action = {
      type: fetchAllOrders.rejected.type,
      payload: 'Ошибка при загрузке всех заказов'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка при загрузке всех заказов'
    });
  });

  it('Обрабатывает createOrder.pending (начало создания заказа)', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('Обрабатывает createOrder.fulfilled (успешное создание заказа)', () => {
    const payload = { id: '5', name: 'New Order' };
    const action = { type: createOrder.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      orderData: payload
    });
  });

  it('Обрабатывает createOrder.rejected (ошибка создания заказа)', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Ошибка при создании заказа'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка при создании заказа'
    });
  });

  it('Обрабатывает clearOrder (очистка данных заказа)', () => {
    const stateWithOrderData = {
      ...initialState,
      orderData: {
        _id: '6',
        status: 'completed',
        name: 'Old Order',
        createdAt: '2023-01-01T12:00:00.000Z',
        updatedAt: '2023-01-01T12:30:00.000Z',
        number: 12345,
        ingredients: ['ingredient1', 'ingredient2']
      },
      error: 'Какая-то ошибка'
    };

    const action = { type: clearOrder.type };
    const state = reducer(stateWithOrderData, action);

    expect(state).toEqual({
      ...initialState,
      orderData: null,
      error: null
    });
  });
});
