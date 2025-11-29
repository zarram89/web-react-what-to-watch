import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SmallMovieCard from './SmallMovieCard';
import { makeFakeFilm } from '../../utils/test-utils';

describe('SmallMovieCard component', () => {
  it('should render correctly with film data', () => {
    const fakeFilm = makeFakeFilm();

    render(
      <BrowserRouter>
        <SmallMovieCard film={fakeFilm} />
      </BrowserRouter>
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });

  it('should render film poster image', () => {
    const fakeFilm = makeFakeFilm();

    render(
      <BrowserRouter>
        <SmallMovieCard film={fakeFilm} />
      </BrowserRouter>
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', fakeFilm.previewImage);
    expect(image).toHaveAttribute('alt', fakeFilm.name);
  });
});
