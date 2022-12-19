import { screen } from '@testing-library/react';

import RecentTracksTable from '@/components/recent/RecentTracksTable';
import customRender from '@/mocks/utils';

beforeAll(() => {
  Object.defineProperty(window, 'gtag', {
    writable: true,
    value: jest.fn().mockImplementation((t) => {})
  });
});

test('should render recent tracks table', async () => {
  customRender(<RecentTracksTable />);

  const albumImages = await screen.findAllByRole('img');

  expect(albumImages.length).toBe(1);
});

test('should render the correct track rows', async () => {
  const { container } = customRender(<RecentTracksTable />);

  const albumRow = await container.getElementsByClassName('flex even:bg-slate-300 odd:bg-gray-200');
  await screen.findByText('Money');

  expect(albumRow[0].childNodes[1]).toHaveTextContent('Money');
  expect(albumRow[0].childNodes[3].textContent).toMatch(new RegExp('4/25/2016'));
});
