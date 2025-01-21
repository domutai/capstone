import { useState, useEffect } from 'react';
import './ManageTablesModal.css';

const ManageTablesModal = ({ club, onClose, onUpdateClub }) => {
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({
    table_name: '',
    price: '',
    capacity: '',
    image_url: '',
  });
  const [errors, setErrors] = useState({});
  const [editingTable, setEditingTable] = useState(null);
  const [/*isEditModalOpen,*/ setIsEditModalOpen] = useState(false);



//   useEffect(() => {
//     fetch(`/api/clubs/${club.id}/tables`)
//       .then((res) => res.json())
//       .then((data) => setTables(data))
//       .catch((err) => console.error('Error fetching tables:', err));
//   }, [club.id]);

useEffect(() => {
    fetch(`/api/clubs/${club.id}/tables`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTables(data);
        } else {
          console.error('Unexpected response format:', data);
          setTables([]);  // Set to an empty array if unexpected data is received
        }
      })
      .catch((err) => {
        console.error('Error fetching tables:', err);
        setTables([]);  // Set to an empty array in case of an error
      });
  }, [club.id]);

  const validateForm = () => {
    const newErrors = {};
    if (!newTable.table_name.trim()) newErrors.table_name = 'Table name is required';
    if (!newTable.price || isNaN(newTable.price)) newErrors.price = 'Valid price is required';
    if (!newTable.capacity || isNaN(newTable.capacity)) newErrors.capacity = 'Valid capacity is required';
    if (!newTable.image_url.match(/^https?:\/\/.+\.(png|jpg|jpeg)$/i)) newErrors.image_url = 'Valid image URL (.png, .jpg, .jpeg) is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTable = async () => {
    if (!validateForm()) return;
    try {
      const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData['XSRF-Token'];

      const response = await fetch(`/api/clubs/${club.id}/tables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(newTable),
      });

      if (response.ok) {
        const addedTable = await response.json();
        setTables([...tables, addedTable]);
        setNewTable({ table_name: '', price: '', capacity: '', image_url: '' });

        onUpdateClub();  // Trigger club refresh

      } else {
        console.error('Error adding table:', await response.json());
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleEditTable = (table) => {
    setEditingTable(table);
    setNewTable(table);
    setIsEditModalOpen(true);
  };

  const handleUpdateTable = async () => {
    if (!validateForm()) return;
    try {
      const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData['XSRF-Token'];
  
      const response = await fetch(`/api/tables/${editingTable.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(newTable),
      });
  
      if (response.ok) {
        setTables(tables.map((t) => (t.id === editingTable.id ? newTable : t)));
        setEditingTable(null);
        setIsEditModalOpen(false);
        setNewTable({ table_name: '', price: '', capacity: '', image_url: '' });
        setErrors({});

        onUpdateClub();  // Trigger club refresh

      } else {
        console.error('Error updating table:', await response.json());
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };  

  const handleDeleteTable = async (tableId) => {
    try {
      const csrfResponse = await fetch('/api/csrf/restore', { method: 'GET' });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData['XSRF-Token'];

      const response = await fetch(`/api/tables/${tableId}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
      });

      if (response.ok) {
        setTables(tables.filter((table) => table.id !== tableId));

        onUpdateClub();  // Trigger club refresh

      } else {
        console.error('Error deleting table:', await response.json());
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h2>Manage Tables for {club.name}</h2>
//         <div className="table-list">
//           {tables.map((table) => (
//             <div key={table.id} className="table-item">
//               <img src={table.image_url} alt={table.table_name} className="table-image" />
//               <div className="table-info">
//               <p>{table.table_name}</p>
//               <p>Price: ${table.price}</p>
//               <p>Capacity: {table.capacity}</p>
//               </div>
//               {editingTable && editingTable.id === table.id ? (
//                 <div className="edit-modal">
//                     <input
//                     type="text"
//                     placeholder="Table Name"
//                     value={newTable.table_name}
//                     onChange={(e) => setNewTable({ ...newTable, table_name: e.target.value })}
//                     />
//                     {errors.table_name && <p className="error">{errors.table_name}</p>}
//                     <input
//                     type="number"
//                     placeholder="Price"
//                     value={newTable.price}
//                     onChange={(e) => setNewTable({ ...newTable, price: e.target.value })}
//                     />
//                     {errors.price && <p className="error">{errors.price}</p>}
//                     <input
//                     type="number"
//                     placeholder="Capacity"
//                     value={newTable.capacity}
//                     onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
//                     />
//                     {errors.capacity && <p className="error">{errors.capacity}</p>}
//                     <input
//                     type="text"
//                     placeholder="Image URL"
//                     value={newTable.image_url}
//                     onChange={(e) => setNewTable({ ...newTable, image_url: e.target.value })}
//                     />
//                     {errors.image_url && <p className="error">{errors.image_url}</p>}
//                     <button onClick={handleUpdateTable}>Update Table</button>
//                     <button onClick={() => { setEditingTable(null); setIsEditModalOpen(false); }}>Cancel</button>
//                 </div>
//                 ) : (
//                 <>
//                     <button onClick={() => handleEditTable(table)}>Edit</button>
//                     <button onClick={() => handleDeleteTable(table.id)}>Delete</button>
//                 </>
//                 )}
//             </div>
//           ))}
//         </div>
//         <div className="table-form">
//           <input
//             type="text"
//             placeholder="Table Name"
//             value={newTable.table_name}
//             onChange={(e) => setNewTable({ ...newTable, table_name: e.target.value })}
//           />
//             {errors.table_name && <p className="error">{errors.table_name}</p>}
//           <input
//             type="number"
//             placeholder="Price"
//             value={newTable.price}
//             onChange={(e) => setNewTable({ ...newTable, price: e.target.value })}
//           />
//             {errors.price && <p className="error">{errors.price}</p>}
//           <input
//             type="number"
//             placeholder="Capacity"
//             value={newTable.capacity}
//             onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
//           />
//             {errors.capacity && <p className="error">{errors.capacity}</p>}
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={newTable.image_url}
//             onChange={(e) => setNewTable({ ...newTable, image_url: e.target.value })}
//           />
//             {errors.image_url && <p className="error">{errors.image_url}</p>}
//           <button onClick={handleAddTable}>Add Table</button>
//         </div>
//         <button onClick={onClose} className="close-button">Close</button>
//       </div>
//     </div>
//   );
return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Manage Tables for {club.name}</h2>
        <div className="table-list">
          {Array.isArray(tables) && tables.length > 0 ? (
            tables.map((table) => (
              <div key={table.id} className="table-item">
                <img src={table.image_url} alt={table.table_name} className="table-image" />
                <div className="table-info">
                  <p>{table.table_name}</p>
                  <p>Price: ${table.price}</p>
                  <p>Capacity: {table.capacity}</p>
                </div>
                {editingTable && editingTable.id === table.id ? (
                  <div className="edit-modal">
                    <input
                      type="text"
                      placeholder="Table Name"
                      value={newTable.table_name}
                      onChange={(e) => setNewTable({ ...newTable, table_name: e.target.value })}
                    />
                    {errors.table_name && <p className="error">{errors.table_name}</p>}
                    <input
                      type="number"
                      placeholder="Price"
                      value={newTable.price}
                      onChange={(e) => setNewTable({ ...newTable, price: e.target.value })}
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                    <input
                      type="number"
                      placeholder="Capacity"
                      value={newTable.capacity}
                      onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                    />
                    {errors.capacity && <p className="error">{errors.capacity}</p>}
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={newTable.image_url}
                      onChange={(e) => setNewTable({ ...newTable, image_url: e.target.value })}
                    />
                    {errors.image_url && <p className="error">{errors.image_url}</p>}
                    <button onClick={handleUpdateTable}>Update Table</button>
                    <button onClick={() => { setEditingTable(null); setIsEditModalOpen(false); }}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => handleEditTable(table)}>Edit</button>
                    <button onClick={() => handleDeleteTable(table.id)}>Delete</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No tables found for this club.</p>
          )}
        </div>
        <div className="table-form">
          <input
            type="text"
            placeholder="Table Name"
            value={newTable.table_name}
            onChange={(e) => setNewTable({ ...newTable, table_name: e.target.value })}
          />
          {errors.table_name && <p className="error">{errors.table_name}</p>}
          <input
            type="number"
            placeholder="Price"
            value={newTable.price}
            onChange={(e) => setNewTable({ ...newTable, price: e.target.value })}
          />
          {errors.price && <p className="error">{errors.price}</p>}
          <input
            type="number"
            placeholder="Capacity"
            value={newTable.capacity}
            onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
          />
          {errors.capacity && <p className="error">{errors.capacity}</p>}
          <input
            type="text"
            placeholder="Image URL"
            value={newTable.image_url}
            onChange={(e) => setNewTable({ ...newTable, image_url: e.target.value })}
          />
          {errors.image_url && <p className="error">{errors.image_url}</p>}
          <button onClick={handleAddTable}>Add Table</button>
        </div>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
  
};

export default ManageTablesModal;