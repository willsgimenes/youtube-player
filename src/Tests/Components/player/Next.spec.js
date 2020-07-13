/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Next from '../../../components/player/Next'

import { saveState } from '../../../Helpers/Localstorage'

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

saveState(
  'StreamItems-ac0d862c-d702-4b13-7150-5f982a590f98',
  {
    id: 'ac0d862c-d702-4b13-7150-5f982a590f98',
    song: {
      url: 'foo',
      duration: 133
    }
  }
)

saveState(
  'StreamItems-8e5cde91-5170-f6fd-b210-eeda77e5a00e',
  {
    id: '8e5cde91-5170-f6fd-b210-eeda77e5a00e',
    song: {
      url: 'bar',
      duration: 133
    }
  }
)

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares)

Enzyme.configure({ adapter: new Adapter() })

describe('Next component', () => {
  let
    wrapper,
    initialState,
    store

  beforeEach(() => {
    initialState = {
      player: {
        index: 'a3e9bf26-903f-e050-3879-c3f5f8271efd',
        items: [
          'ac0d862c-d702-4b13-7150-5f982a590f98',
          'a3e9bf26-903f-e050-3879-c3f5f8271efd',
          '8e5cde91-5170-f6fd-b210-eeda77e5a00e'
        ],
        prev: 'ac0d862c-d702-4b13-7150-5f982a590f98',
        next: '8e5cde91-5170-f6fd-b210-eeda77e5a00e',
        song: {
          '8e5cde91-5170-f6fd-b210-eeda77e5a00e': {
            'song': {
              'id': 'dr3md9saDwk',
              'type': 'youtube',
              'title': 'Major S4 Ame Nochi Niji Iro with lyrics',
              'duration': 242,
              'author': 'Sun Tatsunari',
              'prettyDuration': '04:02',
              'url': 'https://www.youtube.com/watch?v=dr3md9saDwk',
              'cleanTitle': 'Major S4 Ame Nochi Niji Iro with lyrics'
            },
            'title': 'Major S4 Ame Nochi Niji Iro with lyrics',
            'id': '8e5cde91-5170-f6fd-b210-eeda77e5a00e'
          }
        }
      }
    }
    store = mockStore(initialState)
    wrapper = shallow(<Next store={store} />)
  })

  it('should render properly', () => {
    const dive = wrapper.dive()
    expect(dive.find('button')).toHaveLength(1)
  })

  it('should have index prop', () => {
    expect(wrapper.props().index).toBeDefined()
  })

  it('should simulate click', () => {
    const mockAction = [
      {
        'payload': {
          'duration': 242,
          'index': '8e5cde91-5170-f6fd-b210-eeda77e5a00e',
          'loaded': 0,
          'next': undefined,
          'played': 0,
          'prev': 'a3e9bf26-903f-e050-3879-c3f5f8271efd',
          'url': 'https://www.youtube.com/watch?v=dr3md9saDwk'
        },
        'type': 'CHANGE_SONG'
      }
    ]

    wrapper = shallow(<Next store={store} />)
    wrapper.dive().find('button').simulate('click')
    const actions = wrapper.props().store.getActions()
    expect(actions).toEqual(mockAction)
  })
})
