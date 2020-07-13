import React from 'react'
import { connect } from 'react-redux'

import './duration.css'

function mapStateProps (state) {
  return {
    duration: state.player.duration
  }
}

function format (seconds) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())

  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }

  return `${mm}:${ss}`
}

function pad (string) {
  return ('0' + string).slice(-2)
}

class DurationComponent extends React.Component {
  render () {
    const { duration } = this.props

    return (
      <div className='player-duration__info'>
        <time dateTime={`P${Math.round(duration)}S`}>
          {format(duration)}
        </time>
      </div>
    )
  }
}

export default connect(mapStateProps, {})(DurationComponent)
