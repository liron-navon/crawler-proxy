/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fetch/fetch.ts":
/*!****************************!*\
  !*** ./src/fetch/fetch.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const requestPromise = __webpack_require__(/*! request-promise */ "request-promise");
const fetchHTMLWithPuppeteer_1 = __webpack_require__(/*! ./fetchHTMLWithPuppeteer */ "./src/fetch/fetchHTMLWithPuppeteer.ts");
const requestOptions = {
    // followAllRedirects: true,
    transform: (body, response, resolveWithFullResponse) => {
        return {
            destination: response.request.uri.href,
            html: body
        };
    },
};
exports.fetchPLAIN = (url) => {
    return requestPromise(Object.assign({}, requestOptions, { url }));
};
exports.fetchRENDER = (url) => fetchHTMLWithPuppeteer_1.default(url);


/***/ }),

/***/ "./src/fetch/fetchHTMLWithPuppeteer.ts":
/*!*********************************************!*\
  !*** ./src/fetch/fetchHTMLWithPuppeteer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = __webpack_require__(/*! puppeteer */ "puppeteer");
// keep the browser alive as a singleton
let _browser = null;
// get a new browser page, make sure to call .close() when done with it
const getNewPage = () => __awaiter(this, void 0, void 0, function* () {
    if (!_browser) {
        _browser = yield puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
    }
    return yield _browser.newPage();
});
const fetch = (url) => __awaiter(this, void 0, void 0, function* () {
    const page = yield getNewPage();
    yield page.goto(url, { waitUntil: 'networkidle2' });
    const html = yield page.content();
    const output = {
        html,
        destination: page.url
    };
    yield page.close();
    return output;
});
exports.default = fetch;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const cors = __webpack_require__(/*! cors */ "cors");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const routes_1 = __webpack_require__(/*! ./routes */ "./src/routes/index.ts");
// import './proxylist-refresher/proxyListRefresher';
const PORT = process.env.PORT || 3000;
const app = express();
process.on('uncaughtException', function (err) {
    console.error('UNCAUGHT EXCEPTION', err.stack, err.message);
});
const bodyParserOptions = { parameterLimit: 100000, type: 'application/json', limit: 1024 * 1024 * 300 };
app.use(cors());
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded(Object.assign({ extended: false }, bodyParserOptions)));
app.use(function (req, res, next) {
    const url = req.method + ' - ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(url);
    next();
});
app.use('/', routes_1.default);
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        message: 'something broke!',
        error: err
    });
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));


/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(/*! express */ "express");
const fetch_1 = __webpack_require__(/*! ../fetch/fetch */ "./src/fetch/fetch.ts");
const router = express_1.Router();
const getUrlFrom = (identifier, url) => {
    const index = url.indexOf(identifier) + identifier.length;
    return url.substr(index);
};
router.get('/crawl-plain/:url*', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const url = getUrlFrom('/crawl-plain/', req.url);
    const { destination, html } = yield fetch_1.fetchPLAIN(url);
    res.setHeader('x-final-destination', destination);
    res.send(html);
}));
router.get('/crawl-render/:url*', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const url = getUrlFrom('/crawl-render/', req.url);
    const { destination, html } = yield fetch_1.fetchRENDER(url);
    res.setHeader('x-final-destination', destination);
    res.send(html);
}));
exports.default = router;


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map