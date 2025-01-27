const express = require('express');
const { Club, User, Review, Table, ClubImage } = require('../../db/models'); 
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



// Get all clubs owned by the logged-in owner
router.get('/owned', isOwner, async (req, res) => {
  try {
    const owner_id = req.user.id;  
    

    const clubs = await Club.findAll({
      where: { owner_id },  
      attributes: [
        'id',
        'name',
        'location',
        'main_image_url',
        'table_map_url',  
        'description',
        [
          Sequelize.fn('COALESCE', Sequelize.fn('AVG', Sequelize.col('Reviews.rating')), 0), 'avg_rating'
        ],
        [
          Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 0), 'review_count'
        ],
        [
          Sequelize.fn('COALESCE', Sequelize.fn('MIN', Sequelize.col('Tables.price')), 0), 'min_price'
        ],
        [
          Sequelize.fn('COALESCE', Sequelize.fn('MAX', Sequelize.col('Tables.price')), 0), 'max_price'
        ],
      ],
      include: [
        {
          model: ClubImage,
          attributes: ['id', 'image_url'],
        },
        {
          model: Review,
          attributes: [],
        },
        {
          model: Table,
          attributes: [],
        },
      ],
      group: ['Club.id', 'ClubImages.id'],
    });

    res.json(clubs);
  } catch (error) {
    console.error('Error fetching owned clubs:', error);
    res.status(500).json({ error: 'Failed to fetch owned clubs.' });
  }
});

// Update an existing club BUT WITH DETAILS FOR FRONTEND
router.put('/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description, main_image_url, table_map_url, club_images } = req.body;
    const owner_id = req.user.id;

    // Find the club belonging to the owner
    const club = await Club.findOne({ where: { id, owner_id } });
    if (!club) {
      return res.status(404).json({ error: 'Club not found or not owned by you.' });
    }

    // Update club details
    await club.update({ name, location, description, main_image_url, table_map_url });

    // Ensure that images are valid before updating
    const validImages = club_images.filter(img => img.trim() !== '');
    
    if (validImages.length > 0) {
      // Remove old images
      await ClubImage.destroy({ where: { club_id: id } });

      // Insert new images with valid URLs
      await ClubImage.bulkCreate(
        validImages.map((img) => ({
          club_id: id,
          image_url: img.trim(),  // Ensure no empty strings
        }))
      );
    }

    // Fetch updated club details with correct aggregation
    const updatedClub = await Club.findByPk(id, {
      attributes: [
        'id',
        'name',
        'location',
        'description',
        'main_image_url',
        'table_map_url',
        [Sequelize.fn('COALESCE', Sequelize.fn('AVG', Sequelize.col('Reviews.rating')), 0), 'avg_rating'],
        [Sequelize.fn('COALESCE', Sequelize.fn('MIN', Sequelize.col('Tables.price')), 0), 'min_price'],
        [Sequelize.fn('COALESCE', Sequelize.fn('MAX', Sequelize.col('Tables.price')), 0), 'max_price'],
      ],
      include: [
        { model: Review, attributes: [] },
        { model: Table, attributes: [] },
        { model: ClubImage, attributes: ['image_url'] },  // Include images
      ],
      group: ['Club.id', 'ClubImages.id'],
    });

    res.json(updatedClub);
  } catch (error) {
    console.error('Error updating club:', error);
    res.status(500).json({ error: 'Failed to update club.' });
  }
});



//Get specific club FOR RENDER FIX
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.findByPk(id, {
      attributes: [
        'id',
        'name',
        'location',
        'description',
        'main_image_url',
        'table_map_url',
        [
          Sequelize.fn('COALESCE', Sequelize.fn('AVG', Sequelize.col('Reviews.rating')), 0),
          'avg_rating',
        ],
        [
          Sequelize.fn('COUNT', Sequelize.col('Reviews.id')),
          'review_count',
        ],
      ],
      include: [
        {
          model: User,
          as: 'Owner',
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Review,
          attributes: ['id', 'rating', 'review_text', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['first_name', 'last_name'],
            },
          ],
        },
        {
          model: Table,
          attributes: ['table_name', 'price', 'capacity', 'image_url'],
        },
        {
          model: ClubImage,
          attributes: ['image_url', 'description'],
        },
      ],
      group: ['Club.id', 'Owner.id', 'Reviews.id', 'Reviews->User.id', 'Tables.id', 'ClubImages.id'],
    });

    if (!club) {
      return res.status(404).json({ error: 'Club not found.' });
    }

    // Convert values safely to numbers before sending response
    const formattedClub = {
      ...club.toJSON(),
      avg_rating: Number(club.dataValues.avg_rating) || 0,  // Ensure avg_rating is a number
      review_count: Number(club.dataValues.review_count) || 0,  // Ensure review_count is a number
    };

    // Format tables to ensure price is a number
    if (formattedClub.Tables) {
      formattedClub.Tables = formattedClub.Tables.map(table => ({
        ...table,
        price: Number(table.price) || 0,  // Ensure price is numeric
      }));
    }

    res.json(formattedClub);
  } catch (error) {
    console.error('Error fetching club details:', error);
    res.status(500).json({ error: 'Failed to fetch club details.' });
  }
});


// Create a new club (owners only) WITH IMAGES
router.post('/', isOwner, async (req, res) => {
  try {
    const { name, location, description, main_image_url, table_map_url, club_images } = req.body;
    const owner_id = req.user.id; 

    // Validate club images presence
    if (!Array.isArray(club_images) || club_images.length === 0) {
      return res.status(400).json({ error: 'Club images are required.' });
    }

    // Create the new club
    const newClub = await Club.create({
      owner_id,
      name,
      location,
      description,
      main_image_url,
      table_map_url,
    });

    // Store club images linked to the new club
    await Promise.all(
      club_images.map((img) => 
        ClubImage.create({
          club_id: newClub.id,
          image_url: img.trim(),
        })
      )
    );

    // Fetch the club with its newly added images
    const createdClub = await Club.findByPk(newClub.id, {
      include: [
        {
          model: ClubImage,
          attributes: ['image_url'],
        },
      ],
    });

    res.status(201).json(createdClub);
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: 'Failed to create club.' });
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
