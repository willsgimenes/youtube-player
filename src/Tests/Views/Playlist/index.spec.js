/* global describe */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlaylistView from '../../../Views/Playlist/index'

Enzyme.configure({ adapter: new Adapter() })

describe('Playlist View', () => {
  it('should render properly', () => {
    const wrapper = shallow(<PlaylistView />)
    expect(wrapper.find('List')).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })
})
