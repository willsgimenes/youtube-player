/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
/* global jest */

import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Song from '../../../components/Song'

import toJson from 'enzyme-to-json'
import 'jest-styled-components'

Enzyme.configure({ adapter: new Adapter() })

describe('<Song />', () => {
  let
    wrapper,
    initialState

  beforeEach(() => {
    initialState = {
      item: 1,
      index: 1,
      id: 1,
      title: 1,
      songId: 1,
      prettyDuration: 1,
      author: 1,
      handleClick: jest.fn()
    }

    wrapper = mount(<Song {...initialState} />)
  })

  it('should render properly', () => {
    expect(wrapper.find('li')).toHaveLength(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should have song--active class', () => {
    initialState = {
      item: 1,
      index: 1,
      id: 1,
      title: 1,
      songId: 1,
      prettyDuration: 1,
      author: 1,
      handleClick: jest.fn()
    }

    wrapper = shallow(<Song {...initialState} />)

    expect(wrapper).toHaveStyleRule('background', '#eaeaea')
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should test handleClick function', () => {
    initialState = {
      item: 1,
      index: { id: 1 },
      id: 1,
      title: 1,
      songId: 1,
      prettyDuration: 1,
      author: 1,
      handleClick: jest.fn()
    }

    wrapper = shallow(<Song {...initialState} />)

    const instance = wrapper.instance()
    const spy = jest.spyOn(instance.props, 'handleClick')
    instance.forceUpdate()
    wrapper.dive().find('li').simulate('click')
    expect(spy).toHaveBeenCalled()
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
