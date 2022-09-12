
import React, { useContext, useState, useEffect } from 'react'
import context from '../context/context'
import '../css/NoteEditor.css'
const NoteEditor = () => {
    const { allNotes, closeNoteEditor, showAlert, noteToBeEdit, actionType, addNote, updateNote } = useContext(context);
    const [note, setNote] = useState({ title: '', description: '', tags: '', id: '' });
    const formAction = actionType === 'editNote' ? updateNote : addNote
    useEffect(() => {
        setNote(noteToBeEdit)
    }, [noteToBeEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (note.title.length < 3 || note.description.length < 10 || note.tags.length < 3) {
            showAlert('danger', 'Please Check form validity')
        }
        else {
            const newNote = { title: note.title, description: note.description, tags: note.tags, id: note.id }
            formAction(newNote);
            closeNoteEditor();
        }
    }
    const handleCancel = (event) => {
        event.preventDefault();
        closeNoteEditor();
    }

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }


    return (
        <div className="note-editor">
            <div className="note-edit-card">
                <form className="note-edit-form" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="eg. This is the title" value={note.title} onChange={handleChange} minLength='3' ></input>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder="eg. This is the description" value={note.description} onChange={handleChange} minLength='10' ></textarea>
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" id="tags" placeholder="Enter comma-separated list of tags" value={note.tags} onChange={handleChange} minLength='3'></input>
                    <div className="btn-container">
                        <button className='btn' id='submit-btn'>{actionType === 'editNote' ? 'Update' : 'Add'}</button>
                        <button className='btn' id='cancel-btn' onClick={handleCancel} key='cancel'>cancel</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default NoteEditor
