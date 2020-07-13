/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
/* global jest */

import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SeekBar from '../../../components/player/SeekBar'

Enzyme.configure({ adapter: new Adapter() })

describe('Seekbar component', () => {
  let
    wrapper

  const actions = {
    played: 0.4
  }

  beforeEach(() => {
    wrapper = mount(<SeekBar {...actions} />)
  })

  it('should render properly', () => {
    expect(wrapper.find('div')).toHaveLength(1)
  })

  it('should have played prop', () => {
    expect(wrapper.props().played).toEqual(0.4)
  })

  it('should have width style equal 40%', () => {
    expect(wrapper.find('input').props().style)
      .toEqual({ backgroundSize: '40% 100%' })
  })

  it('should trigger onMouseDown event', () => {
    const input = wrapper.find('input')
    input.simulate('mousedown')
  })

  it('should trigger onChange event', () => {
    wrapper.find('input').simulate('change')
  })

  it('should trigger onMouseUp event', () => {
    const input = wrapper.find('input')
    input.simulate('mouseup')
  })

  it('should test change function', () => {
    const mockFunction = jest.fn(() => {})
    const actions = {
      onSeekChange: mockFunction
    }

    const wrapper = shallow(<SeekBar {...actions} />)
    wrapper.find('input').simulate('change')
    expect(mockFunction).toBeCalled()
  })

  it('should test form progress value', () => {
    expect(wrapper.find('progress').props().value).toBe(0.4)
  })
})
