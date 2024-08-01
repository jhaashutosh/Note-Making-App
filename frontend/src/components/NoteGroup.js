import React, { useState } from 'react';
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import ConfirmationModal from './ConfirmationModal';

const NoteGroup = ({ group, onSelect, selectedGroup, deleteGroup }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleConfirm = () => {
        setShowConfirmationModal(false);
        deleteGroup(group._id);
        onSelect(null);
    };

  return (
    <div className="note-group" onClick={onSelect} style={{backgroundColor: selectedGroup === group ? 'rgba(47, 47, 47, 0.17)' : 'white'}}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ backgroundColor: group.color }} className="group-initials">{group.name.slice(0, 2).toUpperCase()}</div>
        <div className="group-name">{group.name}</div>
      </div>
      <DeleteIcon color='red' onClick={() => setShowConfirmationModal(true)} />
      {showConfirmationModal && (
          <ConfirmationModal message={`Are you sure you want to delete ${group.name}?`} onClose={() => setShowConfirmationModal(false)} onConfirm={handleConfirm} />
      )}
    </div>
  );
};

export default NoteGroup;
