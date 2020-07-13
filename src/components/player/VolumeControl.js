import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { toggleVolumeModal, toggleVolume } from '../../actions'

function mapStateToProps ({ player }) {
  return {
    volumeModal: player.volumeModal,
    volume: player.volume
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    toggleVolumeModal,
    toggleVolume
  }, dispatch)
}

class VolumeControl extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.onVolumeChange = this.onVolumeChange.bind(this)
  }

  handleClick () {
    const { toggleVolumeModal, volumeModal } = this.props
    toggleVolumeModal(!volumeModal)
  }

  onVolumeChange (e) {
    const { toggleVolume } = this.props
    toggleVolume(parseFloat(e.target.value))
  };

  render () {
    const { volumeModal, volume } = this.props

    return (
      <button className='volume-container'>
        {
          volumeModal
            ? <div className='volume-modal'>
              <input
                className='volume-slider'
                type='range'
                min={0}
                max={1}
                step='any'
                value={volume}
                onChange={this.onVolumeChange}
              />
            </div>
            : ''
        }
        <i
          onClick={this.handleClick}
          className='fa fa-volume-up'
          aria-hidden='true'
        />
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControl)
