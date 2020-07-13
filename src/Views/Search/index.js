import React from 'react'
import _ from 'lodash'
import { getVideoByTitle } from '../../Helpers/Youtube'

import List from '../../components/List/List'
import SearchInput from './search-input'

import SongsComponent from './song'

import '../../components/Search/index.css'

class SearchView extends React.Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = { items: [] }
  }

  handleChange (e) {
    const TERM = e.target.value
    this.setState({ items: [] })

    if (TERM === '') return false

    this._searchServer(TERM)
  };

  _searchServer () {
    _.debounce(function (term) {
      const getItems = getVideoByTitle(term)

      getItems
        .then(res => {
          this.setState({ items: res })
        })
    }, 2000)
  }

  render () {
    const actions = {
      handleChange: this.handleChange
    }

    return (
      <div
        className='search__container'
        style={{ 'height': '100%' }}
      >
        <SearchInput {...actions} />
        <List>
          <SongsComponent items={this.state.items} />
        </List>
      </div>
    )
  }
}

export default SearchView
