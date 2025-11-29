import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
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
      <BrowserRouter>
        <App
          promoFilmTitle={Setting.promoFilmTitle}
          promoFilmGenre={Setting.promoFilmGenre}
          promoFilmYear={Setting.promoFilmYear}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
