import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Radar from './Radar';
import customRender from '@/mocks/utils';

test('should render radar chart', async () => {
  customRender(<Radar />);

  expect(await screen.findByText('Scrobbles Per Year Radar')).toBeInTheDocument();
  expect(await screen.findByText('Scrobbles Per Year Radar')).toBeInTheDocument();
  expect(await screen.findByText('Scrobbles Per Day Radar')).toBeInTheDocument();
});

test.skip('should render radar and changing month', async () => {
  customRender(<Radar />);
});
