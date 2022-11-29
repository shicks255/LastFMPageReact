import { screen } from '@testing-library/react';

import Tree from '../Tree';
import customRender from '@/mocks/utils';

test('should render bump chart for artists', async () => {
  customRender(<Tree />);

  expect(await screen.findByText('Scrobbles Heat Maps')).toBeInTheDocument();
});
