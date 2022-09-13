import React, { useContext, useEffect, useState } from 'react'
import '../../css/NotesContainer.css'
import context from '../../context/context'
import Page from './Page'
import loadingAnimation from '../loading-animation.gif'
import ReactPaginate from 'react-paginate';
import '../../css/NoteCard.css'
import pinIcon from '../../icons/pin-icon.png'
import unpinIcon from '../../icons/unpin-icon.png'
import deleteIcon from '../../icons/delete-icon.png'
import addIcon from '../../icons/add-icon.png';
const NotesContainer = () => {


    const { searchBoxInput, allNotes, notesLoading, noNotesToDisplay, pinnedNotesIds, pinNote, unPinNote, openNoteEditor, deleteNote } = useContext(context);
    const searchFuction = (allNotes) => {
        const reg = new RegExp(searchBoxInput, 'gi')
        if (searchBoxInput.length <= 0) {
            return allNotes.title;
        }
        return allNotes?.title?.match(reg);
    }
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        console.log(this)
    }
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 6;
    const offset = currentPage * PER_PAGE;
    const currentPageData = allNotes.filter(note => searchFuction(note)).slice(offset, offset + PER_PAGE).map((notes) => <div key={notes.title} className='note-card'>
        {JSON.parse(localStorage.getItem('pinnedNotesIds'))?.includes(notes.id) && <img className='unpin-icon' src={unpinIcon} onClick={() => { unPinNote(notes.id) }} alt="unpin" />}
        <div className="note-details-container" onClick={() => { openNoteEditor('editNote', notes) }} >
            <h2 className="note-title">{notes.title}</h2>
            <div className="note-tags-container">
                {
                    notes?.tags?.split(',').map(tag => <div key={tag} className="note-tag">{tag ? tag : ''}</div>)
                }
            </div>
            <span></span>
            <div className="note-description">{notes.description}</div>
        </div>
        <div className="note-action-container">
            {!(JSON.parse(localStorage.getItem('pinnedNotesIds'))?.includes(notes.id)) && <img src={pinIcon} onClick={() => { pinNote(notes) }} alt="pin icon" />}
            <img src={deleteIcon} onClick={() => { deleteNote(notes.id) }} alt="delete icon" />
        </div>
    </div>)
    const pageCount = Math.ceil(allNotes.length / PER_PAGE);

    return (
        <div className="notes-container">
            {/* { {
                <Routes>
                    {
                        allNotes.length > 0 && (pages.map((notes, index) => <Route exact path={`page${index + 1}`} key={`page${index}`} element={<Page notes={notes} />} />))

                    }

                </Routes> */}


            {

                noNotesToDisplay && <div className='notes-not-found'><h1>No Notes To Display</h1></div>


            }
            {
                notesLoading && <div style={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'roboto-regular', gap: '1rem' }}>
                    <img src={loadingAnimation} alt={loadingAnimation} />
                    <h2>Loading....</h2>
                </div>
            }
            <div className='pages'>
                {currentPageData}
            </div>

            <div className='pagination-container'>
                {pageCount > 1 && (<ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />)}
                <div className="addNote-btn" onClick={() => { openNoteEditor('addNote', {}) }}>Add Note <img src={addIcon} alt='Add' /> </div>
            </div>



        </div>
    )
}

export default NotesContainer
