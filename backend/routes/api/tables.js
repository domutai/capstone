const express = require('express');
const { Table, Club } = require('../../db/models'); 
const router = express.Router();

// Middleware to check if the user is an owner of the club
const isClubOwner = async (req, res, next) => {
  const user = req.user; // Assuming user is added to req during authentication
  const { clubId } = req.params;

  try {
    const club = await Club.findOne({ where: { id: clubId, owner_id: user.id } });
    if (!club) {
      return res.status(403).json({ error: 'You do not have permission to manage tables for this club.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to validate club ownership.' });
  }
};

// Get all tables for a specific club FIXING RENDER ISSUE
router.get('/:clubId/tables', async (req, res) => {
  try {
    const { clubId } = req.params;
    const tables = await Table.findAll({
      where: { club_id: clubId },
      attributes: ['id', 'table_name', 'price', 'capacity', 'image_url'],
    });

    if (tables.length === 0) {
      return res.status(404).json({ error: 'No tables found for this club.' });
    }

    // Ensure price is always a number
    const formattedTables = tables.map(table => ({
      ...table.toJSON(),
      price: Number(table.price) || 0  // Convert price to number or default to 0
    }));

    res.json(formattedTables);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tables for the club.' });
  }
});

// Get all tables for a specific club
// router.get('/:clubId/tables', async (req, res) => {
//   try {
//     const { clubId } = req.params;
//     const tables = await Table.findAll({
//       where: { club_id: clubId },
//       attributes: ['id', 'table_name', 'price', 'capacity', 'image_url'],
//     });

//     if (tables.length === 0) {
//       return res.status(404).json({ error: 'No tables found for this club.' });
//     }

//     res.json(tables);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch tables for the club.' });
//   }
// });

// Get a specific table
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findByPk(id, {
      attributes: ['id', 'table_name', 'price', 'capacity', 'image_url', 'club_id'],
    });

    if (!table) {
      return res.status(404).json({ error: 'Table not found.' });
    }

    res.json(table);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch table details.' });
  }
});

// Add a new table to a club (owners only)
router.post('/:clubId/tables', isClubOwner, async (req, res) => {
  try {
    const { clubId } = req.params;
    const { table_name, price, capacity, image_url } = req.body;

    const newTable = await Table.create({
      club_id: clubId,
      table_name,
      price,
      capacity,
      image_url,
    });

    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add table to the club.' });
  }
});

// Update an existing table (owners only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { table_name, price, capacity, image_url } = req.body;

    const table = await Table.findByPk(id);
    if (!table) {
      return res.status(404).json({ error: 'Table not found.' });
    }

    // Verify ownership of the table via club's owner_id
    const club = await Club.findByPk(table.club_id);
    if (club.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'You do not have permission to update this table.' });
    }

    await table.update({ table_name, price, capacity, image_url });
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update table.' });
  }
});

// Delete a table (owners only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const table = await Table.findByPk(id);
    if (!table) {
      return res.status(404).json({ error: 'Table not found.' });
    }

    // Verify ownership of the table via club's owner_id
    const club = await Club.findByPk(table.club_id);
    if (club.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'You do not have permission to delete this table.' });
    }

    await table.destroy();
    res.json({ message: 'Table deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete table.' });
  }
});

module.exports = router;
