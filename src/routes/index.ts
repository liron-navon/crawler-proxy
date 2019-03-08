import { Router, Response, Request } from 'express';
import { fetchPLAIN, fetchRENDER } from '../fetch/fetch';
const router = Router();

const getUrlFrom = (identifier, url) => {
    const index = url.indexOf(identifier) + identifier.length;
    return url.substr(index);
};

router.get('/crawl-plain/:url*', async (req: Request, res: Response) => {
    const url = getUrlFrom('/crawl-plain/', req.url);
    const { destination, html } = await fetchPLAIN(url);
    res.setHeader('x-final-destination', destination);
    res.send(html);
});

router.get('/crawl-render/:url*', async (req: Request, res: Response) => {
    const url = getUrlFrom('/crawl-render/', req.url);
    const { destination, html } = await fetchRENDER(url);
    res.setHeader('x-final-destination', destination);
    res.send(html);
});

export default router;
