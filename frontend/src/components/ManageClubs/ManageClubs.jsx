import { useState, useEffect } from 'react';
import '../Homepage/Homepage.css'; 
import './ManageClubs.css';
import DeleteClubModal from '../DeleteClubModal/DeleteClubModal';
import EditClubModal from '../EditClubModal/EditClubModal';
import ManageTablesModal from '../ManageTablesModal/ManageTablesModal';


const ManageClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);


  useEffect(() => {
    fetch('/api/clubs/owned')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setClubs(data);
        } else {
          console.error('Unexpected data format:', data);
          setClubs([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching owned clubs:', err);
        setClubs([]);
      });
  },);

  const handleEditClick = (club) => {
    setSelectedClub(club);
    setIsEditModalOpen(true);
  };

  const handleUpdateClub = async () => {
    try {
      const res = await fetch('/api/clubs/owned');
      const updatedClubs = await res.json();
      setClubs(updatedClubs);  // Update the club list with new data
    } catch (error) {
      console.error('Error updating clubs:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedClubId(id);
    setIsDeleteModalOpen(true);
  };

  const handleTableClick = (club) => {
    setSelectedClub(club);
    setIsTableModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedClubId) {
      try {
        // Fetch the CSRF token first
        const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData['XSRF-Token'];

        const response = await fetch(`/api/clubs/${selectedClubId}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'include',
        });

        if (response.ok) {
          setClubs((prevClubs) => prevClubs.filter((club) => club.id !== selectedClubId));
          setIsDeleteModalOpen(false);
        } else {
          const errorData = await response.json();
          console.error('Failed to delete the club:', errorData);
        }
      } catch (err) {
        console.error('Error deleting club:', err);
        alert('Something went wrong. Please try again.');
      }
    }
  };


  const handleSaveChanges = async () => {
    try {
      await fetch(`/api/clubs/owned`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setClubs(data);
          }
        });
    } catch (error) {
      console.error('Error refreshing club list:', error);
    }
  };
  

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Manage Your Clubs</h1>
      </header>

      <div className="club-grid">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <img src={club.main_image_url} alt={club.name} className="club-image" />
            <div className="club-details">
              <h2 className="club-name">
                {club.name}
                {club.avg_rating && club.review_count > 0 ? (
                  <span className="club-rating">⭐ {parseFloat(club.avg_rating).toFixed(1)}</span>
                ) : (
                  <span className="club-rating new-club-badge">⭐ New</span>
                )}
              </h2>
              <p className="club-address">{club.location}</p>
              <p className="club-price-range">
                Price Range: ${club.min_price || 'N/A'} - ${club.max_price || 'N/A'}
              </p>
              <div className="club-actions">
              <div className="button-group">
                <button className="edit-button" onClick={() => handleEditClick(club)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDeleteClick(club.id)}>
                  Delete
                </button>
                </div>
                <button className="table-button" onClick={() => handleTableClick(club)}>
                  Manage Tables
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isDeleteModalOpen && (
        <DeleteClubModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
        />
      )}

      {isEditModalOpen && selectedClub && (
        <EditClubModal
          club={selectedClub}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      {isTableModalOpen && selectedClub && (
              <ManageTablesModal
                club={selectedClub}
                onClose={() => setIsTableModalOpen(false)}
                onUpdateClub={handleUpdateClub}
              />
            )}

    </div>
  );
};

export default ManageClubs;
