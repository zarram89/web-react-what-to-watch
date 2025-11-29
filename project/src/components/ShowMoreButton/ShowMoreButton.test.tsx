import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMoreButton from './ShowMoreButton';

describe('ShowMoreButton component', () => {
  it('should render correctly', () => {
    const mockOnClick = jest.fn();

    render(<ShowMoreButton onClick={mockOnClick} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should have correct button class', () => {
    const mockOnClick = jest.fn();

    render(<ShowMoreButton onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('catalog__button');
  });

  it('should call onClick handler when button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(<ShowMoreButton onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
