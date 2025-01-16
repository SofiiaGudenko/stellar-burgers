import { FC, useEffect, useState, ChangeEvent, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchUser, updateUser } from '../../services/slices/authSlice';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    } else {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      const updatedForm = { ...prev, [name]: value };
      setIsFormChanged(
        updatedForm.name !== user?.name ||
          updatedForm.email !== user?.email ||
          updatedForm.password !== ''
      );
      return updatedForm;
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser({ name: formValue.name, email: formValue.email }));
    setIsFormChanged(false);
    setFormValue((prev) => ({ ...prev, password: '' }));
  };

  const handleCancel = () => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
      setIsFormChanged(false);
    }
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
    />
  );
};
