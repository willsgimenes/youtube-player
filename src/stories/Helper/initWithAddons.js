import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { Provider } from 'react-redux'
import { action } from '@storybook/addon-actions'

const store = {
  getState: () => {
    return {
      player: {
        playing: false
      }
    }
  },
  subscribe: () => 0,
  dispatch: action('dispatch')
}

const createStory = (title) => {
  const stories = storiesOf(title || 'Story', module)
  stories.addDecorator(withKnobs)
  stories.addDecorator(story => (
    <Provider store={store}>{story()}</Provider>
  ))

  return stories
}

export default createStory
