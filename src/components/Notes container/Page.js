import React from 'react'
import NoteCard from './NoteCard'

const Page = (props) => {
    const style = {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gap: '2rem',
        width: '100%',
        height: 'min-content',
        position: 'relative',
        padding: '2rem',

    }

    return (
        <div className="page" style={style}>
            {props.notes.map((note) => {
                return <NoteCard key={note.id} note={note} />
            })}
        </div>
    )
}

export default Page
