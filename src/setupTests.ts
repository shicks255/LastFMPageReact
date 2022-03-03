import '@testing-library/jest-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { configure } from '@testing-library/dom';

import server from '@/mocks/server';

configure({
  asyncUtilTimeout: 2000
});

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

beforeAll(() => {
  window.ResizeObserver = ResizeObserver;
  server.listen();
});

beforeEach(() => {
  jest.setTimeout(15000);
});

afterAll(() => {
  server.close();
});
