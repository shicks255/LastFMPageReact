import { within } from '@testing-library/react';
import { screen } from '@testing-library/react';

import ArtistTable from '@/components/top/ArtistTable';
import customRender from '@/mocks/utils';

test.skip('should render artist table', async () => {
  customRender(<ArtistTable />);

  expect(await screen.findByRole('columnheader', { name: 'Artist' })).toBeInTheDocument();
  expect(await screen.findByRole('columnheader', { name: 'Plays' })).toBeInTheDocument();
});

test.skip('should render correct amount of album rows', async () => {
  customRender(<ArtistTable />);

  const rows = await screen.findAllByRole('row');

  expect(rows.length).toBe(2);
});

test.skip('should render the first album row correclty', async () => {
  customRender(<ArtistTable />);

  const firstRow = await screen.findAllByRole('row');

  expect(await within(firstRow[1]).findByRole('cell', { name: 'Pink Floyd' })).toBeInTheDocument();
  expect(await within(firstRow[1]).findByRole('cell', { name: '100' })).toBeInTheDocument();
});
