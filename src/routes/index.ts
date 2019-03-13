import { Router, Response, Request } from 'express';
import { fetchPLAIN, fetchRENDER } from '../fetch/fetch';
import * as proxy from 'express-http-proxy';
import { getIP } from 'src/utils/getIP';

const router = Router();

const getUrlFrom = (identifier, url) => {
    const index = url.indexOf(identifier) + identifier.length;
    return url.substr(index);
};

// proxy to download html and return the final destination
router.get('/crawl-plain/:url*', async (req: Request, res: Response) => {
    const url = getUrlFrom('/crawl-plain/', req.url);
    const { destination, html } = await fetchPLAIN(url);
    console.log('x-final-destination', destination);
    res.setHeader('x-final-destination', destination);
    res.send(html);
});

// proxy ssr
router.get('/crawl-render/:url*', async (req: Request, res: Response) => {
    const url = getUrlFrom('/crawl-render/', req.url);
    const { destination, html } = await fetchRENDER(url);
    console.log('x-final-destination', destination);
    res.setHeader('x-final-destination', destination);
    res.send(html);
});

// if you need a regular proxy
router.get('/proxy', proxy(getIP()));

// if you need a regular on a specific host
router.get('/proxy/:host*', (req, res, next) => {
    return proxy(req.params.host)(req, res, next);
});

export default router;
