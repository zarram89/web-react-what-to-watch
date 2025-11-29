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

## Task 9 (module7-task1): Server Integration with Axios

### Description
Подключить проект к серверу, заменить тестовые данные на реальные. Настроить axios для работы с API, интегрировать redux-thunk для асинхронных операций, загружать список фильмов с сервера при старте приложения. Создать компонент спиннера для отображения процесса загрузки.

### Solution
Создал API конфигурацию:
- `services/api.ts` - функция `createAPI()` создаёт экземпляр axios с `baseURL: 'https://10.react.htmlacademy.pro/wtw'` и `timeout: 5000`
- `const/api-routes.ts` - enum с маршрутами API (`APIRoute.Films = '/films'`, и т.д.)

 Обновил Redux store для асинхронных операций:
- `store/index.ts` - импортировал API, настроил middleware thunk с `extraArgument: api`, экспортировал типы `RootState` и `AppDispatch`
- `store/action.ts` - создал асинхронный thunk `fetchFilmsAction` с использованием `createAsyncThunk`, выполняет GET запрос к `/films`
- `store/reducer.ts` - добавил `isLoading: boolean` и `hasError: boolean` в состояние, обработал три состояния thunk: `pending` (isLoading=true), `fulfilled` (сохраняет films, isLoading=false), `rejected` (hasError=true, isLoading=false)

Создал компонент `Spinner`:
- Простой компонент с текстом "Loading..."
- Отображается по центру экрана во время загрузки

Обновил компоненты приложения:
- `App.tsx` - заменил `loadFilms(films)` на `dispatch(fetchFilmsAction())` в useEffect, добавил селектор `isLoading`, отображает `<Spinner />` во время загрузки, использует `useDispatch<AppDispatch>()` для корректной типизации
- `index.tsx` - удалил импорт `films` из mocks, удалил проп `films` из `<App>`
- `MainScreen.tsx` - добавил селектор `hasError`, отображает сообщение об ошибке если сервер недоступен

Удалил файл `mocks/films.ts` - больше не нужен.

При загрузке приложения данные загружаются с сервера. Во время загрузки отображается спиннер. Если сервер недоступен, пользователь видит информационное сообщение об ошибке.

## Task 10 (module7-task2): Authentication System

### Description
Реализовать систему аутентификации пользователей. Добавить поле `authorizationStatus` в глобальное состояние. Реализовать асинхронные действия для проверки авторизации (`checkAuth`), входа (`login`) и выхода (`logout`). Настроить сохранение токена и его отправку с запросами. Обновить компоненты `PrivateRoute`, `MainScreen`, `SignInScreen` для работы с авторизацией.

### Solution
Обновил Redux состояние:
- Добавил `authorizationStatus` (Auth, NoAuth, Unknown) и `user` (данные пользователя) в `store/reducer.ts`
- Создал типы `User` и `AuthData` в `types/user.ts`
- Реализовал асинхронные thunk-действия в `store/action.ts`:
  - `checkAuthAction`: GET /login - проверяет текущий статус
  - `loginAction`: POST /login - выполняет вход, сохраняет токен
  - `logoutAction`: DELETE /logout - выполняет выход, удаляет токен

Реализовал управление токенами в `services/api.ts`:
- Функции `getToken`, `saveToken`, `dropToken` (используют localStorage)
- Добавил interceptor к axios для автоматического добавления заголовка `X-Token` к запросам

Обновил компоненты:
- `PrivateRoute.tsx`: Подключил к Redux, проверяет `authorizationStatus`. Если статус `Unknown`, показывает спиннер. Если `NoAuth`, перенаправляет на `/login`.
- `MainScreen.tsx`: В шапке отображает ссылку "Sign in" для гостей или аватар и кнопку "Sign out" для авторизованных пользователей. Реализовал обработчик выхода.
- `SignInScreen.tsx`: Реализовал форму входа с валидацией (email, пароль без пробелов). При успешном входе перенаправляет на главную.
- `App.tsx`: При монтировании диспатчит `checkAuthAction` для проверки авторизации.

## Task 11 (module7-task3): Film Details and Reviews

### Description
Реализовать получение детальной информации о фильме, похожих фильмах и отзывах. Реализовать отправку отзывов авторизованными пользователями. Обработать ситуацию с несуществующим фильмом (404). Скрыть кнопку "Add review" для гостей.

### Solution
Обновил Redux состояние и действия:
- Добавил поля `film`, `similarFilms`, `reviews`, `isFilmLoading` в `store/reducer.ts`.
- Создал асинхронные действия `fetchFilmAction`, `fetchSimilarFilmsAction`, `fetchReviewsAction`, `postReviewAction` в `store/action.ts`.

Обновил компоненты:
- `MovieScreen.tsx`: Загружает данные фильма по ID из URL. Отображает спиннер при загрузке. Если фильм не найден, перенаправляет на главную (или 404). Кнопка "Add review" скрыта для неавторизованных пользователей.
- `Tabs.tsx` и `TabReviews.tsx`: Обновил табы для отображения списка отзывов.
- `AddReviewScreen.tsx`: Реализовал логику отправки отзыва через `postReviewAction`. При успехе перенаправляет на страницу фильма.
- `CommentSubmissionForm.tsx`: Принимает колбэк `onSubmit` для отправки данных формы.

## Task 12 (module8-task1): Optimization

### Description
Оптимизировать производительность приложения, используя инструменты разработчика React и Redux. Разбить редьюсер на отдельные слайсы. Использовать `React.memo`, `useCallback` и мемоизированные селекторы.

### Solution
1. **Redux Refactoring**:
   - Разделил корневой редьюсер на 4 слайса: `app-process` (жанр), `user-process` (авторизация), `films-data` (список фильмов), `film-data` (детали фильма).
   - Создал `rootReducer` с использованием `combineReducers`.
   - Создал перечисление `NameSpace` для имен слайсов.

2. **Selectors**:
   - Создал файл `store/selectors.ts` с селекторами для всех полей состояния.
   - Реализовал мемоизированный селектор `getFilteredFilms` с помощью `createSelector` для фильтрации фильмов по жанру без лишних вычислений.

3. **Component Optimization**:
   - Обернул компоненты `FilmsList`, `SmallMovieCard`, `GenreList` в `React.memo` для предотвращения лишних ререндеров.
   - Использовал `useCallback` для обработчиков событий в `MainScreen` и `MovieScreen`.
   - Обновил все компоненты (`MainScreen`, `MovieScreen`, `App`, `PrivateRoute`, `AddReviewScreen`) для использования новых селекторов вместо прямого доступа к `state`.

Теперь приложение оптимизировано, состояние структурировано логично, а компоненты ререндерятся только при необходимости.

## Task 13 (module8-task2): Video Player and My List

### Description
Реализовать полноценный видеоплеер с элементами управления и функциональность "Мой список" для добавления фильмов в избранное.

### Solution

1. **Video Player (`PlayerScreen`)**:
   - Реализовал управление воспроизведением (play/pause) с помощью `useRef` и методов видео элемента.
   - Добавил progress bar с возможностью перемотки по клику.
   - Реализовал отображение текущего времени и оставшейся длительности в формате MM:SS.
   - Добавил кнопку fullscreen с использованием браузерного Fullscreen API.
   - Видео автоматически начинает воспроизведение при загрузке страницы.
   - Кнопка Exit возвращает на страницу фильма.

2. **My List Functionality**:
   - **API Integration**: Добавил действия `toggleFavoriteAction` (POST `/favorite/{id}/{status}`) и `fetchFavoriteFilmsAction` (GET `/favorite`).
   - **Redux**: Обновил reducers `films-data` и `film-data` для обработки избранных фильмов. Добавил `favoriteFilms` в state и селекторы `getFavoriteFilms`, `getFavoriteCount`.
   - **MyListButton Component**: Создал переиспользуемый компонент кнопки, который:
     - Показывает "+ MyList" для обычных фильмов и "✓ MyList" для избранных.
     - При клике вызывает `toggleFavoriteAction`.
     - Отображает количество избранных фильмов.
     - Перенаправляет на Sign In, если пользователь не авторизован.

3. **UI Integration**:
   - **MainScreen**: Добавил `MyListButton` для промо-фильма (первый фильм в списке).
   - **MovieScreen**: Добавил `MyListButton` для текущего фильма на странице деталей.
   - **MyListScreen**: Обновил страницу для загрузки и отображения избранных фильмов из Redux вместо фильтрации из всех фильмов.

Теперь приложение имеет полнофункциональный видеоплеер и пользователи могут добавлять/удалять фильмы из избранного.
