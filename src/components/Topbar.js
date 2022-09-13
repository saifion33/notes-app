import React, { useContext } from 'react'
import '../css/Topbar.css'
import searchIcon from '../icons/search-icon.png'
import '../fonts/Aldrich/Aldrich-Regular.ttf'
import context from '../context/context'


const Topbar = () => {
  const { searchBoxInput, setSearchBoxInput } = useContext(context);
  const onInputChange = (event) => {
    event.preventDefault();
    setSearchBoxInput(event.target.value)

  }
  return (
    <div className="topbar">
      <h2 className="logo-text"> i-NOTES</h2>
      <div className='search-box' >
        <img src={searchIcon} className='search-icon' alt="search" />
        <input value={searchBoxInput} onChange={onInputChange} className='search-box-input' type="text" placeholder='Search for a note...' />
      </div>
    </div>
  )
}

export default Topbar
