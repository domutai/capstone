import { useState, useEffect } from 'react';
import './EditClubModal.css';

const validCities = [
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
  'Riverdale',
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
];

const imageUrlPattern = /\.(png|jpe?g)$/i;

const EditClubModal = ({ club, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: club.name ?? '',
      location: club.location ?? '',
      description: club.description ?? '',
      main_image_url: club.main_image_url ?? '',
      table_map_url: club.table_map_url ?? '',
      club_images: club.ClubImages?.length > 0 
        ? club.ClubImages.map(img => img.image_url) 
        : ['', '', ''],  
    });
  
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      setFormData({
        name: club.name ?? '',
        location: club.location ?? '',
        description: club.description ?? '',
        main_image_url: club.main_image_url ?? '',
        table_map_url: club.table_map_url ?? '',
        club_images: club.ClubImages?.length > 0 
          ? club.ClubImages.map(img => img.image_url) 
          : ['', '', ''],
      });
    }, [club]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith('club_images')) {
        const index = parseInt(name.split('-')[1]);
        setFormData((prev) => {
          const updatedImages = [...prev.club_images];
          updatedImages[index] = value;
          return { ...prev, club_images: updatedImages };
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
  
    const validateForm = () => {
      let newErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Club name is required.';
      } else if (formData.name.length > 20) {
        newErrors.name = 'Club name cannot exceed 20 characters.';
      }

    const isValidLocation = validCities.some(city =>
      formData.location.toLowerCase().includes(city.toLowerCase())
    );
  
    if (!isValidLocation) {
      newErrors.location = 'Location must be in New York City or Los Angeles.';
    }

      if (!formData.main_image_url.trim() || !imageUrlPattern.test(formData.main_image_url.trim())) {
        newErrors.main_image_url = 'Main image must end in .png, .jpg, or .jpeg.';
      }

      if (!formData.table_map_url.trim() || !imageUrlPattern.test(formData.table_map_url.trim())) {
        newErrors.table_map_url = 'Table map must end in .png, .jpg, or .jpeg.';
      }

      formData.club_images.forEach((img, index) => {
        if (!img.trim()) {
          newErrors[`club_images-${index}`] = `Image ${index + 1} URL is required.`;
        } else if (!imageUrlPattern.test(img.trim())) {
          newErrors[`club_images-${index}`] = `Image ${index + 1} must end in .png, .jpg, or .jpeg.`;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

      const cleanedImages = formData.club_images.filter(img => img.trim() !== '');

      try {
        const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData['XSRF-Token'];

        const response = await fetch(`/api/clubs/${club.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({
            ...formData,
            club_images: cleanedImages.length > 0 ? cleanedImages : ['', '', ''],
          }),
        });

        if (response.ok) {
          const refreshedResponse = await fetch(`/api/clubs/${club.id}`);
          if (refreshedResponse.ok) {
            const refreshedClubData = await refreshedResponse.json();
            onSave({
              ...refreshedClubData,
              club_images: refreshedClubData.ClubImages?.map(img => img.image_url) || ['', '', ''],
            });
          }
          onClose();
        } else {
          console.error('Failed to update club.');
        }
      } catch (error) {
        console.error('Error updating club:', error);
      }
    };

    return (
      <div className="edit-modal-overlay" onClick={onClose}>
        <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Edit Club</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <label>Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            {errors.location && <p className="error-message">{errors.location}</p>}

            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

            <label>Main Image URL:</label>
            <input type="text" name="main_image_url" value={formData.main_image_url} onChange={handleChange} required />
            {errors.main_image_url && <p className="error-message">{errors.main_image_url}</p>}

            <label>Table Map URL:</label>
            <input type="text" name="table_map_url" value={formData.table_map_url} onChange={handleChange} required />
            {errors.table_map_url && <p className="error-message">{errors.table_map_url}</p>}

            <label>Club Images:</label>
            {formData.club_images.map((image, index) => (
              <div key={index}>
                <input type="text" name={`club_images-${index}`} value={image} onChange={handleChange} placeholder={`Image ${index + 1} URL`} required />
                {errors[`club_images-${index}`] && (
                  <p className="error-message">{errors[`club_images-${index}`]}</p>
                )}
              </div>
            ))}

            <div className="edit-modal-buttons">
              <button type="submit" className="save-button">Save Changes</button>
              <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default EditClubModal;
