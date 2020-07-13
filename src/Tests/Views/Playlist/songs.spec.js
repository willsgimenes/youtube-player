/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import SongsComponent from '../../../Views/Playlist/songs'

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
    title: 'foobar',
    song: {
      id: '123',
      type: 'youtube',
      duration: 123,
      prettyDuration: 123,
      author: 'william',
      url: 'youtube',
      cleanTitle: 'test video'
    }
  }
)

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
    wrapper = shallow(<SongsComponent store={store} />)
  })

  it('should render properly', () => {
    expect(wrapper.dive().find('ul')).toHaveLength(1)
  })

  it('should simulate change song', () => {
    wrapper.props().changeSong('8e5cde91-5170-f6fd-b210-eeda77e5a00e')
  })
})
