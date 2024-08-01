import React, { useState } from 'react';
import axios from 'axios';
import'./stylesheets/CreateGroupModalStyle.css';
import styled from 'styled-components';

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 17px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const CreateGroupModal = ({ onClose, fetchGroups }) => {
  const [groupName, setGroupName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/groups', { name: groupName, color });
    fetchGroups();
    onClose();
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <ModalHeader>Create New Group</ModalHeader>
            <FlexContainer>
              <label htmlFor='groupName'>Group Name:</label>
              <input
                type="text"
                id='groupName'
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                required
              />
            </FlexContainer>
          </div>
          <div className="form-group">
            <FlexContainer>
              <label>Choose color:</label>
              <div className="color-picker">
                <span className="color-circle" style={{ backgroundColor: '#a49eeb', borderColor: color === '#a49eeb' ? '#000' : 'transparent'  }} onClick={() => setColor('#a49eeb')} />
                <span className="color-circle" style={{ backgroundColor: '#f39cd1', borderColor: color === '#f39cd1' ? '#000' : 'transparent' }} onClick={() => setColor('#f39cd1')} />
                <span className="color-circle" style={{ backgroundColor: '#9dd7e0', borderColor: color === '#9dd7e0' ? '#000' : 'transparent' }} onClick={() => setColor('#9dd7e0')} />
                <span className="color-circle" style={{ backgroundColor: '#f4a196', borderColor: color === '#f4a196' ? '#000' : 'transparent' }} onClick={() => setColor('#f4a196')} />
                <span className="color-circle" style={{ backgroundColor: '#2952f6', borderColor: color === '#2952f6' ? '#000' : 'transparent' }} onClick={() => setColor('#2952f6')} />
                <span className="color-circle" style={{ backgroundColor: '#6c89d4', borderColor: color === '#6c89d4' ? '#000' : 'transparent' }} onClick={() => setColor('#6c89d4')} />
              </div>
            </FlexContainer>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="create-button">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;