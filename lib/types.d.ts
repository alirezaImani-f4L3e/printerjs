import { PDFOptions } from "puppeteer";
type Config = {
    type: string;
    url?: string;
    content?: string;
    options?: PDFOptions;
};
export { Config };
