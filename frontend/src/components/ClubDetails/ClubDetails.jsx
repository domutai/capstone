// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { setHours, setMinutes, isAfter } from 'date-fns';
// import './ClubDetails.css';

// const ClubDetails = () => {
//   const { id } = useParams();
//   const [club, setClub] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [tables, setTables] = useState([]);
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const user = useSelector((state) => state.session.user);

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

//   const handleTableSelect = (tableId) => {
//     const table = tables.find((t) => t.id === tableId);
//     setSelectedTable(table);
//   };

//   const handleBooking = async () => {
//     if (selectedTable && selectedDate) {
//       const bookingDate = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
//       const bookingTime = selectedDate.toTimeString().split(' ')[0]; // Format: HH:MM:SS
  
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
//             <p>
//               {reviews.length > 0
//                 ? `⭐ ${club.avg_rating?.toFixed(2)} • ${reviews.length} ${
//                     reviews.length === 1 ? 'review' : 'reviews'
//                   }`
//                 : '⭐ New'}
//             </p>
//             <div className="review-list">
//               {reviews.map((review) => (
//                 <div key={review.id} className="review">
//                   <p>
//                     <strong>{review.User?.first_name || 'Anonymous'}</strong>
//                   </p>
//                   <p className="review-date">
//                     {new Date(review.createdAt).toLocaleDateString()}
//                   </p>
//                   <p>{review.review_text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

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
//                 selected={
//                 selectedDate || setHours(setMinutes(new Date(), 0), 22) // Default to 10 PM if no date is selected
//                 }
//                 onChange={(date) => setSelectedDate(date)}
//                 filterDate={isFutureFridayOrSaturday} // Allow only future Fridays and Saturdays
//                 filterTime={(time) => {
//                 const hour = time.getHours();
//                 return hour >= 22 || hour < 0; // Allows times from 10 PM to 12 AM
//                 }}
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 placeholderText="Click Here" // Add placeholder text
//                 showTimeSelect
//                 timeIntervals={15} // Set intervals to every 15 minutes
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


import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, isAfter } from 'date-fns';
import './ClubDetails.css';

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const user = useSelector((state) => state.session.user);

  const isFutureFridayOrSaturday = (date) => {
    const today = new Date();
    const day = date.getDay(); // 5 = Friday, 6 = Saturday
    return (day === 5 || day === 6) && isAfter(date, today);
  };

  useEffect(() => {
    fetch(`/api/clubs/${id}`)
      .then((res) => res.json())
      .then((data) => setClub(data))
      .catch((err) => console.error('Error fetching club details:', err));
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`/api/clubs/${id}/reviews`)
        .then((res) => res.json())
        .then((data) => setReviews(data || []))
        .catch((err) => console.error('Error fetching reviews:', err));

      fetch(`/api/clubs/${id}/tables`)
        .then((res) => res.json())
        .then((data) => setTables(data || []))
        .catch((err) => console.error('Error fetching tables:', err));
    }
  }, [id]);

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
            <p>
              {reviews.length > 0
                ? `⭐ ${club.avg_rating?.toFixed(2)} • ${reviews.length} ${
                    reviews.length === 1 ? 'review' : 'reviews'
                  }`
                : '⭐ New'}
            </p>
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review">
                  <p>
                    <strong>{review.User?.first_name || 'Anonymous'}</strong>
                  </p>
                  <p className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <p>{review.review_text}</p>
                </div>
              ))}
            </div>
          </div>
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
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.table_name}
                </option>
              ))}
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
                    value={`$${selectedTable.price.toFixed(2)}`}
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


