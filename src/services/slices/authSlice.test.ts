import reducer, {
  login,
  register,
  fetchUser,
  logout,
  checkAuth,
  updateUser
} from './authSlice';

describe('Тесты для authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };

  it('Обрабатывает login.pending (начало авторизации)', () => {
    const action = { type: login.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('Обрабатывает login.fulfilled (успешная авторизация)', () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const action = { type: login.fulfilled.type, payload: user };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user
    });
  });

  it('Обрабатывает login.rejected (ошибка авторизации)', () => {
    const action = {
      type: login.rejected.type,
      payload: 'Invalid credentials'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Invalid credentials'
    });
  });

  it('Обрабатывает register.pending (начало регистрации)', () => {
    const action = { type: register.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('Обрабатывает register.fulfilled (успешная регистрация)', () => {
    const user = { id: 2, name: 'Jane Doe', email: 'jane@example.com' };
    const action = { type: register.fulfilled.type, payload: user };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user
    });
  });

  it('Обрабатывает register.rejected (ошибка регистрации)', () => {
    const action = {
      type: register.rejected.type,
      payload: 'Email already exists'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Email already exists'
    });
  });

  it('Обрабатывает fetchUser.pending (начало запроса пользователя)', () => {
    const action = { type: fetchUser.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Обрабатывает fetchUser.fulfilled (успешный запрос пользователя)', () => {
    const user = { id: 3, name: 'Sam Smith', email: 'sam@example.com' };
    const action = { type: fetchUser.fulfilled.type, payload: user };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user
    });
  });

  it('Обрабатывает fetchUser.rejected (ошибка запроса пользователя)', () => {
    const action = {
      type: fetchUser.rejected.type,
      payload: 'Failed to fetch user'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: false,
      user: null
    });
  });

  it('Обрабатывает logout.fulfilled (успешный выход из системы)', () => {
    const action = { type: logout.fulfilled.type };
    const state = reducer(
      {
        ...initialState,
        isAuthenticated: true,
        user: { email: 'tom@example.com', name: 'Tom' }
      },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null
    });
  });

  it('Обрабатывает checkAuth.pending (начало проверки авторизации)', () => {
    const action = { type: checkAuth.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Обрабатывает checkAuth.fulfilled (успешная проверка авторизации)', () => {
    const user = { name: 'Eve', email: 'eve@example.com' };
    const action = { type: checkAuth.fulfilled.type, payload: user };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user
    });
  });

  it('Обрабатывает checkAuth.rejected (ошибка проверки авторизации)', () => {
    const action = {
      type: checkAuth.rejected.type,
      payload: 'Authentication error'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: false,
      user: null
    });
  });

  it('Обрабатывает updateUser.pending (начало обновления пользователя)', () => {
    const action = { type: updateUser.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('Обрабатывает updateUser.fulfilled (успешное обновление пользователя)', () => {
    const updatedUser = { email: 'updated@example.com', name: 'Updated Name' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = reducer(
      {
        ...initialState,
        user: { email: 'old@example.com', name: 'Old Name' },
        isAuthenticated: true
      },
      action
    );
    expect(state).toEqual({
      ...initialState,
      user: updatedUser,
      isAuthenticated: true,
      isLoading: false
    });
  });

  it('Обрабатывает updateUser.rejected (ошибка обновления пользователя)', () => {
    const action = {
      type: updateUser.rejected.type,
      payload: 'Ошибка обновления данных'
    };
    const state = reducer(
      {
        ...initialState,
        user: { email: 'old@example.com', name: 'Old Name' },
        isAuthenticated: true
      },
      action
    );
    expect(state).toEqual({
      ...initialState,
      user: { email: 'old@example.com', name: 'Old Name' },
      isAuthenticated: true,
      isLoading: false,
      error: 'Ошибка обновления данных'
    });
  });
});
