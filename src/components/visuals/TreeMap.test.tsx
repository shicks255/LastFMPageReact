import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TreeMaps from './TreeMaps';
import customRender from '@/mocks/utils';

test('should render bump chart for artists', async () => {
  customRender(<TreeMaps />);

  expect(await screen.findByText('Scrobbles Heat Maps')).toBeInTheDocument();
});
