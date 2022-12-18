import { screen } from '@testing-library/react';

import SunburstChart from './SunburstChart';
import customRender from '@/mocks/utils';

test('should render sunbursh chart', async () => {
  customRender(<SunburstChart />);

  expect(await screen.findByText('Album Pie Chart')).toBeInTheDocument();
});
