import SmallMovieCard from '../../components/SmallMovieCard/SmallMovieCard';

function MyListScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link" href="index.html">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <SmallMovieCard title="Fantastic Beasts: The Crimes of Grindelwald" posterPath="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" />
          <SmallMovieCard title="Bohemian Rhapsody" posterPath="img/bohemian-rhapsody.jpg" />
          <SmallMovieCard title="Macbeth" posterPath="img/macbeth.jpg" />
          <SmallMovieCard title="Aviator" posterPath="img/aviator.jpg" />
          <SmallMovieCard title="We need to talk about Kevin" posterPath="img/we-need-to-talk-about-kevin.jpg" />
          <SmallMovieCard title="What We Do in the Shadows" posterPath="img/what-we-do-in-the-shadows.jpg" />
          <SmallMovieCard title="Revenant" posterPath="img/revenant.jpg" />
          <SmallMovieCard title="Johnny English" posterPath="img/johnny-english.jpg" />
          <SmallMovieCard title="Shutter Island" posterPath="img/shutter-island.jpg" />
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListScreen;
