import React from 'react';

const NoteGroup = ({ group, onSelect }) => {
  return (
    <div className="note-group" onClick={onSelect} style={{ backgroundColor: group.color }}>
      <div className="group-initials">{group.name.slice(0, 2).toUpperCase()}</div>
      <div className="group-name">{group.name}</div>
    </div>
  );
};

export default NoteGroup;
