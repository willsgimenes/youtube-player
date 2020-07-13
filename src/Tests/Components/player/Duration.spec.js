/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import DurationComponent from '../../../components/player/Duration'

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares)

Enzyme.configure({ adapter: new Adapter() })

describe('Duration component', () => {
  let wrapper, store, initialState

  beforeEach(() => {
    initialState = {
      player: {
        duration: 62
      }
    }
    store = mockStore(initialState)
    wrapper = shallow(<DurationComponent store={store} />)
  })

  it('should render properly', () => {
    const dive = wrapper.dive()
    expect(dive.find('div')).toHaveLength(1)
  })

  it('should format time properly', () => {
    const dive = wrapper.dive()
    expect(dive.find('time').text()).toEqual('1:02')
  })

  it('should format time with hour', () => {
    initialState = {
      player: {
        duration: 6000
      }
    }
    store = mockStore(initialState)
    wrapper = shallow(<DurationComponent store={store} />)

    const dive = wrapper.dive()
    expect(dive.find('time').text()).toEqual('1:40:00')
  })
})
