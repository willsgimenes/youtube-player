export default function (string, length) {
  var truncatedString = string

  if (string.length >= length) { truncatedString = string.substring(0, length - 3) + '...' }

  return truncatedString
}
