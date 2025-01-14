const express = require('express');
const { Club, User } = require('../../db/models'); 
const router = express.Router();

// Middleware to check if the user is an owner
const isOwner = async (req, res, next) => {
  const user = req.user; // Assuming user is added to req during authentication
  if (user.role !== 'owner') {
    return res.status(403).json({ error: 'You do not have permission to perform this action.' });
  }
  next();
};

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.findAll({
      attributes: ['id', 'name', 'location', 'description', 'main_image_url', 'table_map_url'],
    });
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clubs.' });
  }
});

// Get a specific club
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id, {
      attributes: ['id', 'name', 'location', 'description', 'main_image_url', 'table_map_url'],
    });
    if (!club) {
      return res.status(404).json({ error: 'Club not found.' });
    }
    res.json(club);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch club details.' });
  }
});

// Create a new club (owners only)
router.post('/', isOwner, async (req, res) => {
  try {
    const { name, location, description, main_image_url, table_map_url } = req.body;
    const owner_id = req.user.id; // Assuming user is authenticated

    const newClub = await Club.create({
      owner_id,
      name,
      location,
      description,
      main_image_url,
      table_map_url,
    });
    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create club.' });
  }
});

// Update an existing club (owners only)
router.put('/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description, main_image_url, table_map_url } = req.body;
    const owner_id = req.user.id;

    const club = await Club.findOne({ where: { id, owner_id } });
    if (!club) {
      return res.status(404).json({ error: 'Club not found or not owned by you.' });
    }

    await club.update({ name, location, description, main_image_url, table_map_url });
    res.json(club);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update club.' });
  }
});

// Delete a club (owners only)
router.delete('/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const owner_id = req.user.id;

    const club = await Club.findOne({ where: { id, owner_id } });
    if (!club) {
      return res.status(404).json({ error: 'Club not found or not owned by you.' });
    }

    await club.destroy();
    res.json({ message: 'Club deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete club.' });
  }
});

module.exports = router;
