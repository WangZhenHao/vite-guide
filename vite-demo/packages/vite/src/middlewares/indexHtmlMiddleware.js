import {
    cleanUrl
} from '../utils.js'
import fs from 'fs';
import send from './send.js'
import path from 'path'

function indexHtmlMiddleware(server) {
    const root = server.config.root

    return async function viteIndexHtmlMiddleware(req, res, next) {
        if (res.writableEnded) {
            console.log(res, '------------------>writableEnded')
            return next()
        }
        
        const url = req.url && cleanUrl(req.url)
        if(url?.endsWith('.html') && req.headers['sec-fetch-dest'] !== 'script') {
            const filePath = path.join(root, decodeURIComponent(url))

            if(fs.existsSync(filePath)) {
                try {
                    let html = fs.readFileSync(filePath, 'utf-8')
                    return send(req, res, html, 'html')
                } catch(e) {
                    return next(e)
                }
            }
        }

        next();
    };
}

export default indexHtmlMiddleware