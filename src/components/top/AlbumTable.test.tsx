import { within } from '@testing-library/react';
import { screen } from '@testing-library/react';

import AlbumTable from '@/components/top/AlbumTable';
import customRender from '@/mocks/utils';

test.skip('should render album table', async () => {
  customRender(<AlbumTable />);

  expect(await screen.findByRole('columnheader', { name: 'Album' })).toBeInTheDocument();
  expect(await screen.findByRole('columnheader', { name: 'Artist' })).toBeInTheDocument();
  expect(await screen.findByRole('columnheader', { name: 'Plays' })).toBeInTheDocument();
});

test.skip('should render correct amount of album rows', async () => {
  customRender(<AlbumTable />);

  const rows = await screen.findAllByRole('row');

  expect(rows.length).toBe(2);
});

test.skip('should render the first album row correclty', async () => {
  customRender(<AlbumTable />);

  const firstRow = await screen.findAllByRole('row');

  expect(await within(firstRow[1]).findByRole('cell', { name: 'Pink Floyd' })).toBeInTheDocument();
  expect(
    await within(firstRow[1]).findByRole('cell', { name: 'Dark Side of the Moon' })
  ).toBeInTheDocument();
  expect(await within(firstRow[1]).findByRole('cell', { name: '100' })).toBeInTheDocument();
});
