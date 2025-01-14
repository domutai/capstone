const express = require('express');
const { Booking, Table, Club } = require('../../db/models'); 
const router = express.Router();

// Middleware to check if the user owns a booking
const isBookingOwner = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id; // Assuming user is authenticated and added to req.user

  try {
    const booking = await Booking.findByPk(id);
    if (!booking || booking.user_id !== userId) {
      return res.status(403).json({ error: 'You do not have permission to access this booking.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to validate booking ownership.' });
  }
};

// Get all bookings for the logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user is authenticated
    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Table,
          attributes: ['id', 'table_name', 'price', 'capacity', 'club_id'],
          include: {
            model: Club,
            attributes: ['id', 'name', 'location'],
          },
        },
      ],
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
});

// Get a specific booking
router.get('/:id', isBookingOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: Table,
          attributes: ['id', 'table_name', 'price', 'capacity', 'club_id'],
          include: {
            model: Club,
            attributes: ['id', 'name', 'location'],
          },
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking details.' });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { table_id, booking_date, booking_time } = req.body;
    const userId = req.user.id; // Assuming user is authenticated

    // Check if the table exists
    const table = await Table.findByPk(table_id);
    if (!table) {
      return res.status(404).json({ error: 'Table not found.' });
    }

    // Create the booking
    const newBooking = await Booking.create({
      user_id: userId,
      table_id,
      booking_date,
      booking_time,
      status: 'pending', // Default status
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking.' });
  }
});

// Update an existing booking
router.put('/:id', isBookingOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { booking_date, booking_time, status } = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    await booking.update({ booking_date, booking_time, status });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking.' });
  }
});

// Delete a booking
router.delete('/:id', isBookingOwner, async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    await booking.destroy();
    res.json({ message: 'Booking deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking.' });
  }
});

module.exports = router;
