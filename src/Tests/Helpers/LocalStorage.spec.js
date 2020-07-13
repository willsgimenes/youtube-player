/* global describe */
/* global it */
/* global expect */
/* global localStorage */

import {
  saveState,
  loadState,
  loadStateNotSerialized,
  removeItem
} from '../../Helpers/Localstorage'

function storageMock () {
  let storage = {}

  return {
    setItem: function (key, value) {
      storage[key] = value || ''
    },
    getItem: function (key) {
      return key in storage ? storage[key] : null
    },
    removeItem: function (key) {
      delete storage[key]
    },
    get length () {
      return Object.keys(storage).length
    },
    key: function (i) {
      let keys = Object.keys(storage)
      return keys[i] || null
    }
  }
}

window.localStorage = storageMock()

describe('localStorage', () => {
  describe('saveState', () => {
    it('save data properly', () => {
      saveState('loop', true)
      expect(localStorage.getItem('loop')).toBe('true')
    })
    it('save null as null value', () => {
      saveState('loop', {})
      expect(localStorage.getItem('loop')).not.toBe('true')
    })
    it('save string value', () => {
      saveState('browserSettings', 'browserSettings')
    })
  })

  describe('loadState', () => {
    it('load data properly', () => {
      localStorage.setItem('loop', true)
      expect(loadState('loop')).toBe(true)
    })

    it('no data return undefined', () => {
      expect(loadState()).toBeUndefined()
    })

    it('incorrect json object', () => {
      localStorage.setItem('loop', '')

      expect(loadState('loop')).toEqual({})
    })
  })

  describe('loadStateNotSerialized', () => {
    it('load data properly', () => {
      localStorage.setItem('loop', { foo: 'bar' })
      expect(loadStateNotSerialized('loop')).toEqual({ 'foo': 'bar' })
    })

    it('no data return undefined', () => {
      expect(loadStateNotSerialized()).toBeUndefined()
    })

    it('incorrect json object', () => {
      localStorage.setItem('loop', '')

      expect(loadState('loop')).toEqual({})
    })
  })

  describe('removeItem', () => {
    it('remove data properly', () => {
      localStorage.setItem('loop', { foo: 'bar' })
      expect(removeItem('loop')).toBeUndefined()
    })

    it('not found key', () => {
      expect(removeItem()).toBeUndefined()
    })
  })
})
