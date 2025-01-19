const express = require('express');
const { Review, Club, User } = require('../../db/models'); 
const router = express.Router();

// Middleware to check if the user owns a review
const isReviewOwner = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id; // Assuming user is authenticated and added to req.user

  try {
    const review = await Review.findByPk(id);
    if (!review || review.user_id !== userId) {
      return res.status(403).json({ error: 'You do not have permission to access this review.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to validate review ownership.' });
  }
};

// Get all reviews for a specific club
router.get('/:clubId/reviews', async (req, res) => {
  try {
    const { clubId } = req.params;
    const reviews = await Review.findAll({
      where: { club_id: clubId },
      include: {
        model: User,
        attributes: ['id', 'first_name', 'last_name'], // Include user details
      },
      order: [['createdAt', 'DESC']], // Order by most recent
    });

    if (reviews.length === 0) {
      return res.status(404).json({ error: 'No reviews found for this club.' });
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews for the club.' });
  }
});

// Get a specific review
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id, {
      include: {
        model: User,
        attributes: ['id', 'first_name', 'last_name'], // Include user details
      },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch review details.' });
  }
});

// // Add a new review to a club
// router.post('/:clubId/reviews', async (req, res) => {
//   try {
//     const { clubId } = req.params;
//     const { rating, review_text } = req.body;
//     const userId = req.user.id; 

//     // Check if the club exists
//     const club = await Club.findByPk(clubId);
//     if (!club) {
//       return res.status(404).json({ error: 'Club not found.' });
//     }

//     // Create the review
//     const newReview = await Review.create({
//       user_id: userId,
//       club_id: clubId,
//       rating,
//       review_text,
//     });

//     res.status(201).json(newReview);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add review to the club.' });
//   }
// });

// Add a new review to a club FOR Frontend
router.post('/:clubId/reviews', async (req, res) => {
  try {
    const { clubId } = req.params;
    const { rating, review_text } = req.body;
    const userId = req.user.id;

    // Check if the club exists
    const club = await Club.findByPk(clubId);
    if (!club) {
      return res.status(404).json({ error: 'Club not found.' });
    }

    // Create the review
    const newReview = await Review.create({
      user_id: userId,
      club_id: clubId,
      rating,
      review_text,
    });

    // Retrieve the newly created review with the associated User data
    const createdReview = await Review.findByPk(newReview.id, {
      include: {
        model: User,
        attributes: ['id', 'first_name', 'last_name'], // Include only necessary fields
      },
    });

    res.status(201).json(createdReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to add review to the club.' });
  }
});


// Update an existing review
router.put('/:id', isReviewOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review_text } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    await review.update({ rating, review_text });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review.' });
  }
});

// Delete a review
router.delete('/:id', isReviewOwner, async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    await review.destroy();
    res.json({ message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review.' });
  }
});

module.exports = router;
