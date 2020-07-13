import React from 'react'
import Song from '../../components/Song'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeSong } from '../../actions'

function mapStateToProps ({ player: { song } }) {
  return {
    song
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    changeSong
  }, dispatch)
}

class SongComponent extends React.Component {
  constructor (props) {
    super(props)
    this.LoadMusic = this.LoadMusic.bind(this)
    this.getSongData = this.getSongData.bind(this)
  }

  LoadMusic (song) {
    const { changeSong } = this.props
    changeSong(song.id)
  };

  getSongData (item, index) {
    const { song } = this.props
    let songItem

    Object.keys(song).forEach(function (key) {
      if (song[key].id === item) songItem = song[key]
    })

    const {
      id,
      title,
      song: {
        id: songId,
        type,
        duration,
        prettyDuration,
        author,
        url,
        cleanTitle
      }
    } = songItem

    return {
      id,
      title,
      songId,
      type,
      duration,
      prettyDuration,
      author,
      url,
      cleanTitle,
      item,
      index
    }
  }

  render () {
    const {
      item,
      index,
      song
    } = this.props

    const actions = {
      handleClick: this.LoadMusic
    }

    return song ? <Song {...this.getSongData(item, index)} {...actions} /> : ''
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongComponent)
