export const prettyDuration = time => {
  const string = time.match(/(\d+)(?=[MHS])/ig) || []

  return string.map(function (item) {
    if (item.length < 2) return '0' + item
    return item
  }).join(':')
}

export const converToSeconds = time => {
  const string = time.match(/(\d+)(?=[MHS])/ig) || []

  const parsed = string.map(function (item) {
    if (item.length < 2) return '0' + item
    return item
  }).join(':')

  return parsed.split(':').reduce((acc, time) => (60 * acc) + +time)
}
