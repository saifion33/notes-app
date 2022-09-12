import React, { useContext } from 'react'
import '../../css/NoteCard.css'
import pinIcon from '../../icons/pin-icon.png'
import unpinIcon from '../../icons/unpin-icon.png'
import deleteIcon from '../../icons/delete-icon.png'
import context from '../../context/context'

const NoteCard = (props) => {
    const noteTitle = props.note.title
    const noteDescription = props.note.description
    const noteTags = props.note.tags
    const pinnedNotesId = []
    const { openNoteEditor, deleteNote, pinNote } = useContext(context);
    return (
        props.notes && <div className='note-card'>
            {pinnedNotesId.includes(props.note.id) && <img className='unpin-icon' src={unpinIcon} onClick={() => { }} alt="unpin" />}
            <div className="note-details-container" onClick={() => { openNoteEditor('editNote', props.note) }} >
                <h2 className="note-title">{noteTitle}</h2>
                <div className="note-tags-container">
                    {
                        noteTags.split(',').map(tag => <div key={tag} className="note-tag">{tag}</div>)
                    }
                </div>
                <span></span>
                <div className="note-description">{noteDescription}</div>
            </div>
            <div className="note-action-container">
                {!(pinnedNotesId.includes(props.note.id)) && <img src={pinIcon} onClick={() => { pinNote(props.note.id) }} alt="pin icon" />}
                <img src={deleteIcon} onClick={() => { deleteNote(props.note.id) }} alt="delete icon" />
            </div>
        </div>
    )
}

export default NoteCard
