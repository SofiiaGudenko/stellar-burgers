import React, { FC } from 'react';
import styles from './profile-menu.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../../services/store';
import { logout } from '../../../services/slices/authSlice';
import { ProfileMenuUIProps } from './type';

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({ pathname }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <NavLink
        to={'/profile'}
        className={({ isActive }) =>
          `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
            styles.link
          } ${isActive ? styles.link_active : ''}`
        }
        end
      >
        Профиль
      </NavLink>
      <NavLink
        to={'/profile/orders'}
        className={({ isActive }) =>
          `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
            styles.link
          } ${isActive ? styles.link_active : ''}`
        }
      >
        История заказов
      </NavLink>
      <button
        className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.button}`}
        onClick={handleLogout}
      >
        Выход
      </button>
      <p className='pt-20 text text_type_main-default text_color_inactive'>
        {pathname === '/profile'
          ? 'В этом разделе вы можете изменить свои персональные данные'
          : 'В этом разделе вы можете просмотреть свою историю заказов'}
      </p>
    </>
  );
};
