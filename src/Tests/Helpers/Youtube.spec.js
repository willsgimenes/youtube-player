/* global describe */
/* global it */
/* global expect */

import mockAxios from '../../__mocks__/axios'

import { fetchVideo, getVideoByTitle } from '../../Helpers/Youtube'

const videoMock = [
  {
    'kind': 'youtube#searchResult',
    'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/XfcVIz9X8hwAlqPX6GXj3SHKV4Y"',
    'id': {
      'kind': 'youtube#video',
      'videoId': 'EBqDyAvv-_M'
    },
    'snippet': {
      'publishedAt': '2016-07-29T13:34:30.000Z',
      'channelId': 'UCcjL1ThzNG55k4S4QYaj9NQ',
      'title': 'Mobile Suit Gundam Wing opening 1',
      'description': '',
      'channelTitle': 'Zeero Yuy',
      'liveBroadcastContent': 'none'
    }
  },
  {
    'kind': 'youtube#searchResult',
    'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/jJbwQ78UzVfiimumEr9Y07yiVC0"',
    'id': {
      'kind': 'youtube#video',
      'videoId': 'qne9tNhOF1U'
    },
    'snippet': {
      'publishedAt': '2017-09-01T03:00:01.000Z',
      'channelId': 'UCejtUitnpnf8Be-v5NuDSLw',
      'title': 'MOBILE SUIT GUNDAM WING HD REMASTER - Episode 1 (EN.HK.TW.KR Sub)',
      'description': 'GUNDAM.INFO | The official Gundam news and video portal website http://gundam.info/',
      'channelTitle': 'GundamInfo',
      'liveBroadcastContent': 'none'
    }
  }
]

describe('Youtube Api Service', () => {
  it('should search for a video list given a search Term', () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { items: videoMock }
      })
    )

    return fetchVideo('Gundam Wing').then(({ data: { items } }) => {
      expect(items).toEqual(videoMock)
    })
  })
})

describe('getSongContent', () => {
  it('should get video contentDetails', () => {
    mockAxios.get
      .mockImplementationOnce(() => Promise.resolve({ data: { items: videoMock } }))

    return getVideoByTitle(videoMock)
      .then(response => {
        expect(response).toBeDefined()
      })
  })

  it('should fail when get video data', () => {
    mockAxios.get
      .mockImplementationOnce(() => Promise.reject(new Error('error')))

    return getVideoByTitle(videoMock)
      .catch(e => { expect(e).toBeDefined() })
  })
})
