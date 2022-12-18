import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Line from '../Line';
import LineGraph from './LineChart';
import customRender from '@/mocks/utils';

test('should render line graph', async () => {
  customRender(<Line />);

  expect(await screen.findByText('Scrobbles Line Chart')).toBeInTheDocument();
});

test.skip('should render line graph for albums', async () => {
  customRender(<Line />);

  const select = await screen.findAllByRole('combobox');
  userEvent.selectOptions(select[1], 'Albums');

  //   expect(await screen.findByText())
});
