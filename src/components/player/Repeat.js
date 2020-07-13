import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setLoop } from '../../actions'

import { saveState } from '../../Helpers/Localstorage'

function mapStateToProps ({ player: { loop } }) {
  return {
    loop
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setLoop
  }, dispatch)
}

class Repeat extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { loop, setLoop } = this.props

    setLoop(!loop)
    saveState('loop', !loop)
  };

  render () {
    const { loop } = this.props

    return (
      <button onClick={this.handleClick}>
        { loop
          ? <i className='fa fa-repeat active' aria-hidden='true' />
          : <i className='fa fa-repeat' aria-hidden='true' />
        }
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repeat)
