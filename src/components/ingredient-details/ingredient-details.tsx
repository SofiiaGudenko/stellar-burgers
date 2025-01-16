import { FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector((state) =>
    state.ingredients.items.find((ingredient) => ingredient._id === id)
  );

  const location = useLocation();
  const isModal = !!location.state?.backgroundLocation;

  if (!ingredientData) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <IngredientDetailsUI ingredientData={ingredientData} isModal={isModal} />
  );
};
