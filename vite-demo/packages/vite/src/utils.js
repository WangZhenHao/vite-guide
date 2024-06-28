const postfixRE = /[?#].*$/
export function cleanUrl(url) {
  return url.replace(postfixRE, '')
}