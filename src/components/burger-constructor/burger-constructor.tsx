import { FC, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  updateTotalPrice,
  removeIngredient,
  clearBurgerConstructor
} from '../../services/slices/burgerConstructorSlice';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients, totalPrice } = useSelector(
    (state) => state.burgerConstructor
  );
  const {
    loading: orderRequest,
    error,
    orderData
  } = useSelector((state) => state.order);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleRemoveIngredient = (index: number) => {
    dispatch(removeIngredient(index));
    dispatch(updateTotalPrice());
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearBurgerConstructor());
      })
      .catch((error) => {
        console.error('Ошибка при создании заказа:', error);
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  useEffect(() => {
    dispatch(updateTotalPrice());
  }, [bun, ingredients, dispatch]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
