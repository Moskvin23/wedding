# Wedding Invitation SPA

Односторінковий сайт-запрошення на весілля на `React + Vite` з адаптивною версткою для desktop і mobile.

## Запуск

```bash
npm install
npm run dev
```

## Збірка

```bash
npm run build
npm run preview
```

## Структура

- `src/App.jsx` — композиція сторінки із секцій.
- `src/components/` — окремі перевикористовувані компоненти секцій.
- `src/data/weddingData.js` — весь контент (імена, дата, розклад, дрескод, контакти RSVP).
- `src/App.css` і `src/index.css` — стилі та адаптив.

## Що змінювати під ваш макет

1. Замінити тексти і дані у `src/data/weddingData.js`.
2. За потреби підкоригувати відступи/кольори у `src/App.css`.
3. Додати ваші реальні фото/декор елементи у `src/assets` і підключити в компонентах.
