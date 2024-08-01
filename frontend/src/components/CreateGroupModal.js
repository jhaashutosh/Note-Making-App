import React, { useState } from 'react';
import axios from 'axios';

const CreateGroupModal = ({ onClose, fetchGroups }) => {
  const [groupName, setGroupName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/groups', { name: groupName, color });
    fetchGroups();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Group Name:
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </label>
          <label>
            Choose color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </label>
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
