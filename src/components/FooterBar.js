import React, { useContext } from 'react'
import '../css/FooterBar.css'
import Pagination from '@mui/material/Pagination'
import addIcon from '../icons/add-icon.png';
import nextIcon from '../icons/next-icon.png'
import context from '../context/context'
import { useNavigate } from 'react-router-dom'

const FooterBar = () => {
    const style = {
        height: '5rem',
        width: '100%',

    }
    const { openNoteEditor } = useContext(context)
    const { allNotes } = useContext(context);
    const totalPages = Math.ceil(Object.keys(allNotes).length / 6);
    const navigate = useNavigate();

    return (
        <div className="pagination-container" style={style}>
            {!(totalPages <= 1) && <Pagination className="pagination" count={totalPages} variant="outlined" shape="rounded" onChange={(event, pageNumber) => { event.preventDefault(); navigate(`./page${pageNumber}`, { replace: true }) }} />}
            <div className="addNote-btn" onClick={() => { openNoteEditor('addNote', {}) }}>Add Note <img src={addIcon} alt='Add' /> </div>


        </div>
    )
}

export default FooterBar
