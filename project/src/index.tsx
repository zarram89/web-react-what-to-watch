import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { films } from './mocks/films';
import { store } from './store';

const Setting = {
  promoFilmTitle: 'The Grand Budapest Hotel',
  promoFilmGenre: 'Drama',
  promoFilmYear: 2014,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        promoFilmTitle={Setting.promoFilmTitle}
        promoFilmGenre={Setting.promoFilmGenre}
        promoFilmYear={Setting.promoFilmYear}
        films={films}
      />
    </Provider>
  </React.StrictMode>
);
