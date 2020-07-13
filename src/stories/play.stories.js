import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs/react'

import Song from '../components/Song/'

const stories = storiesOf('Song component', module)
stories
  .addDecorator(withKnobs)

stories
  .add('with text', () => {
    const config = {
      id: 1,
      songId: text('Thumbnail', '_Ek5dFjkhfc'),
      handleClick: () => {},
      index: number('Index', 1),
      item: number('Item', 1),
      title: text('Title', 'きみの中の永遠'),
      author: text('Author', '機動武闘伝Gガンダム'),
      prettyDuration: text('Duration', '01:34')
    }

    return (
      <div style={{ width: 300 }}>
        <Song {...config} />
      </div>
    )
  })
