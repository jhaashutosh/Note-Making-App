import React, { useState } from 'react';
import axios from 'axios';

const Note = ({ note, fetchNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleEdit = async () => {
    await axios.put(`/api/notes/${note._id}`, { content: editedContent });
    fetchNotes(note.groupId);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString).toLocaleDateString(undefined, options);
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = new Date(dateString).toLocaleTimeString(undefined, timeOptions);
    return `${date} • ${time}`;
  };

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{note.content}</p>
          <div className="note-footer">
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#353535', fontWeight: '600'}}>{formatDate(note.createdAt)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;