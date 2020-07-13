import React from 'react'
import List from '../../components/List/List'
import SongsComponent from './songs'

class PlayListView extends React.Component {
  render () {
    return (
      <List>
        <SongsComponent />
      </List>
    )
  }
}

export default PlayListView
