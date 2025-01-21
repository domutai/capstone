import { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ onClose, onSubmit }) => {
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0); 
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(''); 

  const handleSubmit = async () => {
    const validationErrors = {};
    if (review.length < 10) validationErrors.review = "Review must be at least 10 characters.";
    if (stars === 0) validationErrors.stars = "You must select a star rating.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit({ review_text: review, rating: stars });


    setReview('');
    setStars(0);
    setErrors({});
    setBackendError('');
    onClose();
} catch (error) {
    setBackendError(error.message || 'An unexpected error occurred.');
}
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>How was this club?</h2>
        {/* Show backend error if present */}
        {backendError && <p className="backend-error">{backendError}</p>}

        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        {errors.review && <p className="error">{errors.review}</p>}

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={hoveredStars >= star || stars >= star ? 'star filled' : 'star'}
              onClick={() => setStars(star)} 
              onMouseEnter={() => setHoveredStars(star)} 
              onMouseLeave={() => setHoveredStars(0)} 
            >
              ★
            </span>
          ))}
        </div>
        {errors.stars && <p className="error">{errors.stars}</p>}

        <button
          className="submit-review-btn"
          disabled={review.length < 10 || stars === 0}
          onClick={handleSubmit}
        >
          Submit Your Review
        </button>
        <button className="close-modal-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ReviewModal;
