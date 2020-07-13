/* global describe */
/* global it */
/* global expect */

import {
  prettyDuration,
  converToSeconds
} from '../../Helpers/Duration'

describe('Duration', () => {
  describe('Duration -> prettyDuration', () => {
    it('should convert PT1M33S', () => {
      expect(prettyDuration('PT1M33S')).toBe('01:33')
    })
  })

  describe('Duration -> convertToSeconds', () => {
    it('should convert 120', () => {
      expect(converToSeconds('PT1M33S')).toBe(93)
    })
  })
})
