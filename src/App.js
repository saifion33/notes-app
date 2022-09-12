import './App.css';
import Alertbar from './components/Alertbar';
import NotesContainer from './components/Notes container/NotesContainer';
import FooterBar from './components/FooterBar';
import Topbar from './components/Topbar';
import React, { useContext } from 'react';
import NoteEditor from './components/NoteEditor';
import context from './context/context';
function App() {
  const { noteEditorOpen } = useContext(context)
  return (
    <div className="app">
      {noteEditorOpen && <NoteEditor />}
      <Topbar />
      <Alertbar />
      <NotesContainer />

    </div>
  );
}

export default App;
