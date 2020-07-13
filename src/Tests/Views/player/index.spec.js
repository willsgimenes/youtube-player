/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
/* global jest */

import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'

import PlayerView from '../../../Views/Player/index'

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

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares)

Enzyme.configure({ adapter: new Adapter() })

saveState(
  'StreamItems',
  '8e5cde91-5170-f6fd-b210-eeda77e5a00e,ab22c7b8-c23b-fd41-ed6e-4bc3489737de,96b5cfb5-103e-84a7-b2d1-7e01bf30d9ac,4a9ce343-b5fe-99e5-ff90-643ee3886971'
)

saveState(
  'StreamItems-8e5cde91-5170-f6fd-b210-eeda77e5a00e',
  {
    'song': {
      'id': 'oBxZ8CkIwYM',
      'duration': 302,
      'title': 'Yukie Nakama - Makenai Ai Ga Kitto Aru',
      'author': 'Hoodie',
      'type': 'youTube',
      'prettyDuration': '05:02',
      'url': 'https://youtu.be/oBxZ8CkIwYM',
      'cleanTitle': 'Yukie Nakama - Makenai Ai Ga Kitto Aru'
    },
    'title': 'Yukie Nakama - Makenai Ai Ga Kitto Aru',
    'sequence': 5630000,
    'id': '8e5cde91-5170-f6fd-b210-eeda77e5a00e',
    'playedRecently': true,
    'active': false,
    'listItemType': 'streamItem'
  }
)

saveState(
  'StreamItems-ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
  {
    'song': {
      'id': 'oBxZ8CkIwYM',
      'duration': 302,
      'title': 'Yukie Nakama - Makenai Ai Ga Kitto Aru',
      'author': 'Hoodie',
      'type': 'youTube',
      'prettyDuration': '05:02',
      'url': 'https://youtu.be/oBxZ8CkIwYM',
      'cleanTitle': 'Yukie Nakama - Makenai Ai Ga Kitto Aru'
    },
    'title': 'Yukie Nakama - Makenai Ai Ga Kitto Aru',
    'sequence': 5630000,
    'id': 'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
    'playedRecently': true,
    'active': false,
    'listItemType': 'streamItem'
  }
)

describe('Player View', () => {
  let
    wrapper,
    store,
    initialState

  beforeEach(() => {
    initialState = {
      player: {
        played: 0,
        isSeeking: false
      }
    }

    store = mockStore(initialState)
    wrapper = shallow(<PlayerView store={store} />)
  })

  it('should render properly', () => {
    const dive = wrapper.dive()
    expect(dive.find('div.player')).toHaveLength(1)
  })

  describe('Player View -> Load data', () => {
    it('should load initial data to setup player view', () => {
      const loadedState = {
        player: {
          'playing': false,
          'url': 'https://youtu.be/oBxZ8CkIwYM',
          'prev': 'undefined',
          'next': 'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
          'index': 'oBxZ8CkIwYM',
          'volume': 1,
          'loop': true,
          'duration': 302,
          seeking: false
        }
      }

      const newStore = mockStore(loadedState)
      const wrapper = shallow(<PlayerView store={newStore} />)
      expect(wrapper.props().store.getState()).toEqual(loadedState)
    })
  })

  describe('Player View -> action handlers', () => {
    it('should test handlePause', () => {
      const wrapper = shallow(<PlayerView store={store} />).dive()
      const spy = jest.spyOn(wrapper.instance(), 'handlePause')
      wrapper.instance().forceUpdate()
      wrapper.find('.react-player').props().onPause(spy)
      expect(spy).toBeCalled()
    })

    it('should test handleStart', () => {
      const wrapper = shallow(<PlayerView store={store} />).dive()
      const spy = jest.spyOn(wrapper.instance(), 'handleStart')
      wrapper.instance().forceUpdate()
      wrapper.find('.react-player').props().onPlay(spy)
      expect(spy).toBeCalled()
    })

    it('should test onProgress', () => {
      const wrapper = shallow(<PlayerView store={store} />).dive()
      const spy = jest.spyOn(wrapper.instance(), 'onProgress')
      wrapper.instance().forceUpdate()
      wrapper.find('.react-player').props().onProgress(spy)
      expect(spy).toBeCalled()
    })

    it('should test onProgress seeking', () => {
      const wrapper = shallow(<PlayerView store={store} />).dive()
      wrapper.setState({ isSeeking: true })
      const spy = jest.spyOn(wrapper.instance(), 'onProgress')
      wrapper.find('.react-player').props().onProgress(spy)
    })

    it('should test onSeekMouseDown', () => {
      const e = { target: { value: 10 } }
      const wrapper = shallow(<PlayerView store={store} />).dive()
      wrapper.instance().forceUpdate()
      wrapper.instance().onSeekMouseDown(e)
    })

    it('should test onSeekChange', () => {
      const wrapper = shallow(<PlayerView store={store} />).dive()
      wrapper.instance().forceUpdate()
      wrapper.instance().onSeekChange()
    })

    it('should test onSeekMouseUp', () => {
      const e = { target: { value: 10 } }
      const wrapper = shallow(<PlayerView store={store} />).dive()
      wrapper.instance().player = { seekTo: jest.fn(() => {}) }
      wrapper.instance().forceUpdate()
      wrapper.instance().onSeekMouseUp(e)
    })

    it('should test react-player ref', () => {
      const loadedState = {
        player: {
          'playing': false,
          'url': 'https://youtu.be/oBxZ8CkIwYM',
          'prev': 'undefined',
          'next': 'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
          'index': 'oBxZ8CkIwYM',
          'volume': 1,
          'loop': true,
          'duration': 302,
          seeking: false
        }
      }

      const newStore = mockStore(loadedState)
      const mockRef = jest.fn()

      const wrapper = mount(
        <Provider store={newStore}>
          <PlayerView />
        </Provider>)
      wrapper.instance().player = { player: mockRef() }
      expect(mockRef).toBeCalled()
    })

    it('should test onError method', () => {
      const spy = jest.spyOn(wrapper.dive().instance(), 'onError')
      wrapper.dive().find('.react-player').props().onError(spy)
    })

    it('should test afterBack', () => {
      const newState = {
        player: {
          'playing': false,
          'url': 'https://youtu.be/oBxZ8CkIwYM',
          'prev': 'undefined',
          'next': 'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
          'index': 'oBxZ8CkIwYM',
          'volume': 1,
          'loop': true,
          'duration': 302,
          seeking: false
        }
      }
      const newStore = mockStore(newState)
      const wrapper = shallow(<PlayerView store={newStore} />).dive()
      const spy = jest.spyOn(wrapper.instance(), 'afterBack')
      wrapper.find('.react-player').props().onEnded(spy)
      expect(spy).toBeCalled()
    })

    it('should test afterBack with loop false', () => {
      const newState = {
        player: {
          'items': [
            '1e3ab948-3f79-898d-89e4-75460be2d2a8',
            'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
            '96b5cfb5-103e-84a7-b2d1-7e01bf30d9ac',
            '4a9ce343-b5fe-99e5-ff90-643ee3886971',
            '560ce0d5-6edb-2cc3-7d06-d08787107b60'
          ],
          'playing': false,
          'url': 'https://youtu.be/oBxZ8CkIwYM',
          'prev': 'undefined',
          'next': 'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
          'index': '1e3ab948-3f79-898d-89e4-75460be2d2a8',
          'volume': 1,
          'loop': false,
          'duration': 302,
          seeking: false,
          song: {
            'ab22c7b8-c23b-fd41-ed6e-4bc3489737de': {
              'id': 'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
              song: {
                'type': 'youtube',
                'title': 'Major S4 Ame Nochi Niji Iro with lyrics',
                'duration': 242,
                'author': 'Sun Tatsunari',
                'prettyDuration': '04:02',
                'url': 'https://www.youtube.com/watch?v=dr3md9saDwk',
                'cleanTitle': 'Major S4 Ame Nochi Niji Iro with lyrics'
              }
            },
            'title': 'Major S4 Ame Nochi Niji Iro with lyrics',
            'id': 'ab22c7b8-c23b-fd41-ed6e-4bc3489737de'
          }
        }
      }
      const newStore = mockStore(newState)
      const wrapper = shallow(<PlayerView store={newStore} />).dive()
      const spy = jest.spyOn(wrapper.instance(), 'afterBack')
      wrapper.find('.react-player').props().onEnded(spy)
      expect(spy).toBeCalled()
    })
  })
})
