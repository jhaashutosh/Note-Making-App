import React, { useState, useEffect } from 'react';
import NoteGroup from '../NoteGroup';
import Note from '../Note';
import CreateGroupModal from '../CreateGroupModal';
import NoteInput from '../NoteInput';
import axios from 'axios';
axios.defaults.baseURL = 'https://note-making-app-api.vercel.app/';

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

  return (
    <div className="notes-page">
      <div className="sidebar">
        {groups.map((group) => (
          <NoteGroup
            key={group._id}
            group={group}
            onSelect={() => setSelectedGroup(group)}
          />
        ))}
        <button className="add-group-btn" onClick={() => setShowModal(true)}>+</button>
      </div>
      <div className="main-content">
        {selectedGroup && (
          <>
            <h2>{selectedGroup.name}</h2>
            <div className="notes-list">
              {notes.map((note) => (
                <Note key={note._id} note={note} fetchNotes={fetchNotes} />
              ))}
            </div>
            <NoteInput groupId={selectedGroup._id} fetchNotes={fetchNotes} />
          </>
        )}
      </div>
      {showModal && <CreateGroupModal onClose={() => setShowModal(false)} fetchGroups={fetchGroups} />}
    </div>
  );
};

export default NotesPage;