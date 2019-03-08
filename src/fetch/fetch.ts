import * as requestPromise from 'request-promise';
import fetchHTMLWithPuppeteer from './fetchHTMLWithPuppeteer';

const requestOptions = {
    // followAllRedirects: true,
    transform: (body, response, resolveWithFullResponse) => {
        return {
            destination: response.request.uri.href,
            html: body
        };
    },
};

export const fetchPLAIN = (url: string): Promise<{ html: string, destination: string }> => {
    return requestPromise({
        ...requestOptions,
        url
    }) as any;
};
export const fetchRENDER = (url: string): Promise<{ html: string, destination: string }> => fetchHTMLWithPuppeteer(url);
