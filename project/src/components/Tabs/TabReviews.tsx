import { Review } from '../../types/review';

type TabReviewsProps = {
  reviews: Review[];
};

function TabReviews({ reviews }: TabReviewsProps): JSX.Element {
  // Split reviews into two columns
  const midPoint = Math.ceil(reviews.length / 2);
  const leftColumnReviews = reviews.slice(0, midPoint);
  const rightColumnReviews = reviews.slice(midPoint);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const renderReview = (review: Review) => (
    <div className="review" key={review.id}>
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={review.date}>{formatDate(review.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {leftColumnReviews.map(renderReview)}
      </div>
      <div className="film-card__reviews-col">
        {rightColumnReviews.map(renderReview)}
      </div>
    </div>
  );
}

export default TabReviews;
