const express = require('express');
const { Club, User, Review, Table } = require('../../db/models'); 
const router = express.Router();
const { Op, fn, col } = require('sequelize');
const Sequelize = require('sequelize'); 


// Middleware to check if the user is an owner
const isOwner = async (req, res, next) => {
  const user = req.user; 
  if (user.role !== 'owner') {
    return res.status(403).json({ error: 'You do not have permission to perform this action.' });
  }
  next();
};

// Get all clubs
// router.get('/', async (req, res) => {
//   try {
//     const clubs = await Club.findAll({
//       attributes: ['id', 'name', 'location', 'description', 'main_image_url', 'table_map_url'],
//     });
//     res.json(clubs);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch clubs.' });
//   }
// });

//GET ALL CLUBS filtered by City
const cityMapping = {
  'New York City': [
    'New York',
    'Brooklyn',
    'Harlem',
    'Flushing',
    'Queens',
    'Bronx',
    'Staten Island',
    'Long Island City',
    'Williamsburg',
    'SoHo',
    'Upper East Side',
    'Chelsea',
    'Greenwich Village',
    'Astoria',
    'DUMBO',
    'Bushwick',
    'Jersey City',
    'Hoboken',
    'Park Slope',
    'Crown Heights',
    'Bedford-Stuyvesant',
    'Tribeca',
    'Lower East Side',
    'Midtown Manhattan',
    'Financial District',
    'Chinatown',
    'Little Italy',
    'East Harlem',
    'Washington Heights',
    'Riverdale'
  ],
  'Los Angeles': [
    'Los Angeles',
    'Santa Monica',
    'Venice',
    'Beverly Hills',
    'Hollywood',
    'Malibu',
    'Pasadena',
    'Glendale',
    'Burbank',
    'Inglewood',
    'West Hollywood',
    'Long Beach',
    'Manhattan Beach',
    'El Segundo',
    'Downtown LA',
    'Silver Lake',
    'Echo Park',
    'Culver City',
    'Brentwood',
    'Studio City',
    'Sherman Oaks',
    'San Pedro',
    'Torrance',
    'North Hollywood',
    'Westwood',
    'Palos Verdes',
    'Redondo Beach',
    'Huntington Beach',
    'Marina del Rey',
    'Hermosa Beach',
    'La Cañada Flintridge',
    'Bel Air',
    'Eagle Rock',
    'Highland Park'
  ],
};

router.get('/', async (req, res) => {
  try {
    const { major_city } = req.query;

    console.log('Requested major_city:', major_city);

    if (!major_city) {
      // Fetch all clubs if no city filter is applied
      const clubs = await Club.findAll({
        attributes: ['id', 'name', 'location', 'main_image_url', 'description'],
      });
      return res.json(clubs);
    }

    // Check if the requested major city exists in the mapping
    const relatedCities = cityMapping[major_city];
    console.log('Related cities:', relatedCities);

    if (!relatedCities) {
      console.error(`City "${major_city}" not found in mapping.`);
      return res.status(400).json({ error: 'Invalid city selection.' });
    }

    // Fetch clubs whose location contains any of the related cities
    const clubs = await Club.findAll({
      where: {
        location: {
          [Op.or]: relatedCities.map((city) => ({
            [Op.like]: `%${city}%`,
          })),
        },
      },
      attributes: ['id', 'name', 'location', 'main_image_url', 'description',
        [
          // Calculate average rating
          Sequelize.fn('AVG', Sequelize.col('Reviews.rating')),
          'avg_rating',
        ],
        [
          // Count total reviews
          Sequelize.fn('COUNT', Sequelize.col('Reviews.id')),
          'review_count',
        ],
        [
          // Minimum table price
          Sequelize.fn('MIN', Sequelize.col('Tables.price')),
          'min_price',
        ],
        [
          // Maximum table price
          Sequelize.fn('MAX', Sequelize.col('Tables.price')),
          'max_price',
        ],
      ],
      include: [
        {
          model: Review,
          attributes: [], 
        },
        {
          model: Table,
          attributes: [], 
        },
      ],
      group: ['Club.id'],
    });

    return res.json(clubs);
  } catch (err) {
    console.error('Error fetching clubs:', err);
    return res.status(500).json({ error: 'Failed to fetch clubs.' });
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
    const owner_id = req.user.id; 

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
