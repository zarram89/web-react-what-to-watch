import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
