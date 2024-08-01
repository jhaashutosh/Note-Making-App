import React, { useState } from 'react';
import axios from 'axios';
import { IoMdSend as SendIcon} from "react-icons/io";
import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 16px;
    font-weight: 600;
    font-size: 24px;
    width: 100%;
    background: #001F8B;
    color: white;
    margin-bottom: 16px;
    border-radius: 0px !important;
`;

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
    <InputContainer className='note-input'>
        <form className="note-input" onSubmit={handleSend} style={{width: '95%'}}>
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
    </InputContainer>
  );
};

export default NoteInput;