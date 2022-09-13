import { useState, useEffect } from "react";
import context from "./context";

const MainState = (props) => {
    // eslint-disable-next-line
    const [allNotes, setAllNotes] = useState(localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []);
    const [noNotesToDisplay, setNoNotesToDisplay] = useState(false);
    const [notesLoading, setNotesLoading] = useState(false);
    // eslint-disable-next-line
    const [pinnedNotesIds, setPinnedNotesIds] = useState(localStorage.getItem('pinnedNotesIds') ? JSON.parse(localStorage.getItem('pinnedNotesIds')) : []);
    //Alert related properties
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState('sucessfull')
    const showAlert = (alertType, alertMessage) => {
        setAlertMessage(alertMessage);
        setAlertType(alertType);
        setIsAlertOpen(true);
        setTimeout(() => {
            setIsAlertOpen(false);
        }, 1500);
    }

    // Note search related properties
    const [searchBoxInput, setSearchBoxInput] = useState('');
    
    // Note Editing related properties
    // This is the default state of note editor
    const [noteEditorOpen, setNoteEditorOpen] = useState(false);
    const [noteToBeEdit, setNoteToBeEdit] = useState({ title: '', description: '', tags: '' });
    const [actionType, setActionType] = useState('');

    const openNoteEditor = (actionType, note) => {
        setActionType(actionType);
        setNoteEditorOpen(true);
        if (actionType === 'editNote') {
            setNoteToBeEdit(note);
        }
    }
    const closeNoteEditor = () => {
        setNoteToBeEdit({ title: '', description: '', tags: '' })
        setNoteEditorOpen(false);
    }
    // This function filter given note and give it's index in allNotes
    const noteIdToIndex = (noteId) => {
        const note = allNotes.filter(note => note.id === noteId)[0];
        const indexOfNote = allNotes.indexOf(note);
        return indexOfNote
    }
    const getNotes = async () => {
        if (navigator.onLine) {
            setNotesLoading(true);
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }
            let response = await fetch("https://notes-app-e415d-default-rtdb.firebaseio.com/notes.json", {
                method: "GET",
                headers: headersList
            });
            let data = await response.json();
            setNotesLoading(false);
            const keys = data ? Object.keys(data) : null;
            const notes = keys ? (keys.map((key) => { return { ...data[key], id: key } })) : [];
            if (!localStorage.getItem('notes')) {
                setAllNotes(notes);
            }
            if (!localStorage.getItem('pinnedNotesIds')) {
                localStorage.setItem('notes', JSON.stringify(notes));
            }
            if (notes.length < 1) {
                setNoNotesToDisplay(true);
            }


        }
        else {
            showAlert('danger', 'Please connect to internet and try again')
        }
    }
    // Note Update functions
    const updateNote = async (updatedNote) => {
        if (navigator.onLine) {
            const noteIndex = noteIdToIndex(updatedNote.id);
            allNotes.splice(noteIndex, 1, updatedNote);
            localStorage.setItem('notes', JSON.stringify(allNotes));
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "title": updatedNote.title,
                "description": updatedNote.description,
                "tags": updatedNote.tags
            });

            const response = await fetch(`https://notes-app-e415d-default-rtdb.firebaseio.com/notes/${updatedNote.id}.json`, {
                method: "PUT",
                body: bodyContent,
                headers: headersList
            });
            if (response.status === 200) {
                showAlert('sucessfull', 'Note updated successfully ')
            }
        }
        else {
            showAlert('danger', 'Please connect to the internet and try again');
        }
    }
    // Add note function
    const addNote = async (note) => {
        if (navigator.onLine) {
            allNotes.push(note);
            localStorage.setItem('notes', JSON.stringify(allNotes));
            if (allNotes.length > 0) {
                setNoNotesToDisplay(false);
            }
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "title": note.title,
                "description": note.description,
                "tags": note.tags
            });

            let response = await fetch("https://notes-app-e415d-default-rtdb.firebaseio.com/notes.json", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            const data = await response.json();

            if (response.status === 200) {
                const oldNote = allNotes.slice(-1)[0];
                const newNote = { ...oldNote, id: data.name }
                allNotes.splice(-1, 1, newNote);
                showAlert('sucessfull', 'Note Added Successfully')
            }
        }
        else {
            showAlert('danger', 'Please check your internet connection and try again.');
        }

    }
    // Delete note function
    const deleteNote = async (noteId) => {
        if (navigator.onLine) {
            if ((pinnedNotesIds).includes(noteId)) {
                const noteIdIndexInPinnedNotes = pinnedNotesIds.indexOf(noteId);
                pinnedNotesIds.splice(noteIdIndexInPinnedNotes, 1);
                localStorage.setItem('pinnedNotesIds', JSON.stringify(pinnedNotesIds));
                delete pinnedNotesOldIndex[noteId];
                localStorage.setItem('pinnedNotesOldIndex', JSON.stringify(pinnedNotesOldIndex));
                showAlert('sucessfull', 'yes includes')
            }
            if (allNotes.length < 1) {
                setNoNotesToDisplay(true);
            }
            allNotes.splice(noteIdToIndex(noteId), 1);
            localStorage.setItem('notes', JSON.stringify(allNotes));
            let headersList = {
                "Accept": "*/*",
            }

            let response = await fetch(`https://notes-app-e415d-default-rtdb.firebaseio.com/notes/${noteId}.json`, {
                method: "DELETE",
                headers: headersList
            });
            if (response.status === 200) {
                showAlert('danger', 'Note deleted successfully');

            }
        }
        else {
            showAlert('danger', 'Please check your internet connection and try again.');
        }

    }
    // pinnedNotesOldIndex
    // eslint-disable-next-line
    const [pinnedNotesOldIndex, setPinnedNotesOldIndex] = useState(localStorage.getItem('pinnedNotesOldIndex') ? JSON.parse(localStorage.getItem('pinnedNotesOldIndex')) : {});
    // Pin Note function
    const pinNote = (pinNote) => {
        const noteId = pinNote.id;
        const noteIndex = noteIdToIndex(noteId);
        pinnedNotesIds.push(noteId);
        pinnedNotesOldIndex[noteId] = noteIndex;
        localStorage.setItem('pinnedNotesOldIndex', JSON.stringify(pinnedNotesOldIndex));
        localStorage.setItem('pinnedNotesIds', JSON.stringify(pinnedNotesIds));
        allNotes.splice(noteIdToIndex(pinNote.id), 1);
        allNotes.unshift(pinNote);
        localStorage.setItem('notes', JSON.stringify(allNotes));
        showAlert('sucessfull', 'note Pinned successfully');

    }

    // note index finder function
    const indexFinder = (oldIndex) => {
        let index = oldIndex;
        for (let i = 0; i < pinnedNotesIds.length; i++) {
            if (pinnedNotesIds.includes(allNotes[index].id)) {
                index += 1;
            }
            else {
                return index;
            }
        }
        return index - 1;
    }
    // unpin note function
    const unPinNote = (noteId) => {
        const noteIdIndexInPinnedNotes = pinnedNotesIds.indexOf(noteId);
        const noteCurrentIndex = noteIdToIndex(noteId);
        let index = indexFinder(pinnedNotesOldIndex[noteId]);
        console.log(index);
        const note = allNotes.splice(noteCurrentIndex, 1)[0];
        allNotes.splice(index, 0, note);
        pinnedNotesIds.splice(noteIdIndexInPinnedNotes, 1);
        delete pinnedNotesOldIndex[noteId]
        localStorage.setItem('pinnedNotesIds', JSON.stringify(pinnedNotesIds));
        localStorage.setItem('notes', JSON.stringify(allNotes));
        localStorage.setItem('pinnedNotesOldIndex', JSON.stringify(pinnedNotesOldIndex));
        showAlert('sucessfull', 'note unpin successfully' + index);
    }
    useEffect(() => {
        getNotes();

        // eslint-disable-next-line
    }, [])


    return (
        <context.Provider value={{ allNotes, noNotesToDisplay, notesLoading, setNoteEditorOpen, isAlertOpen, showAlert, alertMessage, alertType, noteEditorOpen, openNoteEditor, closeNoteEditor, noteToBeEdit, actionType, updateNote, addNote, deleteNote, pinNote, unPinNote,searchBoxInput,setSearchBoxInput }}>
            {props.children}
        </context.Provider>
    )
}
export default MainState