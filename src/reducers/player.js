import ActionTypes from '../actions'

const initialState = {
  playing: false,
  items: [],
  index: '',
  loaded: 0,
  loop: false,
  playbackRate: 1,
  played: 0,
  seeking: false,
  volume: 0.8,
  duration: 0,
  volumeModal: false,
  song: []
}

export default(state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SONG: {
      return {
        ...state,
        items: action.payload
      }
    }

    case ActionTypes.CHANGE_SONG: {
      return {
        ...state,
        url: action.payload.url,
        played: 0,
        loaded: 0,
        index: action.payload.index,
        prev: action.payload.prev,
        next: action.payload.next,
        duration: action.payload.duration
      }
    }

    case ActionTypes.SET_DURATION: {
      return {
        ...state,
        duration: action.payload.duration
      }
    }

    case ActionTypes.SET_PROGRESS: {
      return {
        ...state,
        played: action.payload.played
      }
    }

    case ActionTypes.SET_SEEKING: {
      return {
        ...state,
        seeking: action.payload
      }
    }

    case ActionTypes.LOAD_DATA: {
      return {
        ...state,
        items: action.payload.items,
        url: action.payload.url,
        loop: action.payload.loop,
        prev: action.payload.prev,
        next: action.payload.next,
        index: action.payload.index,
        duration: action.payload.duration,
        volume: action.payload.volume
      }
    }

    case ActionTypes.SET_LOOP: {
      return {
        ...state,
        loop: action.payload
      }
    }

    case ActionTypes.LOAD_SONG: {
      return {
        ...state,
        song: action.payload
      }
    }

    case ActionTypes.OPEN_VOLUMEMODAL: {
      return {
        ...state,
        volumeModal: action.payload
      }
    }

    case ActionTypes.SET_VOLUME: {
      return {
        ...state,
        volume: action.payload
      }
    }

    case ActionTypes.PLAY_UPDATE: {
      return {
        ...state,
        playing: action.payload
      }
    }
    default:
      return state
  }
}
