import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import PropTypes from 'prop-types'

import './index.css'

class List extends React.Component {
  render () {
    const {
      children
    } = this.props

    return (
      <Scrollbars
        autoHide
        style={
          {
            width: 300,
            height: 'calc(100% - 70px)'
          }
        }>
        <ul className='list-container'>
          { children }
        </ul>
      </Scrollbars>
    )
  }
}

List.propTypes = {
  children: PropTypes.element.isRequired
}

export default List
