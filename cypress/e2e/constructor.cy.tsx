describe('Добавление ингредиента из списка ингредиентов в конструктор и открытие модального окна описания ингредиента', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавление ингредиента при нажатии', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]').contains('Булка').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Булка').should('exist');
  });

  it('Открытие модального окна при клике на ингредиент и закрытие его по нажатию на кнопку закрытия', () => {
    cy.get('[data-cy=ingredient-item]').first().click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Должно отображаться название, изображение и состав выбранного ингредиента в модальном окне', () => {
    cy.get('[data-cy=ingredient-item]').first().as('firstIngredient');
    cy.get('@firstIngredient').within(() => {
      cy.get('.text_type_main-default').invoke('text').as('ingredientName');
      cy.get('img').invoke('attr', 'src').as('ingredientImage');
    });
    cy.get('@firstIngredient').click();
    cy.get('[data-cy=modal]').should('be.visible');

    cy.get('@ingredientName').then((ingredientName) => {
      cy.get('[data-cy=ingredient-modal-title]').should(
        'have.text',
        ingredientName
      );
    });

    cy.get('@ingredientImage').then((ingredientImage) => {
      const expectedLargeImage = ingredientImage.replace('.png', '-large.png');
      cy.get('[data-cy=ingredient-modal-image]').should(
        'have.attr',
        'src',
        expectedLargeImage
      );
    });

    cy.get('[data-cy=ingredient-calories]').should('have.text', '420');
    cy.get('[data-cy=ingredient-proteins]').should('have.text', '80');
    cy.get('[data-cy=ingredient-fat]').should('have.text', '24');
    cy.get('[data-cy=ingredient-carbohydrates]').should('have.text', '53');
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Процесс создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Должен добавить ингредиенты, оформить заказ, показать номер заказа и очистить конструктор', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=place-order-button]').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '3', '1']
      });

    cy.get('[data-cy=order-number]').contains('123456').should('exist');

    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
