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
            <div style={{ display: 'flex', gap: '8px' }}>
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                <span>{new Date(note.createdAt).toLocaleTimeString()}</span>
            </div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
