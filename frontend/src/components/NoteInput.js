import React, { useState } from 'react';
import axios from 'axios';
import { IoMdSend as SendIcon} from "react-icons/io";

const NoteInput = ({ groupId, fetchNotes }) => {
  const [noteContent, setNoteContent] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (noteContent.trim()) {
      await axios.post('/api/notes', { groupId, content: noteContent });
      setNoteContent('');
      fetchNotes(groupId);
    }
  };

  return (
    <form className="note-input" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Here's the sample text for sample work"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button
        className="send-btn"
        onClick={handleSend}
        style={{background: 'none', color: 'black', border: 'none', fontSize: '18px'}}
        disabled={!noteContent.trim()}
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default NoteInput;