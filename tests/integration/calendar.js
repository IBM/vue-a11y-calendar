import test from 'ava';
import puppeteer from 'puppeteer';
import server from '../test-server';

// Set up a new server for each test
test.cb.beforeEach((t) => {
  t.context.port = ~~(Math.random() * 1000) + 8000; // eslint-disable-line no-param-reassign, no-bitwise
  t.context[`server-${t.context.port}`] = server.listen(t.context.port, 'localhost', () => { // eslint-disable-line no-param-reassign
    t.end();
  });
});

// Break down server after each test
test.afterEach.cb((t) => {
  t.context[`server-${t.context.port}`].close();
  t.end();
});

test('Today has focus', async (t) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${t.context.port}`);
  await page.press('Tab');

  const active = await page.evaluate(() => document.activeElement);

  await browser.close();

  t.is(active._prevClass, 'calendar__link'); // eslint-disable-line no-underscore-dangle
});
