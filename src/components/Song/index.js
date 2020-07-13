import React from 'react'
import truncateString from '../../Helpers/Truncate'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const Wrapper = styled.li`
  background: ${props => props.active ? '#eaeaea' : '#fff'}
  margin: 5px 0 5px 10px;
  clear: both;
  list-style: none;
  cursor: pointer;
  display: flex;
  height: 79px;
`
const Thumbnail = styled.div`
  width: 40%;
  float: left;
  background: #ccc;
  position: relative;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
  z-index: 1;
`

const Duration = styled.div`
  background: rgba(0, 0, 0, .7);
  color: #fff;
  bottom: 3px;
  right: 3px;
  position: absolute;
  z-index: 2;
  font-size: .9em;
  padding: 3px 4px;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
`

const SongInfo = styled.div`
  padding: 0 5px;
`

const SongTitle = styled.div`
  font-weight: bold;
  width: 100%;
  position: relative;
  margin-bottom: 10px;
`

const SongAuthor = styled.div`
  margin-bottom: 10px;
`

const SongText = styled.div`
  font-size: 1.1em;
  margin: 0;
  width: 165px;
  line-height: 1.4em;

`

class Song extends React.Component {
  render () {
    const {
      item,
      index,
      id,
      title,
      songId,
      prettyDuration,
      author,
      handleClick
    } = this.props

    return (
      <Wrapper
        active={index === item}
        key={id}
        onClick={() => handleClick(this.props)}
        data-cy={`song-${id}`}
        data-active={index === item}
      >
        <Thumbnail>
          <Img src={`https://img.youtube.com/vi/${songId}/default.jpg`} alt='' />
          <Duration>
            {prettyDuration}
          </Duration>
        </Thumbnail>

        <SongInfo>
          <SongTitle>
            <SongText>{truncateString(title, 40)}</SongText>
          </SongTitle>
          <SongAuthor>
            {author}
          </SongAuthor>
        </SongInfo>
      </Wrapper>
    )
  }
}

Song.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default Song
