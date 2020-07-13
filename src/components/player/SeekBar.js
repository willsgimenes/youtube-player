import React, { Component } from 'react'

class Seekbar extends Component {
  render () {
    const {
      played,
      onSeekChange,
      onSeekMouseUp,
      onSeekMouseDown
    } = this.props

    return (
      <div className='player-seeker__bar'>
        <input
          style={{ backgroundSize: `${played * 100}% 100%` }}
          type='range' min={0} max={1} step='any'
          value={played}
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
        />

        <progress
          type='range'
          min={0}
          max={1}
          step='any'
          value={played}
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
        />
      </div>
    )
  }
}

Seekbar.defaultProps = {
  onSeekChange: () => {},
  onSeekMouseUp: () => {},
  onSeekMouseDown: () => {}
}

export default Seekbar
