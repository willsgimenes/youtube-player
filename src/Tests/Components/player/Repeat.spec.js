/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Repeat from '../../../components/player/Repeat'

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

describe('Repeat button', () => {
  let wrapper, store, initialState

  beforeEach(() => {
    initialState = {
      player: {
        loop: true
      }
    }

    store = mockStore(initialState)
    wrapper = shallow(<Repeat store={store} />)
  })

  it('should render properly', () => {
    expect(wrapper.dive().find('button')).toHaveLength(1)
  })

  it('should have loop prop', () => {
    expect(wrapper.props().loop).toBeDefined()
  })

  it('should not have class if loop === false', () => {
    initialState = {
      player: {
        loop: false
      }
    }

    store = mockStore(initialState)
    wrapper = shallow(<Repeat store={store} />).dive()
    expect(wrapper.find('i').hasClass('fa fa-repeat active')).toBe(false)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have class if loop === true', () => {
    initialState = {
      player: {
        loop: true
      }
    }

    store = mockStore(initialState)
    wrapper = shallow(<Repeat store={store} />).dive()
    expect(wrapper.find('i').hasClass('fa fa-repeat active')).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('should simulate click', () => {
    const mockAction = [
      {
        payload: false,
        type: 'SET_LOOP'
      }
    ]

    wrapper = shallow(<Repeat store={store} />)
    wrapper.dive().find('button').simulate('click')
    const actions = wrapper.props().store.getActions()
    expect(actions).toEqual(mockAction)
  })
})
