import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

const Setting = {
  PromoFilmTitle: 'The Grand Budapest Hotel',
  PromoFilmGenre: 'Drama',
  PromoFilmYear: 2014,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      promoFilmTitle={Setting.PromoFilmTitle}
      promoFilmGenre={Setting.PromoFilmGenre}
      promoFilmYear={Setting.PromoFilmYear}
    />
  </React.StrictMode>,
);
