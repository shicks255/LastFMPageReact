import { within } from '@testing-library/react';
import { screen } from '@testing-library/react';

import BumpChart from '@/components/visuals/BumpChart';
import customRender from '@/mocks/utils';

test.skip('should render bump chart', async () => {
  customRender(<BumpChart />);

  await screen.findByText('ahhhh');

  screen.debug(undefined, 40000);
});
