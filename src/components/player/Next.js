import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { nextSong } from '../../actions'

function mapStateToProps ({ player: { index } }) {
  return {
    index
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ nextSong }, dispatch)
}

class Next extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { nextSong } = this.props
    nextSong()
  };

  render () {
    return (
      <button onClick={() => this.handleClick()}>
        <i
          className='fa fa-fast-forward'
          aria-hidden='true' />
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Next)
