import { render, waitFor, within } from '@testing-library/react';
import { screen } from '@testing-library/react';

import albumTable from '@/components/top/AlbumTable';
import AlbumTable from '@/components/top/AlbumTable';
import customRender from '@/mocks/utils';

test('should render album table', async () => {
  customRender(<AlbumTable />);

  expect(await screen.findByRole('columnheader', { name: 'Album' })).toBeInTheDocument();
  expect(await screen.findByRole('columnheader', { name: 'Artist' })).toBeInTheDocument();
  expect(await screen.findByRole('columnheader', { name: 'Plays' })).toBeInTheDocument();
});

test('should render correct amount of album rows', async () => {
  customRender(<AlbumTable />);

  const rows = await screen.findAllByRole('row');

  expect(rows.length).toBe(2);
});

test('should render the first album row correclty', async () => {
  customRender(<AlbumTable />);

  const firstRow = await screen.findAllByRole('row');

  expect(
    await within(firstRow[1]).findByRole('cell', { name: 'Glenn Campbell' })
  ).toBeInTheDocument();
  expect(
    await within(firstRow[1]).findByRole('cell', { name: 'Greatest Hits' })
  ).toBeInTheDocument();
  expect(await within(firstRow[1]).findByRole('cell', { name: '100' })).toBeInTheDocument();
});
