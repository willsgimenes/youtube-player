/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import VolumeControl from '../../../components/player/VolumeControl'

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

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

Enzyme.configure({ adapter: new Adapter() })

describe('Volume Control', () => {
  let
    wrapper,
    store,
    initialState

  beforeEach(() => {
    initialState = {
      player: {
        volumeModal: true,
        volume: 0.8
      }
    }

    store = mockStore(initialState)
    wrapper = shallow(<VolumeControl store={store} />)
  })

  it('should render properly', () => {
    expect(wrapper.dive().find('button')).toHaveLength(1)
  })

  it('should toggle volume on change', () => {
    const mockAction = [
      {
        payload: 0.9,
        type: 'SET_VOLUME'
      }
    ]

    wrapper = shallow(<VolumeControl store={store} />)
    wrapper.dive().find('.volume-slider')
      .simulate('change', { target: { value: 0.9 } })

    const actions = wrapper.props().store.getActions()
    expect(actions).toEqual(mockAction)
  })

  it('should toggle volume modal state hide/show', () => {
    const newInitialState = {
      player: {
        volumeModal: false
      }
    }

    const mockAction = [
      {
        payload: true,
        type: 'OPEN_VOLUMEMODAL'
      }
    ]

    store = mockStore(newInitialState)

    wrapper = shallow(<VolumeControl store={store} />)
    wrapper.dive().find('.volume-container > i')
      .simulate('click')

    const actions = wrapper.props().store.getActions()
    expect(actions).toEqual(mockAction)
  })
})
