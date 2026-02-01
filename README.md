# React

Современный проект на базе React, использующий последние технологии и инструменты фронтенда для создания адаптивных веб-приложений.

##  Особенности

- **React 18** - версия React с улучшенным рендерингом и возможностями параллельной работы
- **Vite** - сверхбыстрый инструмент сборки и dev-сервер
- **Redux Toolkit** - управление состоянием с упрощённой настройкой Redux
- **TailwindCSS** - CSS-фреймворк с утилитарным подходом и возможностью глубокой кастомизации
- **React Router v6** - декларативная маршрутизация для React-приложений
- **Визуализация данных** - интеграция D3.js и Recharts для мощной визуализации данных
- **Управление формами** - React Hook Form для удобной работы с формами
- **Анимация** - Framer Motion для плавных UI-анимаций
- **Тестирование** - Jest и React Testing Library

##  Требования

- Node.js (v14.x или выше)
- npm или yarn

## Установка

1. Установить зависимости:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Запустить dev-сервер:
   ```bash
   npm start
   # or
   yarn start
   ```

##  Структура проекта

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## Добавление маршрутов

Чтобы добавить новые маршруты в приложение, обновите файл `Routes.jsx`:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## Стилизация

Проект использует Tailwind CSS для стилизации. Конфигурация включает:

- Плагин Forms для стилизации форм
- Плагин Typography для текста
- Плагин Aspect Ratio для адаптивных элементов
- Container queries для адаптивного дизайна отдельных компонентов
- Fluid typography для адаптивного текста
- Утилиты для анимаций

## Адаптивный дизайн

Приложение построено с адаптивным дизайном с использованием брейкпоинтов Tailwind CSS.


## Деплоймент

Собрать приложение для продакшена:

```bash
npm run build
```


