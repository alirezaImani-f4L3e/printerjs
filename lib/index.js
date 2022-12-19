"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printer = void 0;
const puppeteer_1 = require("puppeteer");
let defaultOptions = {
    margin: { top: '10px', right: '5px', bottom: '10px', left: '5px' },
    printBackground: true,
    format: 'A4',
};
class Printer {
    constructor(config) {
        this.config = config;
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.emulateMediaType('screen');
            switch (this.config.type) {
                case 'url':
                    yield page.goto(this.config.url || '', { waitUntil: 'networkidle0' });
                    break;
                case 'content':
                    yield page.setContent(this.config.content || '', { waitUntil: 'networkidle0' });
                    break;
                default:
                    console.log(new Error(`HTML source "${this.config.type}" is unknown.`));
                    break;
            }
            const pdf = yield page.pdf(this.config.options || defaultOptions);
            browser.close();
            return pdf;
        });
    }
    base64() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.prepare()).toString('base64');
        });
    }
}
exports.Printer = Printer;
