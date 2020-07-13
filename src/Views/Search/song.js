import React from 'react'
import Song from '../../components/Song'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createModel } from '../../Helpers/Model'
import { addSong } from '../../actions'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addSong
  }, dispatch)
}

class SongsComponent extends React.Component {
  constructor (props) {
    super(props)
    this.addToStream = this.addToStream.bind(this)
  }

  addToStream (e) {
    const song = {
      id: e.id,
      type: e.type,
      title: e.title,
      duration: e.duration,
      author: e.author,
      prettyDuration: e.prettyDuration,
      url: e.url,
      cleanTitle: e.cleanTitle
    }

    const Song = createModel(song)
    this.props.addSong(Song)
  };

  getSongData (item) {
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
    } = item

    return { id, title, songId, type, duration, prettyDuration, author, url, cleanTitle }
  }

  render () {
    const {
      items
    } = this.props

    const actions = {
      handleClick: this.addToStream
    }

    return (
      <ul>
        {
          Object
            .keys(items)
            .map(key => <Song {...this.getSongData(items[key])} {...actions} />)
        }
      </ul>
    )
  }
}

export default connect(() => {}, mapDispatchToProps)(SongsComponent)
