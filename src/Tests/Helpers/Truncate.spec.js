/* global describe */
/* global it */
/* global expect */

import truncate from '../../Helpers/Truncate'

describe('Truncate string', () => {
  it('should truncate if string >= 40', () => {
    expect(truncate('Gundam Wing OST 3 | 02 Even If You Smile', 40))
      .toBe('Gundam Wing OST 3 | 02 Even If You Sm...')
  })

  it('should not truncate if string < 40', () => {
    expect(truncate('TMNetwork　SelfControl (480p)', 40))
      .toBe('TMNetwork　SelfControl (480p)')
  })
})
