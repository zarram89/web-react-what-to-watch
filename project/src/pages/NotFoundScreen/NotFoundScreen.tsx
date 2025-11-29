import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
      </header>

      <div className="user-page__content">
        <h1>404 Not Found</h1>
        <Link to="/">Go to main page</Link>
      </div>
    </section>
  );
}

export default NotFoundScreen;
