
import fs from 'fs';
import {
    cleanUrl
} from '../utils.js'
import path from 'path'

function htmlFallbackMiddleware(server) {
    const root = server.config.root
    return function viteHtmlFallbackMiddleware(req, res, next) {
        if (
            // Only accept GET or HEAD
            (req.method !== "GET" && req.method !== "HEAD") ||
            // Exclude default favicon requests
            req.url === "/favicon.ico" ||
            // Require Accept: text/html or */*
            !(
                req.headers.accept === undefined || // equivalent to `Accept: */*`
                req.headers.accept === "" || // equivalent to `Accept: */*`
                req.headers.accept.includes("text/html") ||
                req.headers.accept.includes("*/*")
            )
        ) {
            return next();
        }

        const url = cleanUrl(req.url)
        const pathname = decodeURIComponent(url)

        if(pathname.endsWith('.html')) {
            const filePath = path.join(root, pathname)
            if(fs.existsSync(filePath)) {
                req.url = url

                return next()
            }
        } else if(pathname[pathname.length - 1] === '/') {
            const filePath = path.join(root, pathname, 'index.html')

            if (fs.existsSync(filePath)) {
                const newUrl = url + 'index.html'
                req.url = newUrl
                return next()
            }
        }

        next()
    };
}

export default htmlFallbackMiddleware