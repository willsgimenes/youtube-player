/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Prev from '../../../components/player/Prev'

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
  'StreamItems-1e3ab948-3f79-898d-89e4-75460be2d2a8',
  {
    id: '1e3ab948-3f79-898d-89e4-75460be2d2a8',
    song: {
      url: 'foobar',
      duration: 133
    }
  }
)

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

Enzyme.configure({ adapter: new Adapter() })

describe('Prev button', () => {
  let wrapper, store, initialState

  beforeEach(() => {
    initialState = {
      player: {
        index: '123',
        items: [
          '1e3ab948-3f79-898d-89e4-75460be2d2a8',
          'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
          '96b5cfb5-103e-84a7-b2d1-7e01bf30d9ac'
        ],
        prev: '1e3ab948-3f79-898d-89e4-75460be2d2a8',
        song: {
          '1e3ab948-3f79-898d-89e4-75460be2d2a8': {
            'id': '1e3ab948-3f79-898d-89e4-75460be2d2a8',
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
          'id': '1e3ab948-3f79-898d-89e4-75460be2d2a8'
        }
      }
    }

    store = mockStore(initialState)
    wrapper = shallow(<Prev store={store} />)
  })

  it('should render properly', () => {
    expect(wrapper.dive().find('button')).toHaveLength(1)
  })

  it('should have index prop', () => {
    expect(wrapper.props().index).toBeDefined()
  })

  it('should simulate click', () => {
    const mockAction = [
      {
        'payload': {
          'duration': 242,
          'index': '1e3ab948-3f79-898d-89e4-75460be2d2a8',
          'loaded': 0,
          'next': 'ab22c7b8-c23b-fd41-ed6e-4bc3489737de',
          'played': 0,
          'prev': undefined,
          'url': 'https://www.youtube.com/watch?v=dr3md9saDwk'
        },
        'type': 'CHANGE_SONG'
      }
    ]

    wrapper = shallow(<Prev store={store} />)
    wrapper.dive().find('button').simulate('click')
    const actions = wrapper.props().store.getActions()
    expect(actions).toEqual(mockAction)
  })
})
