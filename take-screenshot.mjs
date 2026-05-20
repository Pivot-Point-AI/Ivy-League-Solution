import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: 1440, height: 900 });
await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await p.screenshot({ path: 'hero-wait.png' });
await p.evaluate(() => window.scrollTo(0, 900));
await p.waitForTimeout(800);
await p.screenshot({ path: 'services-wait.png' });
await p.evaluate(() => window.scrollTo(0, 1900));
await p.waitForTimeout(800);
await p.screenshot({ path: 'why-wait.png' });
await p.evaluate(() => window.scrollTo(0, 2900));
await p.waitForTimeout(800);
await p.screenshot({ path: 'contact-wait.png' });
await b.close();
console.log('done');
