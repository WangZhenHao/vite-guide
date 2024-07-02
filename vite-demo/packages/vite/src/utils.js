
import path from 'node:path'

const postfixRE = /[?#].*$/
export function cleanUrl(url) {
  return url.replace(postfixRE, '')
}

const knownJsSrcRE =
  /\.(?:[jt]sx?|m[jt]s|vue|marko|svelte|astro|imba|mdx)(?:$|\?)/;
  
export function isJSRequest(url) {
  url = cleanUrl(url)
  if (knownJsSrcRE.test(url)) {
    return true
  }
  if (!path.extname(url) && url[url.length - 1] !== '/') {
    return true
  }
  return false
}