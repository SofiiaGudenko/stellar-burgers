# Stellar Burgers - React-приложение для заказа бургеров

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

Stellar Burgers - это одностраничное приложение (SPA) для заказа космических бургеров. Приложение позволяет:

- Собирать бургеры перетаскиванием ингредиентов (Drag & Drop)  
- Оформлять заказы  
- Регистрироваться и авторизовываться  
- Просматривать историю заказов

## Технологии

- **React** (функциональные компоненты, хуки)
- **Redux** (управление состоянием приложения)
- **TypeScript** (статическая типизация)
- **React DnD** (реализация Drag & Drop)
- **React Router** (навигация между страницами)
- **WebSocket** (реальное время обновление заказов)
- **Jest + Cypress** (тестирование)

## Установка и запуск

### Требования
- Node.js v16 или выше
- npm v8 или выше

### 1. Клонирование репозитория
```bash
git clone https://github.com/ваш-username/stellar-burgers.git
cd stellar-burgers
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск приложения
#### Режим разработки (с hot-reload):
```bash
npm start
```
Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

#### Production-сборка:
```bash
npm run build
```
Собранные файлы будут в папке `build/`
