import './DeleteClubModal.css';

const DeleteClubModal = ({ onClose, onDelete }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this club from the listings?</p>
        <div className="delete-modal-buttons">
          <button className="delete-button" onClick={onDelete}>
            Yes (Delete Club)
          </button>
          <button className="cancel-button" onClick={onClose}>
            No (Keep Club)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClubModal;
