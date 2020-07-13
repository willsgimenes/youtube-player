/* global describe */
/* global it */
/* global expect */

import { createModel } from '../../Helpers/Model'

const MockSong = {
  name: 'foo bar',
  duration: 63,
  prettyDuration: '01:03'
}

function isGuid (guid) {
  const regexGuid =
    /^({)?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(})?$/gi

  return regexGuid.test(guid)
}

describe('Create Song model', () => {
  it('should create a song model', () => {
    const SongModel = createModel(MockSong)
    expect(isGuid(SongModel.id)).toBe(true)
  })
})
