import React from 'react'

const SearchInput = props => {
  const {
    handleChange,
    term
  } = props

  return (
    <input
      className='search__input'
      type='text'
      value={term}
      onChange={handleChange}
    />
  )
}

export default SearchInput
