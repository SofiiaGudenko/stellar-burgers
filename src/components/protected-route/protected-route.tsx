import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyForAuth?: boolean;
  onlyForGuests?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyForAuth = false,
  onlyForGuests = false
}) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (onlyForAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyForGuests && isAuthenticated) {
    return <Navigate to='/profile' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
