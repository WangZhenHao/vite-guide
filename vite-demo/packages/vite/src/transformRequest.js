import path from 'path'
import fsp from 'node:fs/promises'

export function transformRequest(url, server, options) {
    const cacheKey = url;

    const result = doTransform(cacheKey, server, options)

    return result
}

function resolvePath(url, config) {
    return path.resolve(config.root, url.slice(1))
}
async function doTransform(url, server, options) {
    const resolved = resolvePath(url, server.config)
    const id = resolved;
    const timestamp = Date.now()
    const module = ''

    const result = loadAndTransform(
        id,
        url,
        server,
        options,
        timestamp,
        module,
        resolved,
      )

    return result
}

async function loadAndTransform(
    id,
    url,
    server,
    options,
    timestamp,
    mod,
    resolved
) {
    let code
    try {
        code = await fsp.readFile(id, 'utf-8')
    } catch(e) {
        throw e
    }

    return code
}
