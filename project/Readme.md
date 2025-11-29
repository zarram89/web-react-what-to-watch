# Руководство по работе с проектом

Данный проект создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## Структура проекта

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`, `package.json`._

---

### public

Директория для размещения статичных ресурсов (шрифты, стили, изображения и так далее). Корневая директория проекта.

**Обратите внимание**, файл `Readme.md`, в директории `public`, содержит описание подготовительного процесса, который вам необходимо выполнить перед тем, как приступать к работе над проектом.

### src

В директории размещаются исходный код проекта: компоненты, файлы с тестами, модули и так далее. Структура директории `src` может быть произвольной.

## Сценарии

После создания проекта вам доступны следующие сценарии. Обратите внимание, для запуска сценария, вы должны находится в директории проекта (`./project`).

### Запуск проекта

```bash
npm start
```

После запуска, приложение доступно для просмотра в браузере по адресу [http://localhost:3000](http://localhost:3000).

При сохранении изменений, проект перезапускается и обновляется в браузере. Таким образом, вы можете следить за разработкой проекта в режиме реального времени.

**Обратите внимание**, режим разработки настроен таким образом, при котором ошибки, найденные статическим анализатором кода **ESLint**, отображаются в той же вкладке браузера, в которой запущен проект.

### Запуск тестов

```bash
npm test
```

Запуск тестов приложения в интерактивном режиме.

В данном случае, имеются в виду тесты, которые вынесены в отдельные файлы, в имени которых присутствует суффикс `*.test.*`. Например, `app.test.tsx`.

Подробную информацию вы можете найти на странице [Запуск тестов](https://facebook.github.io/create-react-app/docs/running-tests).

### Проверка линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Анализ кода производится только в файлах, которые находятся в директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

### Сборка проекта

```bash
npm run build
```

Запуск сборки приложения.

В процессе сборки приложения, код приложения оптимизируется и минимизируется, для достижения наилучшей производительности.

Во время выполнения инструкций по сборке проекта, в корне проекта создается директория `build`, в которую будут помещены результирующие файлы. После сборки проект готов к публикации.

Подробную информацию вы можете найти на странице [Развертывание проекта](https://facebook.github.io/create-react-app/docs/deployment).

### Извлечение конфигурации проекта

```bash
npm run eject
```

**Обратите внимание**, при запуске команды `npm run eject` нет возможности вернуть внесённые изменения обратно!

Выполнение данной команды, `react-scripts` скопирует все конфигурационные файлы и скрипты в корень проекта. Данный процесс позволяет получить полный контроль над конфигурацией проекта.

Не используйте данную команду, если не уверены как именно она работает или к какому результату приведёт ее выполнение.


## Task 4: Implement Mock Data

### Description
Implement mock data for films and integrate it into the application. Create a `Film` type, populate `src/mocks/films.ts` with 8 film objects, update components to use this mock data, and ensure correct data flow and rendering.

### Solution
Created `src/types/film.ts` and `src/mocks/films.ts`. Updated `App`, `MainScreen`, `FilmsList`, `SmallMovieCard`, `MovieScreen`, `MyListScreen`, `AddReviewScreen`, and `PlayerScreen` to use the mock data. Implemented routing and navigation between pages.

## Task 5 (module5-task1): Video Player Component

### Description
Implement a video player component that activates after hovering over a film card for 1 second. The video player should:
- Replace the static image with a video preview
- Play the video without sound (muted)
- Stop playback and return to the static image when the cursor leaves
- Restart playback from the beginning on subsequent hovers

### Solution
Created a new `VideoPlayer` component that uses the `<video>` element with `muted` attribute. The component accepts `src`, `poster`, and `isPlaying` props and uses `useRef` to control the video element and `useEffect` to manage playback based on the `isPlaying` state.

Updated `SmallMovieCard` to include hover logic using `useState` to track video playback state and `useRef` to store the hover timer. Implemented `onMouseEnter` handler that sets a 1-second timeout before starting video, and `onMouseLeave` handler that clears the timeout and stops playback.

Simplified `FilmsList` by removing placeholder mouse handlers, as the hover logic is now self-contained within `SmallMovieCard`.

## Task 6 (module5-task2): Tabs Component and Similar Films

### Description
Создать компонент «Табы» для отображения информации о фильме на трех вкладках: «Overview», «Details» и «Reviews». При клике на таб отображается соответствующий набор информации. Также реализовать блок «More like this» с четырьмя похожими фильмами (определяются по жанру).

### Solution
Создал три компонента для содержимого вкладок:
- `TabOverview` - отображает рейтинг фильма с уровнем оценки (расчитывается на основе числового рейтинга), количество оценок, описание фильма, режиссера и актеров
- `TabDetails` - отображает детальную информацию: режиссер, актеры (каждый с новой строки), длительность (форматируется как часы и минуты), жанр и год выпуска
- `TabReviews` - placeholder для будущей реализации отзывов

Создал основной компонент `Tabs`, который управляет состоянием активной вкладки с помощью `useState`, отрисовывает навигацию по вкладкам и отображает соответствующий контент в зависимости от выбранной вкладки. Использован enum `TabType` для типобезопасности.

Обновил `MovieScreen`, заменив статичную разметку вкладок на компонент `Tabs`. Блок «More like this» уже был реализован ранее - он фильтрует фильмы по жанру и ограничивает вывод четырьмя фильмами с использованием компонента `FilmsList`.

## Task 7 (module6-task1): Redux State Management

### Description
Интегрировать Redux для управления состоянием приложения. Создать глобальное хранилище для хранения общего состояния: текущий жанр (для фильтров) и список фильмов. Реализовать фильтрацию фильмов по жанрам с помощью Redux.

### Solution
Создал структуру Redux store:
- `store/action.ts` - действия `changeGenre` и `loadFilms` с использованием `createAction` из Redux Toolkit
- `store/reducer.ts` - редьюсер с начальным состоянием (genre: 'All genres', films: []) и обработчиками действий с использованием `createReducer`
- `store/index.ts` - конфигурация хранилища с помощью `configureStore` и экспорт типов TypeScript (`RootState`, `AppDispatch`)
- `store/utils.ts` - вспомогательные функции `getFilmsByGenre` (фильтрация фильмов) и `getUniqueGenres` (извлечение уникальных жанров)

Создал компонент `GenreList`, который:
- Получает список фильмов и текущий жанр через props
- Извлекает уникальные жанры из списка фильмов
- Всегда включает "All genres" первым в списке
- Отправляет действие `changeGenre` при клике на жанр
- Подсвечивает активный жанр

Интегрировал Redux в приложение:
- Обернул `<App>` в `<Provider store={store}>` в `index.tsx`
- Добавил `useEffect` в `App.tsx` для отправки действия `loadFilms` при монтировании компонента
- Обновил `MainScreen`: удалил prop `films`, использовал `useSelector` для получения фильмов и текущего жанра из Redux, применил фильтрацию через `getFilmsByGenre`
- Заменил статичный список жанров на компонент `GenreList`

При загрузке приложения автоматически устанавливается фильтр "All genres", отображающий все фильмы. При выборе конкретного жанра отображаются только соответствующие фильмы.

## Task 8 (module6-task2): Show More Button

### Description
Доработать компонент «Список фильмов» на главной странице, добавив пагинацию. После загрузки приложения или смены фильтра по жанру должно отображаться не больше 8 карточек. Создать компонент кнопки «Show more», которая показывает ещё 8 карточек (или оставшиеся, если их меньше). Кнопка должна скрываться после вывода всех карточек. При переходе между страницами счётчик сбрасывается.

### Solution
Создал компонент `ShowMoreButton`:
- Принимает `onClick` handler через props
- Рендерит кнопку с классами `catalog__more` и `catalog__button`
- Простой презентационный компонент без собственного состояния

Доработал `MainScreen` с логикой пагинации:
- Определил константу `FILMS_PER_STEP = 8` для количества фильмов на шаг
- Добавил `useState(FILMS_PER_STEP)` для отслеживания количества показанных фильмов
- Добавил `useEffect` с зависимостью от `currentGenre` для сброса счётчика при смене жанра
- Создал функцию `handleShowMore`, которая увеличивает счётчик на 8
- Вычислил `filmsToShow = filteredFilms.slice(0, shownFilmsCount)` для ограничения отображаемых фильмов
- Вычислил `hasMoreFilms = shownFilmsCount < filteredFilms.length` для определения видимости кнопки
- Заменил статичную кнопку на условный рендеринг `{hasMoreFilms && <ShowMoreButton onClick={handleShowMore} />}`

При загрузке приложения отображается максимум 8 фильмов. При клике на "Show more" показывается ещё 8 фильмов. Кнопка автоматически скрывается когда все фильмы отображены. При смене жанра счётчик сбрасывается на 8. При переходе на другие страницы и возврате компонент размонтируется и монтируется заново, что автоматически сбрасывает состояние.
