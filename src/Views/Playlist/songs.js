import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeSong } from '../../actions'
import SongComponent from './Song'

function mapStateToProps ({ player }) {
  return {
    items: player.items,
    index: player.index
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    changeSong
  }, dispatch)
}

class SongsComponent extends React.Component {
  render () {
    const {
      items,
      index
    } = this.props

    return (<ul>
      {
        Object
          .keys(items)
          .map(key => <SongComponent item={items[key]} index={index} />)
      }
    </ul>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsComponent)
