import puppeteer, { PDFOptions } from 'puppeteer';
import { Config } from './types';

let defaultOptions: PDFOptions = {
  margin: { top: '10px', right: '5px', bottom: '10px', left: '5px' },
  printBackground: true,
  format: 'A4',
};

class Printer {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  private async prepare(): Promise<Buffer> {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.emulateMediaType('screen');

    switch (this.config.type) {
      case 'url':
        await page.goto(this.config.url || '', { waitUntil: 'networkidle0' });
        break;
      case 'content':
        await page.setContent(this.config.content || '', { waitUntil: 'networkidle0' });
        break;
      default:
        console.log(new Error(`HTML source "${this.config.type}" is unknown.`));
        break;
    }

    const pdf = await page.pdf(this.config.options || defaultOptions);

    browser.close();

    return pdf;
  }

  public async base64(): Promise<string> {
    return (await this.prepare()).toString('base64');
  }
}

export { Printer };
