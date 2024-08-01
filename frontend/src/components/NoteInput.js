import React, { useState } from 'react';
import axios from 'axios';

const NoteInput = ({ groupId, fetchNotes }) => {
  const [noteContent, setNoteContent] = useState('');

  const handleSend = async () => {
    if (noteContent.trim()) {
      await axios.post('/api/notes', { groupId, content: noteContent });
      setNoteContent('');
      fetchNotes(groupId);
    }
  };

  return (
    <div className="note-input">
      <input
        type="text"
        placeholder="Enter your text here..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button
        className="send-btn"
        onClick={handleSend}
        disabled={!noteContent.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default NoteInput;
