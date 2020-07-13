/* global describe */
/* global it */
/* global expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Sidebar } from '../../../components/Sidebar/Sidebar'

Enzyme.configure({ adapter: new Adapter() })

describe('List component', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Sidebar />)
    expect(wrapper.find('.tab-nav')).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })
})

it('should have only two links', () => {
  const wrapper = shallow(<Sidebar />)
  expect(wrapper.find('ul li')).toHaveLength(2)
  expect(wrapper).toMatchSnapshot()
})
