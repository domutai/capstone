import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, isAfter } from 'date-fns';
import '../Homepage/Homepage.css'; // Reuse the same CSS
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false); // State for cancel modal
  const [selectedBookingId, setSelectedBookingId] = useState(null); // Booking to edit/cancel
  const [selectedDate, setSelectedDate] = useState(null); // New date for booking
  const navigate = useNavigate(); 


  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/session');  // Assuming this endpoint returns user session info
        const data = await response.json();
        
        if (!data.user) {
          navigate('/');  // Redirect if not logged in
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/');  // Redirect in case of error
      }
    };

    checkAuth();
  }, [navigate]);

  // Function to ensure only future Fridays and Saturdays can be selected
  const isFutureFridayOrSaturday = (date) => {
    const today = new Date();
    const day = date.getDay(); // 5 = Friday, 6 = Saturday
    return (day === 5 || day === 6) && isAfter(date, today);
  };

  // Function to format the date as MM/DD/YYYY
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`; // Rearrange to MM/DD/YYYY
  };

  // Function to format the time as 12-hour AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 or 13+ hours to 12-hour format
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Fetch bookings and CSRF token
  useEffect(() => {
    fetch(`/api/bookings`)
      .then((res) => res.json())
      .then((data) => setBookings(data || []))
      .catch((err) => console.error('Error fetching bookings:', err));

    fetch('/api/csrf/restore', { method: 'GET', credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data['XSRF-Token']))
      .catch((err) => console.error('Error fetching CSRF token:', err));
  }, []);

  // Handle edit button click
  const handleEditClick = (id, currentDate) => {
    setSelectedBookingId(id);
    setSelectedDate(new Date(currentDate)); // Set current booking date in the calendar
    setShowEditModal(true); // Show edit modal
  };

  // Handle cancel button click
  const handleCancelClick = (id) => {
    setSelectedBookingId(id); // Set the booking ID to cancel
    setShowCancelModal(true); // Show the confirmation modal
  };

  // Confirm and update the booking
//   const handleConfirmEdit = async () => {
//     if (!selectedDate) return;

//     const updatedDate = new Date(selectedDate.getTime());
//     const bookingDate = updatedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
//     const bookingTime = updatedDate.toLocaleTimeString('en-GB', { hour12: false }); // HH:MM:SS format

//     try {
//       const response = await fetch(`/api/bookings/${selectedBookingId}`, {
//         method: 'PUT', // Use PUT for updating
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-Token': csrfToken,
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           booking_date: bookingDate,
//           booking_time: bookingTime,
//         }),
//       });

//       if (response.ok) {
//         // Update booking in state
//         setBookings((prevBookings) =>
//           prevBookings.map((booking) =>
//             booking.id === selectedBookingId
//               ? { ...booking, date: bookingDate, time: bookingTime }
//               : booking
//           )
//         );
//       } else {
//         throw new Error('Failed to update booking.');
//       }
//     } catch (err) {
//       console.error('Error updating booking:', err);
//     } finally {
//       setShowEditModal(false); // Close modal
//       setSelectedBookingId(null);
//       setSelectedDate(null);
//     }
//   };

//edit to make sure changes to pending
const handleConfirmEdit = async () => {
    if (!selectedDate) return;
  
    const updatedDate = new Date(selectedDate.getTime());
    const bookingDate = updatedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const bookingTime = updatedDate.toLocaleTimeString('en-GB', { hour12: false }); // HH:MM:SS format
  
    // Find the existing booking
    const existingBooking = bookings.find((booking) => booking.id === selectedBookingId);
  
    // Check if the date has changed
    const dateChanged = bookingDate !== existingBooking.date;
  
    try {
      const response = await fetch(`/api/bookings/${selectedBookingId}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          booking_date: bookingDate,
          booking_time: bookingTime,
          status: dateChanged ? 'pending' : existingBooking.status, // Update status only if the date changed
        }),
      });
  
      if (response.ok) {
        // Update booking in state
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === selectedBookingId
              ? {
                  ...booking,
                  date: bookingDate,
                  time: bookingTime,
                  status: dateChanged ? 'pending' : booking.status, // Reflect status change in the UI
                }
              : booking
          )
        );
      } else {
        throw new Error('Failed to update booking.');
      }
    } catch (err) {
      console.error('Error updating booking:', err);
    } finally {
      setShowEditModal(false); // Close modal
      setSelectedBookingId(null);
      setSelectedDate(null);
    }
  };
  

  // Confirm cancellation
  const handleConfirmCancel = async () => {
    try {
      const response = await fetch(`/api/bookings/${selectedBookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token
        },
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        // Remove the cancelled booking from the state
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBookingId)
        );
      } else {
        throw new Error('Failed to cancel booking.');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
    } finally {
      setShowCancelModal(false); // Hide the modal
      setSelectedBookingId(null); // Clear the selected booking ID
    }
  };

  // Close modals
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedBookingId(null);
    setSelectedDate(null);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setSelectedBookingId(null);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>My Bookings</h1>
      </header>

      <div className="club-grid">
        {bookings.map((booking) => (
          <div key={booking.id} className="club-card"
          onClick={() => navigate(`/club/${booking.club.id}`)}  // Navigate to club details
          style={{ cursor: 'pointer' }}  >
            <img
              src={booking.table.image_url} // Use the table's image
              alt={booking.table.name}
              className="club-image"
            />
            <div className="club-details">
              <h2 className="club-name">
                {booking.table.name}
                <span className="club-price-range">${booking.table.price}</span>
              </h2>
              <p className="club-address">At: {booking.club.name}</p>
              <p className="club-price-range">Date: {formatDate(booking.date)}</p>
              <p className="club-price-range">Time: {formatTime(booking.time)}</p>
              <p className="club-price-range">Status: {booking.status}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(booking.id, `${booking.date}T${booking.time}`)}
                >
                  Edit
                </button>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelClick(booking.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Booking</h2>
            <p>Select a new date and time for your booking:</p>
            <ReactDatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              filterDate={isFutureFridayOrSaturday} // Only future Fridays and Saturdays
              showTimeSelect
              timeIntervals={15} // Allow 15-minute intervals
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Choose a date and time"
              minTime={setHours(setMinutes(new Date(), 0), 22)} // Min time: 10 PM
              maxTime={setHours(setMinutes(new Date(), 59), 23)} // Max time: 11:59 PM
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="confirm-button" onClick={handleConfirmEdit}>
                Confirm
              </button>
              <button className="cancel-button" onClick={handleCloseEditModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Cancel Booking</h2>
            <p>Are you sure you want to cancel this reservation?</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="confirm-button" onClick={handleConfirmCancel}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCloseCancelModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;


