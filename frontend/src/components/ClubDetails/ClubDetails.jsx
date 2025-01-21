// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { setHours, setMinutes, isAfter } from 'date-fns';
// import './ClubDetails.css';
// import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal';
// import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
// import ReviewModal from '../ReviewModal/ReviewModal';


// const ClubDetails = () => {
//   const { id } = useParams();
//   const [club, setClub] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [tables, setTables] = useState([]);
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const user = useSelector((state) => state.session.user);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [reviewToUpdate, setReviewToUpdate] = useState(null);
//   const [reviewToDelete, setReviewToDelete] = useState(null);
//   const [showReviewModal, setShowReviewModal] = useState(false);


//   const isFutureFridayOrSaturday = (date) => {
//     const today = new Date();
//     const day = date.getDay(); // 5 = Friday, 6 = Saturday
//     return (day === 5 || day === 6) && isAfter(date, today);
//   };

//   useEffect(() => {
//     fetch(`/api/clubs/${id}`)
//       .then((res) => res.json())
//       .then((data) => setClub(data))
//       .catch((err) => console.error('Error fetching club details:', err));
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       fetch(`/api/clubs/${id}/reviews`)
//         .then((res) => res.json())
//         .then((data) => setReviews(data || []))
//         .catch((err) => console.error('Error fetching reviews:', err));

//       fetch(`/api/clubs/${id}/tables`)
//         .then((res) => res.json())
//         .then((data) => setTables(data || []))
//         .catch((err) => console.error('Error fetching tables:', err));
//     }
//   }, [id]);

//   useEffect(() => {
//     if (reviews.length > 0) {
//       // Calculate the total rating
//       const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  
//       // Calculate the average rating
//       const average = totalRating / reviews.length;
  
//       // Update the club object with the calculated average rating
//       setClub((prevClub) => ({ ...prevClub, avg_rating: average }));
//     } else {
//       // If no reviews, reset the average rating to null
//       setClub((prevClub) => ({ ...prevClub, avg_rating: null }));
//     }
//   }, [reviews]);

//   const handleTableSelect = (tableId) => {
//     const table = tables.find((t) => t.id === tableId);
//     setSelectedTable(table);
//   };

//   const handleBooking = async () => {
//     if (selectedTable && selectedDate) {
//       // Create a new Date object to prevent mutation
//       const adjustedDate = new Date(selectedDate.getTime());
  
//       // Format the adjustedDate without applying UTC conversion
//       const bookingDate = adjustedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
//       const bookingTime = adjustedDate.toLocaleTimeString('en-GB', { hour12: false }); // HH:MM:SS format
  
//       const bookingData = {
//         table_id: selectedTable.id,
//         booking_date: bookingDate,
//         booking_time: bookingTime,
//       };
  
//       try {
//         // Step 1: Fetch CSRF token
//         const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
//         const csrfData = await csrfResponse.json();
//         const csrfToken = csrfData['XSRF-Token'];
  
//         // Step 2: Send booking request
//         const response = await fetch('/api/bookings', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRF-Token': csrfToken, // Include CSRF token
//           },
//           credentials: 'include', // Include cookies
//           body: JSON.stringify(bookingData), // Send booking data
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to make a booking.');
//         }
  
//         const result = await response.json();
//         alert('Booking successful!');
//         console.log('Booking created:', result);
//       } catch (err) {
//         console.error('Error making booking:', err);
//         alert('Something went wrong. Please try again.');
//       }
//     } else {
//       alert('Please select a table and date.');
//     }
//   };
  
//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 0; i < rating; i++) {
//       stars.push('⭐');
//     }
//     return stars.join('');
//   };

//   const handleReviewSubmit = async (reviewData) => {
//     try {
//       const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
//       const csrfData = await csrfResponse.json();
//       const csrfToken = csrfData['XSRF-Token'];
  
//       const response = await fetch(`/api/clubs/${id}/reviews`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-Token': csrfToken,
//         },
//         credentials: 'include',
//         body: JSON.stringify(reviewData),
//       });
  
//       if (response.ok) {
//         const newReview = await response.json();
  
//         // Add the new review to the state
//         setReviews((prevReviews) => [newReview, ...prevReviews]);
  
//         // Update the average rating
//         const updatedAvgRating =
//           (club.avg_rating * reviews.length + newReview.rating) / (reviews.length + 1);
  
//         setClub((prevClub) => ({
//           ...prevClub,
//           avg_rating: updatedAvgRating,
//         }));
  
//         setShowReviewModal(false);
//       } else {
//         const errorData = await response.json();
//         console.error('Error creating review:', errorData);
//         throw new Error(errorData.message || 'Failed to create review.');
//       }
//     } catch (error) {
//       console.error('Error creating review:', error);
//       alert('Something went wrong. Please try again.');
//     }
//   };
  
  

//   const hasUserWrittenReview = () => {
//     return reviews.some((review) => review.user_id === user?.id);
//   };
  
//   const handleUpdateReview = async (updatedData) => {
//     try {
//       // Step 1: Fetch CSRF token
//       const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
//       if (!csrfResponse.ok) {
//         throw new Error('Failed to fetch CSRF token.');
//       }
//       const csrfData = await csrfResponse.json();
//       const csrfToken = csrfData['XSRF-Token'];
  
//       // Step 2: Send the update review request
//       const response = await fetch(`/api/reviews/${reviewToUpdate.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-Token': csrfToken, // Include CSRF token
//         },
//         credentials: 'include',
//         body: JSON.stringify(updatedData),
//       });
  
//       if (response.ok) {
//         const updatedReview = await response.json();
  
//         // Retain the existing `User` object if not returned from the backend
//         const existingReview = reviews.find((review) => review.id === updatedReview.id);
//         const userInfo = existingReview?.User || {
//           id: user.id,
//           first_name: user.first_name,
//           last_name: user.last_name,
//         };
  
//         const updatedReviewWithUser = { ...updatedReview, User: userInfo };
  
//         // Update the reviews state
//         setReviews((prevReviews) =>
//           prevReviews.map((review) =>
//             review.id === updatedReview.id ? updatedReviewWithUser : review
//           )
//         );
  
//         // Recalculate the average rating
//         const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
//         const updatedAvgRating = totalRating / reviews.length;
  
//         setClub((prevClub) => ({ ...prevClub, avg_rating: updatedAvgRating }));
//         setShowUpdateModal(false);
//         setReviewToUpdate(null);
//       } else {
//         throw new Error('Failed to update review.');
//       }
//     } catch (error) {
//       console.error('Error updating review:', error);
//       alert('Something went wrong. Please try again.');
//     }
//   };
  

//   const handleDeleteReview = async () => {
//     try {
//       // Step 1: Fetch CSRF token
//       const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
//       if (!csrfResponse.ok) {
//         throw new Error('Failed to fetch CSRF token.');
//       }
//       const csrfData = await csrfResponse.json();
//       const csrfToken = csrfData['XSRF-Token'];
  
//       // Step 2: Send the delete request
//       const response = await fetch(`/api/reviews/${reviewToDelete.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-Token': csrfToken, // Include CSRF token
//         },
//         credentials: 'include',
//       });
  
//       if (response.ok) {
//         // Remove the deleted review from the reviews state
//         setReviews((prevReviews) =>
//           prevReviews.filter((review) => review.id !== reviewToDelete.id)
//         );
  
//         // Recalculate the average rating
//         const updatedReviews = reviews.filter((review) => review.id !== reviewToDelete.id);
//         const totalRating = updatedReviews.reduce((sum, review) => sum + (review.rating || 0), 0);
//         const updatedAvgRating = updatedReviews.length > 0 ? totalRating / updatedReviews.length : null;
  
//         setClub((prevClub) => ({ ...prevClub, avg_rating: updatedAvgRating }));
//         setShowDeleteModal(false);
//         setReviewToDelete(null);
//       } else {
//         throw new Error('Failed to delete review.');
//       }
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       alert('Something went wrong. Please try again.');
//     }
//   };
  


//   if (!club) return <p>Loading club details...</p>;

//   return (
//     <div className="club-details">
//       {/* Club Info Header */}
//       <div className="club-info-header">
//         <h1>{club.name}</h1>
//         <p>{club.location}</p>
//       </div>

//       {/* Club Images */}
//       <div className="club-images">
//         <img src={club.table_map_url} alt="Table Map" className="table-map-image" />
//         <div className="additional-images">
//           {club.main_image_url && (
//             <img
//               src={club.main_image_url}
//               alt="Main Club Image"
//               className="additional-image"
//             />
//           )}
//           {club.ClubImages?.slice(0, 3)?.map((image) => (
//             <img
//               key={image.id}
//               src={image.image_url}
//               alt="Club"
//               className="additional-image"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Main Content Section */}
//       <div className="club-main-content">
//         {/* About Section */}
//         <div className="club-info">
//           <div className="description">
//             <h2>About</h2>
//             <p>{club.description}</p>
//           </div>

//           {/* Reviews Section */}
//           <div className="reviews">
//             <h2>Reviews</h2>
//             <div className="average-rating">
//               {reviews.length > 0 ? (
//                 <>
//                   <span>⭐</span> <span>{club.avg_rating?.toFixed(2)}</span>
//                   <p>CLUB HAS {reviews.length} {reviews.length === 1 ? 'REVIEW' : 'REVIEWS'}</p>
//                   {user && !hasUserWrittenReview() && (
//             <button
//               className="write-review-btn"
//               onClick={() => setShowReviewModal(true)}
//             >
//               Write a Review
//             </button>
//           )}
//                 </>
//               ) : (
//                 <p>⭐ New</p>
//               )}
//             </div>
//             <div className="review-list">
//               {reviews.map((review) => (
//                 <div key={review.id} className="review">
//                   <p><strong>Rating:</strong> {review.rating} {renderStars(review.rating)}</p>
//                   <p><strong>By:</strong> {review.User?.first_name || 'Anonymous'}</p>
//                   <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
//                   <p><strong>Review:</strong> {review.review_text}</p>
//                   {review.user_id === user?.id && (
//                 <div className="review-actions">
//                   <button
//                     onClick={() => {
//                       setReviewToUpdate(review);
//                       setShowUpdateModal(true);
//                     }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       setReviewToDelete(review);
//                       setShowDeleteModal(true);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//               ))}
//           </div>
//         </div>

//         {/* Review Modal */}
//       {showReviewModal && (
//         <ReviewModal
//           onClose={() => setShowReviewModal(false)}
//           onSubmit={handleReviewSubmit}
//         />
//       )}

//                   {/* Update Review Modal */}
//                 {showUpdateModal && reviewToUpdate && (
//                   <UpdateReviewModal
//                     onClose={() => setShowUpdateModal(false)}
//                     onUpdate={handleUpdateReview}
//                     initialReview={reviewToUpdate.review_text}
//                     initialStars={reviewToUpdate.rating}
//                     clubName={club.name}
//                   />
//                 )}

//                 {/* Delete Review Modal */}
//                 {showDeleteModal && reviewToDelete && (
//                   <DeleteReviewModal
//                     onClose={() => setShowDeleteModal(false)}
//                     onDelete={handleDeleteReview}
//                   />
//                 )}
//               </div>

//         {/* Tables Section */}
//         <div className="table-booking">
//           <h2>Book a Table</h2>
//           <div className="table-box">
//             {/* Select Table Dropdown */}
//             <label htmlFor="table-select">Select Table:</label>
//             <select
//               id="table-select"
//               onChange={(e) => handleTableSelect(Number(e.target.value))}
//             >
//               <option value="">-- Choose Here --</option>
//               {tables.map((table) => (
//                 <option key={table.id} value={table.id}>
//                   {table.table_name}
//                 </option>
//               ))}
//             </select>

//             {/* Capacity Field */}
//             {selectedTable && (
//               <>
//                 <div className="input-field">
//                   <label htmlFor="capacity-field">Capacity:</label>
//                   <input
//                     id="capacity-field"
//                     type="text"
//                     value={`${selectedTable.capacity} people`}
//                     readOnly
//                   />
//                 </div>

//                 {/* Desired Night Input */}
//                 <ReactDatePicker
//                   selected={
//                     selectedDate || setHours(setMinutes(new Date(), 0), 22) // Default to 10 PM if no date is selected
//                   }
//                   onChange={(date) => setSelectedDate(date)}
//                   filterDate={isFutureFridayOrSaturday} // Allow only future Fridays and Saturdays
//                   filterTime={(time) => {
//                     const hour = time.getHours();
//                     return hour >= 22 || hour < 0; // Allows times from 10 PM to midnight
//                   }}
//                   dateFormat="MMMM d, yyyy h:mm aa"
//                   placeholderText="Click Here"
//                   showTimeSelect
//                   timeIntervals={15} // Set intervals to every 15 minutes
//                 />

//                 {/* Table Image */}
//                 {selectedTable.image_url && (
//                   <div className="table-image">
//                     <img
//                       src={selectedTable.image_url}
//                       alt={`${selectedTable.table_name}`}
//                     />
//                   </div>
//                 )}

//                 {/* Price Field */}
//                 <div className="input-field">
//                   <label htmlFor="price-field">Price:</label>
//                   <input
//                     id="price-field"
//                     type="text"
//                     value={`$${selectedTable.price.toFixed(2)}`}
//                     readOnly
//                   />
//                 </div>
//               </>
//             )}

//             {/* Book Table Button */}
//             <button
//               className="book-button"
//               onClick={handleBooking}
//               disabled={!selectedDate}
//             >
//               Book Table
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubDetails;

//WITHOUT NEED FOR TABLES AND REVIEWS AFTER CREATION
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, isAfter } from 'date-fns';
import './ClubDetails.css';
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import ReviewModal from '../ReviewModal/ReviewModal';


const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const user = useSelector((state) => state.session.user);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToUpdate, setReviewToUpdate] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);


  const isFutureFridayOrSaturday = (date) => {
    const today = new Date();
    const day = date.getDay(); // 5 = Friday, 6 = Saturday
    return (day === 5 || day === 6) && isAfter(date, today);
  };

  useEffect(() => {
    fetch(`/api/clubs/${id}`)
      .then((res) => res.json())
      //.then((data) => setClub(data))
      .then((data) => {
        console.log(data); // Check if the image URL is correct
        setClub(data);
      })
      .catch((err) => console.error('Error fetching club details:', err));
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`/api/clubs/${id}/reviews`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setReviews(data);
          } else {
            setReviews([]); // Fallback to an empty array if response isn't an array
          }
        })
        .catch((err) => {
          console.error('Error fetching reviews:', err);
          setReviews([]); // Ensure reviews state remains an array
        });

        fetch(`/api/clubs/${id}/tables`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            /*setTables(data);*/
            setTables(data.map(table => ({
              ...table,
              price: Number(table.price) || 0  // Ensure price is always a number
            })));
          } else {
            setTables([]); 
          }
        })
        .catch((err) => {
          console.error('Error fetching tables:', err);
          setTables([]); 
        });
    }
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      // Calculate the total rating
      const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  
      // Calculate the average rating
      const average = totalRating / reviews.length;
  
      // Update the club object with the calculated average rating
      setClub((prevClub) => ({ ...prevClub, avg_rating: average }));
    } else {
      // If no reviews, reset the average rating to null
      setClub((prevClub) => ({ ...prevClub, avg_rating: null }));
    }
  }, [reviews]);

  const handleTableSelect = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    setSelectedTable(table);
  };

  const handleBooking = async () => {
    if (selectedTable && selectedDate) {
      // Create a new Date object to prevent mutation
      const adjustedDate = new Date(selectedDate.getTime());
  
      // Format the adjustedDate without applying UTC conversion
      const bookingDate = adjustedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
      const bookingTime = adjustedDate.toLocaleTimeString('en-GB', { hour12: false }); // HH:MM:SS format
  
      const bookingData = {
        table_id: selectedTable.id,
        booking_date: bookingDate,
        booking_time: bookingTime,
      };
  
      try {
        // Step 1: Fetch CSRF token
        const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData['XSRF-Token'];
  
        // Step 2: Send booking request
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken, // Include CSRF token
          },
          credentials: 'include', // Include cookies
          body: JSON.stringify(bookingData), // Send booking data
        });
  
        if (!response.ok) {
          throw new Error('Failed to make a booking.');
        }
  
        const result = await response.json();
        alert('Booking successful!');
        console.log('Booking created:', result);
      } catch (err) {
        console.error('Error making booking:', err);
        alert('Something went wrong. Please try again.');
      }
    } else {
      alert('Please select a table and date.');
    }
  };
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData['XSRF-Token'];
  
      const response = await fetch(`/api/clubs/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(reviewData),
      });
  
      if (response.ok) {
        const newReview = await response.json();
  
        // Add the new review to the state
        setReviews((prevReviews) => [newReview, ...prevReviews]);
  
        // Update the average rating
        const updatedAvgRating =
          (club.avg_rating * reviews.length + newReview.rating) / (reviews.length + 1);
  
        setClub((prevClub) => ({
          ...prevClub,
          avg_rating: updatedAvgRating,
        }));
  
        setShowReviewModal(false);
      } else {
        const errorData = await response.json();
        console.error('Error creating review:', errorData);
        throw new Error(errorData.message || 'Failed to create review.');
      }
    } catch (error) {
      console.error('Error creating review:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  

  const hasUserWrittenReview = () => {
    return reviews.some((review) => review.user_id === user?.id);
  };
  
  const handleUpdateReview = async (updatedData) => {
    try {
      // Step 1: Fetch CSRF token
      const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
      if (!csrfResponse.ok) {
        throw new Error('Failed to fetch CSRF token.');
      }
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData['XSRF-Token'];
  
      // Step 2: Send the update review request
      const response = await fetch(`/api/reviews/${reviewToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const updatedReview = await response.json();
  
        // Retain the existing `User` object if not returned from the backend
        const existingReview = reviews.find((review) => review.id === updatedReview.id);
        const userInfo = existingReview?.User || {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
        };
  
        const updatedReviewWithUser = { ...updatedReview, User: userInfo };
  
        // Update the reviews state
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === updatedReview.id ? updatedReviewWithUser : review
          )
        );
  
        // Recalculate the average rating
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        const updatedAvgRating = totalRating / reviews.length;
  
        setClub((prevClub) => ({ ...prevClub, avg_rating: updatedAvgRating }));
        setShowUpdateModal(false);
        setReviewToUpdate(null);
      } else {
        throw new Error('Failed to update review.');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  

  const handleDeleteReview = async () => {
    try {
      // Step 1: Fetch CSRF token
      const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
      if (!csrfResponse.ok) {
        throw new Error('Failed to fetch CSRF token.');
      }
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData['XSRF-Token'];
  
      // Step 2: Send the delete request
      const response = await fetch(`/api/reviews/${reviewToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        // Remove the deleted review from the reviews state
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewToDelete.id)
        );
  
        // Recalculate the average rating
        const updatedReviews = reviews.filter((review) => review.id !== reviewToDelete.id);
        const totalRating = updatedReviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        const updatedAvgRating = updatedReviews.length > 0 ? totalRating / updatedReviews.length : null;
  
        setClub((prevClub) => ({ ...prevClub, avg_rating: updatedAvgRating }));
        setShowDeleteModal(false);
        setReviewToDelete(null);
      } else {
        throw new Error('Failed to delete review.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  


  if (!club) return <p>Loading club details...</p>;

  return (
    <div className="club-details">
      {/* Club Info Header */}
      <div className="club-info-header">
        <h1>{club.name}</h1>
        <p>{club.location}</p>
      </div>

      {/* Club Images */}
      <div className="club-images">
        <img src={club.table_map_url} alt="Table Map" className="table-map-image" />
        <div className="additional-images">
          {club.main_image_url && (
            <img
              src={club.main_image_url}
              alt="Main Club Image"
              className="additional-image"
            />
          )}
          {club.ClubImages?.slice(0, 3)?.map((image) => (
            <img
              key={image.id}
              src={image.image_url}
              alt="Club"
              className="additional-image"
            />
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="club-main-content">
        {/* About Section */}
        <div className="club-info">
          <div className="description">
            <h2>About</h2>
            <p>{club.description}</p>
          </div>

          {/* Reviews Section */}
          <div className="reviews">
            <h2>Reviews</h2>
            <div className="average-rating">
              {reviews.length > 0 ? (
                <>
                  {/*<span>⭐</span> <span>{club.avg_rating?.toFixed(2)}</span>*/}
                  <span>⭐ {typeof club.avg_rating === 'number' ? club.avg_rating.toFixed(2) : 'N/A'}</span>
                  <p>CLUB HAS {reviews.length} {reviews.length === 1 ? 'REVIEW' : 'REVIEWS'}</p>
                  {user && !hasUserWrittenReview() && (
            <button
              className="write-review-btn"
              onClick={() => setShowReviewModal(true)}
            >
              Write a Review
            </button>
          )}
                </>
              ) : (
                <p>⭐ New</p>
              )}
            </div>
            <div className="review-list">
            {Array.isArray(reviews) && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review">
                  <p><strong>Rating:</strong> {review.rating} {renderStars(review.rating)}</p>
                  <p><strong>By:</strong> {review.User?.first_name || 'Anonymous'}</p>
                  <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
                  <p><strong>Review:</strong> {review.review_text}</p>
                  {review.user_id === user?.id && (
                    <div className="review-actions">
                      <button
                        onClick={() => {
                          setReviewToUpdate(review);
                          setShowUpdateModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setReviewToDelete(review);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
          </div>


        {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}

                  {/* Update Review Modal */}
                {showUpdateModal && reviewToUpdate && (
                  <UpdateReviewModal
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdateReview}
                    initialReview={reviewToUpdate.review_text}
                    initialStars={reviewToUpdate.rating}
                    clubName={club.name}
                  />
                )}

                {/* Delete Review Modal */}
                {showDeleteModal && reviewToDelete && (
                  <DeleteReviewModal
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteReview}
                  />
                )}
              </div>

        {/* Tables Section */}
        <div className="table-booking">
          <h2>Book a Table</h2>
          <div className="table-box">
            {/* Select Table Dropdown */}
            <label htmlFor="table-select">Select Table:</label>
            <select
              id="table-select"
              onChange={(e) => handleTableSelect(Number(e.target.value))}
            >
              <option value="">-- Choose Here --</option>
              {Array.isArray(tables) && tables.length > 0 ? (
                tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.table_name}
                  </option>
                ))
              ) : (
                <option disabled>No tables available</option>
              )}
            </select>

            {/* Capacity Field */}
            {selectedTable && (
              <>
                <div className="input-field">
                  <label htmlFor="capacity-field">Capacity:</label>
                  <input
                    id="capacity-field"
                    type="text"
                    value={`${selectedTable.capacity} people`}
                    readOnly
                  />
                </div>

                {/* Desired Night Input */}
                <ReactDatePicker
                  selected={
                    selectedDate || setHours(setMinutes(new Date(), 0), 22) // Default to 10 PM if no date is selected
                  }
                  onChange={(date) => setSelectedDate(date)}
                  filterDate={isFutureFridayOrSaturday} // Allow only future Fridays and Saturdays
                  filterTime={(time) => {
                    const hour = time.getHours();
                    return hour >= 22 || hour < 0; // Allows times from 10 PM to midnight
                  }}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Click Here"
                  showTimeSelect
                  timeIntervals={15} // Set intervals to every 15 minutes
                />

                {/* Table Image */}
                {selectedTable.image_url && (
                  <div className="table-image">
                    <img
                      src={selectedTable.image_url}
                      alt={`${selectedTable.table_name}`}
                    />
                  </div>
                )}

                {/* Price Field */}
                <div className="input-field">
                  <label htmlFor="price-field">Price:</label>
                  <input
                    id="price-field"
                    type="text"
                    //value={`$${selectedTable.price.toFixed(2)}`}
                    value={`$${Number(selectedTable.price || 0).toFixed(2)}`}
                    readOnly
                  />
                </div>
              </>
            )}

            {/* Book Table Button */}
            <button
              className="book-button"
              onClick={handleBooking}
              disabled={!selectedDate}
            >
              Book Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
