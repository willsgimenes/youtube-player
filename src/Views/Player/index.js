import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'

import '../../components/player/player.css'

import {
  Prev,
  Next,
  Play,
  Repeat,
  Seekbar,
  DurationComponent,
  VolumeControl
} from '../../components/player/Player-Controls'

import {
  togglePlay,
  loadData,
  nextSong
} from '../../actions'

const mapStateToProps = ({ player }) => ({
  prev: player.prev,
  next: player.next,
  url: player.url,
  loop: player.loop,
  index: player.index,
  volume: player.volume,
  duration: player.duration,
  items: player.items,
  playing: player.playing
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    togglePlay,
    nextSong,
    loadData
  },
  dispatch)
)

class PlayerView extends React.Component {
  constructor (props) {
    super(props)

    this.handlePause = this.handlePause.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.afterBack = this.afterBack.bind(this)
    this.onError = this.onError.bind(this)

    this.state = {
      played: 0,
      isSeeking: false
    }
  }

  componentDidMount () {
    this.props.loadData()
  }

  handlePause (pause) {
    this.props.togglePlay(pause)
  }

  handleStart (start) {
    this.props.togglePlay(start)
  }

  onProgress (val) {
    const { isSeeking } = this.state
    if (!isSeeking) this.setState({ played: val })
  };

  afterBack () {
    const { loop, nextSong } = this.props
    if (loop !== true) nextSong()
  }

  onSeekMouseDown (e) {
    this.setState({ isSeeking: true })
    this.setState({ played: parseFloat(e.target.value) })
  };

  onError (e) {}
  onSeekChange (e) {};

  onSeekMouseUp (e) {
    this.setState({ isSeeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  };

  render () {
    const {
      playing,
      url,
      prev,
      next,
      index,
      volume,
      loop,
      seeking
    } = this.props

    const actions = {
      onSeekMouseDown: this.onSeekMouseDown,
      onSeekChange: this.onSeekChange,
      onSeekMouseUp: this.onSeekMouseUp
    }

    return (
      <div className='player'>

        <ReactPlayer
          ref={player => { this.player = player }}
          className='react-player'
          width='100%'
          height='100%'
          loop={loop}
          prev={prev}
          next={next}
          index={index}
          hidden={false}
          url={url}
          playing={playing}
          volume={volume}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={() => this.handleStart(true)}
          onPause={() => this.handlePause(false)}
          onEnded={() => this.afterBack()}
          onError={e => this.onError(e)}
          onProgress={e => this.onProgress(e, seeking)}
        />

        <div className='player-controls'>
          <div className='player-song-info'>
            <div className='duration'>
              <div className='controls'>
                <Prev />
                <Play />
                <Next />
                <Repeat />
                <VolumeControl />
              </div>
              <div className='player-seeker'>
                <DurationComponent />
                <Seekbar
                  {...this.state.played}
                  {...actions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const props = {
  prev: PropTypes.string,
  next: PropTypes.string,
  loop: PropTypes.bool,
  index: PropTypes.string,
  volume: PropTypes.number,
  duration: PropTypes.number,
  playing: PropTypes.bool,
  items: PropTypes.array
}

const actions = {
  loadData: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  nextSong: PropTypes.func.isRequired
}

PlayerView.propTypes = {
  ...props,
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerView)
