# crawler proxy

A simple server to help crawl websites and bypass ip blocking or banning, it will download html and render javascript using puppeteer, and return the rendered html - protecting your computer/server ip from the target you try to scrape.

Live demo: [return a rendered github page](https://a42-crawler-proxy-1.herokuapp.com/crawl-render/https://github.com), [return an unrendered github page](https://a42-crawler-proxy-1.herokuapp.com/crawl-plain/https://github.com).
You can play around with `a42-crawler-proxy-1`, but I will probably delete 1-15 in the future, I only use them temporarily for a project.

to run:
```
npm start
```

routes:
```
GET http://localhost:3000/crawl-plain/<URL>
GET http://localhost:3000/crawl-render/<URL>

# example:

GET http://localhost:3000/crawl-plain/https://github.com
GET http://localhost:3000/crawl-render/https://github.com
```

Both routes will return plain html, `crawl-plain` is much faster since it doesn't need to run a full scale browser.
When using `crawl-render` it will run a browser and keep using it, you might want to change that behavior if you use something like aws lambda or google cloud functions - since keeping the browser alive in those would be expensive.

For redirects you can get the last destination url from the header "x-final-destination"



---

Install heroku globally and login, it causes bugs when installed as a dev dependency.

### one command
You can deploy and update in a single command using npm, just pass HNAME (heroku name) and HREG (heroku region) environment variables.
```
HNAME=my-proxy-name HREG=eu npm run heroku-deploy
HNAME=my-proxy-name npm run heroku-update

# OR using the dinos from dinos.js

npm run heroku-deploy-all
npm run heroku-update-all
```

### deploy to heroku:
```
heroku create

# when cloning
heroku git:remote -a [app name]
```

Set buildpacks for the app to run properly on heroku
```
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add jontewks/puppeteer
heroku buildpacks # should output node, and then puppeteer

# if you need asian languages like japanese and korean:
heroku buildpacks:add https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack.git
```
```
git push heroku master
```
```
heroku open
```

debug:
run: ```npm run debug```, get a websocket url and open:
```
chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&<WEBSOCKET_URL>
```

### it is recommended to spread it across regions
```
heroku create --region eu
```

### And your client code might look something like this:
```javascript
const requestPromise = require('request-promise');

// max time to wait when making requests
const maxWait = 5 * 1000; // 5 seconds
let proxyNumber = 0;

// list of proxy servers to use
const proxies = [
    'https://a42-crawler-proxy-1.herokuapp.com',
    'https://a42-crawler-proxy-2.herokuapp.com',
    'https://a42-crawler-proxy-3.herokuapp.com',
    'https://a42-crawler-proxy-4.herokuapp.com',
    'https://a42-crawler-proxy-5.herokuapp.com',
    'https://a42-crawler-proxy-6.herokuapp.com',
    'https://a42-crawler-proxy-7.herokuapp.com',
    'https://a42-crawler-proxy-8.herokuapp.com',
    'https://a42-crawler-proxy-9.herokuapp.com',
    'https://a42-crawler-proxy-10.herokuapp.com',
    'https://a42-crawler-proxy-11.herokuapp.com',
    'https://a42-crawler-proxy-12.herokuapp.com',
    'https://a42-crawler-proxy-13.herokuapp.com',
    'https://a42-crawler-proxy-14.herokuapp.com',
    'https://a42-crawler-proxy-15.herokuapp.com'
];

// used to prevent recaptcha and bot spamming detection by rotating the ip address
function getProxy(url, shouldRender = false) {
    const selectedProxy = proxies[proxyNumber];
    proxyNumber++;
    if (proxyNumber >= proxies.length) {
        proxyNumber = 0;
    }
    return selectedProxy + (shouldRender ? '/crawl-render/' : '/crawl-plain/') + url
}

// used to prevent recaptcha and bot spamming detection by varying time like e "real" user
// so rules like "10 requests in 10 seconds" won't apply to us
async function withRandomTiming(promiseCallback) {
    const randomTime = Math.random() * maxWait;
    return await new Promise(async (resolve) => {
        setTimeout(async () => {
            const result = await promiseCallback();
            resolve(result)
        }, randomTime);
    })
}

// fetch some html
export const fetchHTML = (url) => withRandomTiming(() => requestPromise(getProxy(url, false)))

// fetch some prerendered html
export const fetchRenderedHTML = (url) => withRandomTiming(() => requestPromise(getProxy(url, true)))
```
