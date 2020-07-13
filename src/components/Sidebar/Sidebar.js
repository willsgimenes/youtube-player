import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'

class Sidebar extends React.Component {
  render () {
    return (
      <div className='tab-nav'>
        <ul>
          <li><NavLink to='/playlist' activeClassName={'tab-nav__selected'}>Playlist</NavLink></li>
          <li><NavLink to='/search' activeClassName={'tab-nav__selected'}>Search</NavLink></li>
        </ul>
      </div>
    )
  }
}

export { Sidebar }
