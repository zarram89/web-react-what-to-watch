import { useState, ChangeEvent, FormEvent } from 'react';

type CommentSubmissionFormProps = {
  onSubmit: (rating: number, comment: string) => void;
};

function CommentSubmissionForm({ onSubmit }: CommentSubmissionFormProps): JSX.Element {
  const [rating, setRating] = useState(8);
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(rating, reviewText);
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: 10 }, (_, i) => 10 - i).map((star) => (
              <div key={star} style={{ display: 'contents' }}>
                <input
                  className="rating__input"
                  id={`star-${star}`}
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={handleRatingChange}
                />
                <label className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={reviewText}
            onChange={handleTextChange}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={reviewText.length < 50 || reviewText.length > 400}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentSubmissionForm;
