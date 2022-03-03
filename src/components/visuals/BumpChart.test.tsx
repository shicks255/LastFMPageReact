import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BumpChart from '@/components/visuals/BumpChart';
import customRender from '@/mocks/utils';

test('should render bump chart for artists', async () => {
  customRender(<BumpChart />);

  expect(await screen.findByText('Artist Rank By Day')).toBeInTheDocument();
});

test('should render bump chart for albums', async () => {
  customRender(<BumpChart />);

  const select = await screen.findAllByRole('combobox');
  userEvent.selectOptions(select[1], 'Albums');

  expect(await screen.findByText('Album Rank By Day')).toBeInTheDocument();
});
