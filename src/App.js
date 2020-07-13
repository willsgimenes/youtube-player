import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'

import PlaylistView from './Views/Playlist/index'
import PlayerView from './Views/Player/index'
import SearchView from './Views/Search/index'

import { Sidebar } from './components/Sidebar/Sidebar'
import './App.css'

LogRocket.init('emtevl/youtube-player')

setupLogRocketReact(LogRocket)

export default class App extends Component {
  render () {
    return (
      <div className='app'>
        <Router>
          <div className='container'>
            <PlayerView />
            <div className='left-container'>
              <Sidebar />
              <Route exact path='/search' component={() => (<SearchView />)} />
              <Route exact path='/playlist' component={() => (<PlaylistView />)} />
              <Route exact path='/' render={() => (
                <Redirect to='/playlist' />
              )} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}
