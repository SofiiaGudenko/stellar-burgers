import { rootReducer } from './store';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);

    expect(initialState).toEqual({
      ingredients: expect.any(Object),
      burgerConstructor: expect.any(Object),
      auth: expect.any(Object),
      order: expect.any(Object),
      feeds: expect.any(Object)
    });
  });
});
