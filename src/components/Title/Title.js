import React from 'react'
import { loadState } from '../../Helpers/Localstorage'

const Title = (props) => {
  const id = loadState('StreamItems-' + props.Id) || null

  if (id !== null) {
    return (
      <p className='truncate'>{id.title}</p>
    )
  } else {
    return (
      <p>no title</p>
    )
  }
}

export default Title
