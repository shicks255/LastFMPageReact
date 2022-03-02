import { screen } from '@testing-library/react';

import NowPlaying from '@/components/NowPlaying';
import customRender from '@/mocks/utils';

test('should render nowPlaying component when a track is playing', async () => {
  customRender(<NowPlaying />);

  const images = await screen.findAllByRole('img');

  expect(images.length).toBe(2);
});
