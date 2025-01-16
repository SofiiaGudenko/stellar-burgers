import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppHeaderUI } from '@ui';
import { RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  const userName = isLoading ? 'Загрузка...' : user?.name || 'Личный кабинет';

  return <AppHeaderUI userName={userName} />;
};
