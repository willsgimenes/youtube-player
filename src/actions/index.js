import {
  loadState,
  loadStateNotSerialized,
  saveState
} from '../Helpers/Localstorage'

import {
  fetchIndex,
  fetchSongs,
  postList
} from '../Helpers/Firebase'

const ActionTypes = {
  LOAD_DATA: 'LOAD_DATA',
  PLAY_UPDATE: 'PLAY_UPDATE',
  SET_DURATION: 'SET_DURATION',
  SET_PROGRESS: 'SET_PROGRESS',
  SET_SEEKING: 'SET_SEEKING',
  CHANGE_SONG: 'CHANGE_SONG',
  SET_LOOP: 'SET_LOOP',
  OPEN_VOLUMEMODAL: 'OPEN_VOLUMEMODAL',
  SET_VOLUME: 'SET_VOLUME',
  ADD_SONG: 'ADD_SONG',
  LOAD_SONG: 'LOAD_SONG'
}

export const UpdatePlay = val => ({
  type: ActionTypes.PLAY_UPDATE, payload: val
})

export const updateSong = val => ({
  type: ActionTypes.CHANGE_SONG, payload: val
})

export const UpdateDuration = val => ({
  type: ActionTypes.SET_DURATION, payload: val
})

export const UpdateSeeking = val => ({
  type: ActionTypes.SET_SEEKING, payload: val
})

export const bootData = val => ({
  type: ActionTypes.LOAD_DATA, payload: val
})

export const fooSong = val => ({
  type: ActionTypes.LOAD_SONG, payload: val
})

export const UpdateProgress = val => ({
  type: ActionTypes.SET_PROGRESS, payload: val
})

export const ToggleRepeat = val => ({
  type: ActionTypes.SET_LOOP, payload: val
})

export const ToggleVolumeModal = val => ({
  type: ActionTypes.OPEN_VOLUMEMODAL, payload: val
})

export const ToggleVolume = val => ({
  type: ActionTypes.SET_VOLUME, payload: val
})

export const setLoop = val => {
  return (dispatch) => {
    dispatch(ToggleRepeat(val))
  }
}

export const toggleVolume = val => {
  return (dispatch, getState) => {
    const {
      duration,
      index,
      loaded,
      next,
      played,
      prev,
      url
    } = getState().player

    const newState = {
      duration,
      index,
      loaded,
      next,
      played,
      prev,
      url,
      volume: val
    }

    saveState('AppState', newState)
    dispatch(ToggleVolume(val))
  }
}

export const toggleVolumeModal = val => {
  return (dispatch) => {
    dispatch(ToggleVolumeModal(val))
  }
}

export const togglePlay = (val) => {
  return (dispatch) => {
    dispatch(UpdatePlay(val))
  }
}

const loadSongs = async () => {
  return fetchIndex()
}

const loadSong = async () => {
  return fetchSongs()
}

const setupState = (items, song, songList) => {
  const arr = Object.values(items)
  const songPosition = arr.indexOf(song)

  let item

  Object.keys(songList).forEach(function (key) {
    if (songList[key].id === song) item = songList[key]
  })

  const state = {
    prev: arr[songPosition - 1],
    next: arr[songPosition + 1]
  }

  return {
    url: item.song.url,
    played: 0,
    loaded: 0,
    index: song,
    prev: state.prev,
    next: state.next,
    duration: item.song.duration
  }
}

export const addSong = Song => {
  return (dispatch) => {
    let StreamIndex = loadStateNotSerialized('StreamItems')

    if (typeof StreamIndex === 'undefined') {
      StreamIndex = `${Song.id}`
    } else {
      StreamIndex = `${StreamIndex},${Song.id}`
    }

    postList(Song)
      .then(({ data }) => {
        if (data.success) {
          dispatch(loadData())
        }
      })
      .catch(err => console.log(err))
  }
}

export const changeSong = song => {
  return (dispatch, getState) => {
    const { items, song: songList } = getState().player
    const newState = setupState(items, song, songList)
    saveState('AppState', newState)
    dispatch(updateSong(newState))
  }
}

export const nextSong = () => {
  return (dispatch, getState) => {
    const { items, next, song: songList } = getState().player
    const newState = setupState(items, next, songList)
    saveState('AppState', newState)
    dispatch(updateSong(newState))
  }
}

export const prevSong = () => {
  return (dispatch, getState) => {
    const { items, prev, song: songList } = getState().player
    const newState = setupState(items, prev, songList)
    saveState('AppState', newState)
    dispatch(updateSong(newState))
  }
}

export const loadData = () => {
  return (dispatch, getState) => {
    const { loop, volume } = getState().player

    loadSongs()
      .then(({ data }) => {
        const items = data
        const storageLoop = loadState('loop')
        const appState = loadState('AppState')

        if (!items) return false

        const foo = Object.keys(items)

        if (foo.length > 0) {
          const initial = foo[0] || null

          loadSong()
            .then(({ data }) => {
              const song = data
              dispatch(fooSong(song))

              const initialData = Object.values(song)[0]
              const arr = Object.values(foo)
              const findIndex = arr.indexOf(initial)
              const prevItem = findIndex - 1
              const nextItem = findIndex + 1
              const prevFinal = arr[prevItem]
              const nextFinal = arr[nextItem]

              const loadedData = {
                prev: typeof appState !== 'undefined' ? appState.prev : prevFinal,
                next: typeof appState !== 'undefined' ? appState.next : nextFinal,
                url: typeof appState !== 'undefined' ? appState.url : initialData.song.url,
                loop: typeof storageLoop !== 'undefined' ? storageLoop : loop,
                volume: typeof appState !== 'undefined' ? appState.volume : volume,
                index: typeof appState !== 'undefined' ? appState.index : initialData.song.id,
                duration: typeof appState !== 'undefined' ? appState.duration : initialData.song.duration,
                items: items,
                loaded: 0
              }

              dispatch(bootData(loadedData))
            })
        }
      })
  }
}

export default ActionTypes
