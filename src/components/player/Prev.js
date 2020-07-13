import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { prevSong } from '../../actions'

import PropTypes from 'prop-types'

function mapStateToProps ({ player: { index } }) {
  return {
    index
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ prevSong }, dispatch)
}

class Prev extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { prevSong } = this.props
    prevSong()
  }

  render () {
    return (
      <button onClick={this.handleClick}>
        <i
          className='fa fa-fast-backward'
          aria-hidden='true'
        />
      </button>
    )
  }
}

Prev.propTypes = {
  index: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Prev)
