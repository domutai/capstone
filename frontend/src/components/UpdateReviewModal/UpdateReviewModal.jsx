// import { useState } from 'react';
// import '../ReviewModal/index';

// const UpdateReviewModal = ({ onClose, onUpdate, initialReview, initialStars, spotName }) => {
//   const [review, setReview] = useState(initialReview);
//   const [stars, setStars] = useState(initialStars);
//   const [hoveredStars, setHoveredStars] = useState(0); // Hover functionality
//   const [errors, setErrors] = useState({});
//   const [backendError, setBackendError] = useState(''); // Backend error state

//   const handleSubmit = async () => {
//     const validationErrors = {};
//     if (review.length < 10) validationErrors.review = "Review must be at least 10 characters.";
//     if (stars === 0) validationErrors.stars = "You must select a star rating.";

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       // Pass the updated review and stars back to the parent component
//       await onUpdate({ review, stars });

//       // Reset the modal state and close
//       setReview('');
//       setStars(0);
//       setErrors({});
//       setBackendError('');
//       onClose();
//     } catch (error) {
//       // Capture and display backend errors
//       setBackendError(error.message || 'An unexpected error occurred.');
//     }
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>How was your stay at {spotName}?</h2>
//         {/* Show backend error if present */}
//         {backendError && <p className="backend-error">{backendError}</p>}

//         <textarea
//           placeholder="Leave your review here..."
//           value={review}
//           onChange={(e) => setReview(e.target.value)}
//         ></textarea>
//         {errors.review && <p className="error">{errors.review}</p>}

//         <div className="stars">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               className={hoveredStars >= star || stars >= star ? 'star filled' : 'star'}
//               onClick={() => setStars(star)} // Set permanent stars
//               onMouseEnter={() => setHoveredStars(star)} // Hover state
//               onMouseLeave={() => setHoveredStars(0)} // Reset hover state
//             >
//               ★
//             </span>
//           ))}
//         </div>
//         {errors.stars && <p className="error">{errors.stars}</p>}

//         <button
//           className="submit-review-btn"
//           disabled={review.length < 10 || stars === 0}
//           onClick={handleSubmit}
//         >
//           Update Your Review
//         </button>
//         <button className="close-modal-btn" onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default UpdateReviewModal;

import { useState } from 'react';
import '../ReviewModal/index';

const UpdateReviewModal = ({ onClose, onUpdate, initialReview, initialStars, clubName }) => {
  const [review, setReview] = useState(initialReview);
  const [stars, setStars] = useState(initialStars);
  const [hoveredStars, setHoveredStars] = useState(0); // Hover functionality
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(''); // Backend error state

  const handleSubmit = async () => {
    const validationErrors = {};
    if (review.length < 10) validationErrors.review = "Review must be at least 10 characters.";
    if (stars === 0) validationErrors.stars = "You must select a star rating.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Step 1: Fetch CSRF token
      const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
      if (!csrfResponse.ok) {
        throw new Error('Failed to fetch CSRF token.');
      }
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData['XSRF-Token'];

      // Step 2: Send the updated review data
      await onUpdate({ review_text: review, rating: stars }, csrfToken);

      // Reset the modal state and close
      setReview('');
      setStars(0);
      setErrors({});
      setBackendError('');
      onClose();
    } catch (error) {
      // Capture and display backend errors
      setBackendError(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>How was your experience at {clubName}?</h2>
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
              onClick={() => setStars(star)} // Set permanent stars
              onMouseEnter={() => setHoveredStars(star)} // Hover state
              onMouseLeave={() => setHoveredStars(0)} // Reset hover state
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
          Update Your Review
        </button>
        <button className="close-modal-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateReviewModal;

