import React from 'react';
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";

const NoteGroup = ({ group, onSelect, selectedGroup, deleteGroup }) => {
  return (
    <div className="note-group" onClick={onSelect} style={{backgroundColor: selectedGroup === group ? 'rgba(47, 47, 47, 0.17)' : 'white'}}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ backgroundColor: group.color }} className="group-initials">{group.name.slice(0, 2).toUpperCase()}</div>
        <div className="group-name">{group.name}</div>
      </div>
      <DeleteIcon color='red' onClick={() => deleteGroup(group._id)} />
    </div>
  );
};

export default NoteGroup;
