import React, { FC, memo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';

interface Props extends IngredientDetailsUIProps {
  isModal?: boolean;
}

export const IngredientDetailsUI: FC<Props> = memo(
  ({ ingredientData, isModal = false }) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientData;

    return (
      <div className={styles.content}>
        {!isModal && (
          <h2 className='text text_type_main-large'>Детали ингредиента</h2>
        )}
        <img
          className={styles.img}
          alt='изображение ингредиента.'
          src={image_large}
          data-cy='ingredient-modal-image'
        />
        <h3
          className='text text_type_main-medium mt-2 mb-4'
          data-cy='ingredient-modal-title'
        >
          {name}
        </h3>
        <ul className={`${styles.nutritional_values} text_type_main-default`}>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Калории, ккал</p>
            <p
              className={`text text_type_digits-default`}
              data-cy='ingredient-calories'
            >
              {calories}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Белки, г</p>
            <p
              className={`text text_type_digits-default`}
              data-cy='ingredient-proteins'
            >
              {proteins}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Жиры, г</p>
            <p
              className={`text text_type_digits-default`}
              data-cy='ingredient-fat'
            >
              {fat}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Углеводы, г</p>
            <p
              className={`text text_type_digits-default`}
              data-cy='ingredient-carbohydrates'
            >
              {carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    );
  }
);
