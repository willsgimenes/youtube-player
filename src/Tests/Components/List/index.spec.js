/* global describe */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import List from '../../../components/List/List'
import SongsComponent from '../../../Views/Playlist/songs'

Enzyme.configure({ adapter: new Adapter() })

describe('List component', () => {
  it('should render properly', () => {
    const wrapper = shallow(<List children={<SongsComponent />} />)
    expect(wrapper.find('.list-container')).toHaveLength(1)
  })

  it('should have an children component', () => {
    const wrapper = shallow(<List children={<SongsComponent />} />)
    expect(wrapper.instance().props.children).toBeDefined()
  })
})
