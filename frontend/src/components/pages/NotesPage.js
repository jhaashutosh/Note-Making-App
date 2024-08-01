import React, { useState, useEffect } from 'react';
import NoteGroup from '../NoteGroup';
import Note from '../Note';
import CreateGroupModal from '../CreateGroupModal';
import NoteInput from '../NoteInput';
import styled from 'styled-components';
import axios from 'axios';
import { IoIosSearch as Search } from "react-icons/io";
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
    padding: 0px 20px 0px 20px;
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

const NoteHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 16px;
    font-weight: 600;
    font-size: 24px;
    background: #001F8B;
    justify-content: space-between;
    align-items: center;
    color: white;
    margin-bottom: 16px;
`;

const SearchInput = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px !important;
    font-size: 16px;
    width: 20%;
    outline: none;
    margin-right: -1px; /* To avoid double border on the button */
`;

const SearchButton = styled.button`
    background-color: #007BFF;
    border: 1px solid #007BFF;
    border-radius: 0 4px 4px 0;
    padding: 8px;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
    }
`;

const ToggleButton = styled.button`
    background-color: #007BFF;
    border: 1px solid #007BFF;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    margin-top: 16px;
    margin-bottom: 16px;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
    }
`;

const NotesPage = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showGroupSearch, setShowGroupSearch] = useState(false);
  const [groupSearchText, setGroupSearchText] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchNotes(selectedGroup._id);
    }
  }, [selectedGroup]);

  useEffect(() => {
    let timer;
    if (searchText.trim()) {
      clearTimeout(timer);  
      timer = setTimeout(() => {
        const filteredNotes = notes.filter((note) => note.content.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredNotes(filteredNotes);
      }, 1000);
    } else {
      setFilteredNotes(notes);
    }
  }, [searchText, notes]);

  useEffect(() => {
    let timer;
    if (groupSearchText.trim()) {
      clearTimeout(timer);  
      timer = setTimeout(() => {
        const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(groupSearchText.toLowerCase()));
        setFilteredGroups(filteredGroups);
      }, 1000);
    } else {
      setFilteredGroups(groups);
    }
  }, [groupSearchText, groups]);

  const fetchGroups = async () => {
    const response = await axios.get('/api/groups');
    setGroups(response.data);
    setFilteredGroups(response.data);
  };

  const fetchNotes = async (groupId) => {
    const response = await axios.get(`/api/notes/${groupId}`);
    setNotes(response.data);
    setFilteredNotes(response.data);
  };

  const handleDeleteGroup = async (groupId) => {
    await axios.delete(`/api/groups/${groupId}`);
    fetchGroups();
    setSelectedGroup(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const toggleGroupSearch = () => {
    setShowGroupSearch(!showGroupSearch);
    if (!showGroupSearch) {
      setGroupSearchText('');
    }
  };

  return (
    <div className="notes-page">
      <div className="sidebar">
        {showGroupSearch ? (
          <>
            <form onSubmit={handleSearch} style={{display: 'flex'}}>
                <SearchInput type="text" value={groupSearchText} onChange={(e) => setGroupSearchText(e.target.value)} />
                <SearchButton type="submit" onClick={() => setGroupSearchText('')}>
                    <Search />
                </SearchButton>
            </form>
            <ToggleButton onClick={toggleGroupSearch}>Hide</ToggleButton>
          </>
        ) : (
          <>
            <SidebarHeader>Pocket Notes</SidebarHeader>
            <ToggleButton onClick={toggleGroupSearch}>Search</ToggleButton>
          </>
        )}
        <SideContent>
            {filteredGroups.map((group) => (
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
            <NoteHeader>
                <span>{selectedGroup.name}</span>
                <form onSubmit={handleSearch} style={{display: 'flex'}}>
                    <SearchInput type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <SearchButton type="submit" onClick={() => setSearchText('')}>
                        <Search />
                    </SearchButton>
                </form>
            </NoteHeader>
            <div className="notes-list">
              {filteredNotes.map((note) => (
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