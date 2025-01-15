import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useParams, useLocation } from 'react-router-dom';
import {
  fetchUserOrders,
  fetchAllOrders
} from '../../services/slices/orderSlice';
import { TIngredient, TOrder } from '@utils-types';
import { Modal } from '../modal/modal';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const isProfileOrder = location.pathname.includes('/profile/orders');

  const orderData: TOrder | undefined = useSelector((state) =>
    state.order.orders.find((order) => order.number === Number(number))
  );
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.items
  );

  useEffect(() => {
    if (!orderData) {
      if (isProfileOrder) {
        dispatch(fetchUserOrders());
      } else {
        dispatch(fetchAllOrders());
      }
    }
  }, [dispatch, orderData, isProfileOrder]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
      status: orderData.status
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
