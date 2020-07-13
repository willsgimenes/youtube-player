/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Play from '../../../components/player/Play'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

Enzyme.configure({ adapter: new Adapter() })

describe('Play button', () => {
  let wrapper, store, initialState

  beforeEach(() => {
    initialState = {
      player: {
        playing: false
      }
    }
    store = mockStore(initialState)
    wrapper = shallow(<Play store={store} />)
  })

  it('should have the playing props equals false', () => {
    expect(wrapper.props().playing).toBe(false)
  })

  it('should render properly', () => {
    const newInitialState = {
      player: {
        playing: false
      }
    }

    const newStore = mockStore(newInitialState)
    const newWrapper = mount(<Play store={newStore} />)
    expect(newWrapper.find('button')).toHaveLength(1)
  })

  it('should have the playing props equals true', () => {
    initialState = {
      player: {
        playing: true
      }
    }
    store = mockStore(initialState)
    wrapper = shallow(<Play store={store} />)

    expect(wrapper.props().playing).toBe(true)
  })

  it('should show pause icon when state.playing === true', () => {
    initialState = {
      player: {
        playing: true
      }
    }
    store = mockStore(initialState)
    wrapper = shallow(<Play store={store} />).dive()
    expect(wrapper.find('i').hasClass('fa fa-pause')).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('should show play icon when state.playing === false', () => {
    initialState = {
      player: {
        playing: false
      }
    }
    store = mockStore(initialState)
    wrapper = shallow(<Play store={store} />).dive()
    expect(wrapper.find('i').hasClass('fa fa-play')).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('should simulate click action', () => {
    wrapper.dive().simulate('click')
    const actions = wrapper.props().store.getActions()
    expect(actions).toEqual([{ payload: true, type: 'PLAY_UPDATE' }])
  })
})
