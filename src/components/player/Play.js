import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { togglePlay } from '../../actions'

function mapStateToProps ({ player }) {
  return { playing: player.playing }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ togglePlay }, dispatch)
}

class Play extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { playing } = this.props
    this.props.togglePlay(!playing)
  }

  render () {
    const { playing } = this.props

    return (
      <button
        onClick={() => this.handleClick()}>
        { playing
          ? <i
            className='fa fa-pause'
            aria-hidden='true' />
          : <i
            className='fa fa-play'
            aria-hidden='true' />
        }
      </button>
    )
  }
}

Play.propTypes = {
  togglePlay: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
