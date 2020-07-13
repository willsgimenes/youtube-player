/* global localStorage */

export const loadState = (state) => {
  try {
    const serializedState = localStorage.getItem(state)

    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {}
  }
}

export const loadStateNotSerialized = (state) => {
  const serializedState = localStorage.getItem(state)
  if (serializedState === null) {
    return undefined
  }
  return serializedState
}

export const saveState = (state, value) => {
  let serializedState = value

  if (typeof serializedState === 'string') {
    localStorage.setItem(state, serializedState)
  } else {
    serializedState = JSON.stringify(value)
    localStorage.setItem(state, serializedState)
  }
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
}
