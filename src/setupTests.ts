import '@testing-library/jest-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { configure } from '@testing-library/dom';
import { MockedRequest } from 'msw';

import server from '@/mocks/server';

configure({
  asyncUtilTimeout: 2000
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
