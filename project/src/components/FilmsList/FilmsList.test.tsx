import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FilmsList from './FilmsList';
import { makeFakeFilms } from '../../utils/test-utils';

describe('FilmsList component', () => {
  it('should render correctly with films', () => {
    const fakeFilms = makeFakeFilms(3);

    render(
      <BrowserRouter>
        <FilmsList films={fakeFilms} />
      </BrowserRouter>
    );

    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('should render empty list when no films provided', () => {
    render(
      <BrowserRouter>
        <FilmsList films={[]} />
      </BrowserRouter>
    );

    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
