import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentSubmissionForm from './CommentSubmissionForm';

describe('CommentSubmissionForm component', () => {
  it('should render form fields correctly', () => {
    const mockOnSubmit = jest.fn();

    render(<CommentSubmissionForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Post' })).toBeInTheDocument();
  });

  it('should update textarea value on user input', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    render(<CommentSubmissionForm onSubmit={mockOnSubmit} />);

    const textarea = screen.getByPlaceholderText('Review text');
    await user.type(textarea, 'This is a test review');

    expect(textarea).toHaveValue('This is a test review');
  });

  it('should disable submit button when review text is too short', () => {
    const mockOnSubmit = jest.fn();

    render(<CommentSubmissionForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: 'Post' });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when review text length is valid', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    render(<CommentSubmissionForm onSubmit={mockOnSubmit} />);

    const textarea = screen.getByPlaceholderText('Review text');
    const validText = 'A'.repeat(50); // Minimum 50 characters
    await user.click(textarea);
    await user.paste(validText);

    const submitButton = screen.getByRole('button', { name: 'Post' });
    expect(submitButton).toBeEnabled();
  });

  it('should disable submit button when review text is too long', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    render(<CommentSubmissionForm onSubmit={mockOnSubmit} />);

    const textarea = screen.getByPlaceholderText('Review text');
    const tooLongText = 'A'.repeat(401); // More than 400 characters
    await user.click(textarea);
    await user.paste(tooLongText);

    const submitButton = screen.getByRole('button', { name: 'Post' });
    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit with rating and text when form is submitted', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    render(<CommentSubmissionForm onSubmit={mockOnSubmit} />);

    const textarea = screen.getByPlaceholderText('Review text');
    const validText = 'A'.repeat(50);
    await user.type(textarea, validText);

    const submitButton = screen.getByRole('button', { name: 'Post' });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(8, validText);
  });

  it('should update rating when user selects different star', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    render(<CommentSubmissionForm onSubmit={mockOnSubmit} />);

    const star5Input = screen.getByLabelText('Rating 5');
    await user.click(star5Input);

    const textarea = screen.getByPlaceholderText('Review text');
    const validText = 'A'.repeat(50);
    await user.type(textarea, validText);

    const submitButton = screen.getByRole('button', { name: 'Post' });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(5, validText);
  });
});
