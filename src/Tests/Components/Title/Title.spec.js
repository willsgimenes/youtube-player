/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Title from '../../../components/Title/Title'

import toJson from 'enzyme-to-json'
import 'jest-styled-components'

import { saveState } from '../../../Helpers/Localstorage'

function storageMock () {
  var storage = {}

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
      var keys = Object.keys(storage)
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

Enzyme.configure({ adapter: new Adapter() })

describe('<Title />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Title Id='ac0d862c-d702-4b13-7150-5f982a590f98' />)
  })

  it('should render properly', () => {
    expect(wrapper.find('p')).toHaveLength(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should not render title', () => {
    wrapper = shallow(<Title Id='ac0d862c-d702-4b13-7150-5f982a590f91' />)
    expect(wrapper.find('p')).toHaveLength(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
