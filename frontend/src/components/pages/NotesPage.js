import React, { useState, useEffect } from 'react';
import NoteGroup from '../NoteGroup';
import Note from '../Note';
import CreateGroupModal from '../CreateGroupModal';
import NoteInput from '../NoteInput';
import styled from 'styled-components';
import axios from 'axios';
import FallbackPage from './FallbackPage';
axios.defaults.baseURL = 'https://note-making-app-api.vercel.app/';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
    position: absolute;
    bottom: 40px;
    right: 20px;
`;

const SidebarHeader = styled.div`
    padding: 24px 20px 30px 20px;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
`;

const SideContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const NoteHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 16px;
    font-weight: 600;
    font-size: 24px;
    background: #001F8B;
    color: white;
    margin-bottom: 16px;
`

const NotesPage = () => {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchNotes(selectedGroup._id);
    }
  }, [selectedGroup]);

  const fetchGroups = async () => {
    const response = await axios.get('/api/groups');
    setGroups(response.data);
  };

  const fetchNotes = async (groupId) => {
    const response = await axios.get(`/api/notes/${groupId}`);
    setNotes(response.data);
  };

  const handleDeleteGroup = async (groupId) => {
    await axios.delete(`/api/groups/${groupId}`);
    fetchGroups();
    setSelectedGroup(null);
  };

  return (
    <div className="notes-page">
      <div className="sidebar">
        <SidebarHeader>Pocket Notes</SidebarHeader>
        <SideContent>
            {groups.map((group) => (
            <NoteGroup
                key={group._id}
                group={group}
                selectedGroup={selectedGroup}
                deleteGroup={handleDeleteGroup}
                onSelect={() => setSelectedGroup(group)}
            />
            ))}
        </SideContent>
        <ButtonContainer>
            <button className="add-group-btn" onClick={() => setShowModal(true)}>+</button>
        </ButtonContainer>
      </div>
      <div className="main-content">
        {selectedGroup ? (
          <>
            <NoteHeader>{selectedGroup.name}</NoteHeader>
            <div className="notes-list">
              {notes.map((note) => (
                <Note key={note._id} note={note} fetchNotes={fetchNotes} />
              ))}
            </div>
            <NoteInput groupId={selectedGroup._id} fetchNotes={fetchNotes} />
          </>
        ) : <FallbackPage />}
      </div>
      {showModal && <CreateGroupModal onClose={() => setShowModal(false)} fetchGroups={fetchGroups} />}
    </div>
  );
};

export default NotesPage;