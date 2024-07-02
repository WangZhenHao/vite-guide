import { isJSRequest } from '../utils.js'
import { transformRequest } from '../transformRequest.js'
import send from './send.js'

const knownIgnoreList = new Set(["/", "/favicon.ico"]);

function transformMiddleware(server) {
    return async function viteTransformMiddleware(req, res, next) {
        if (req.method !== "GET" || knownIgnoreList.has(req.url)) {
            return next();
        }

        const url = req.url

        if(isJSRequest(url)) {

            const result = await transformRequest(url, server, {})
            if(result) {
                return send(req, res, result, 'js')
            }

            return next()
        }

        next();
    };
}

export default transformMiddleware;
