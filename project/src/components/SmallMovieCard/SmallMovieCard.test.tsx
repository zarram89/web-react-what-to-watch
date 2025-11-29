import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SmallMovieCard from './SmallMovieCard';
import { makeFakeFilm } from '../../utils/test-utils';

describe('SmallMovieCard component', () => {
  it('should render correctly with film data', () => {
    const fakeFilm = makeFakeFilm();

    render(
      <MemoryRouter>
        <SmallMovieCard film={fakeFilm} />
      </MemoryRouter>
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });
});
