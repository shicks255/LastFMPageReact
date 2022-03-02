import { within } from '@testing-library/react';
import { screen } from '@testing-library/react';

import TracksTable from '@/components/top/TracksTable';
import customRender from '@/mocks/utils';

test('should render album table', async () => {
  customRender(<TracksTable />);

  expect(await screen.findByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
  expect(await screen.findByRole('columnheader', { name: 'Artist' })).toBeInTheDocument();
  expect(await screen.findByRole('columnheader', { name: 'Plays' })).toBeInTheDocument();
  expect(await screen.findByRole('columnheader', { name: 'Length' })).toBeInTheDocument();
});

test('should render correct amount of track rows', async () => {
  customRender(<TracksTable />);

  const rows = await screen.findAllByRole('row');

  expect(rows.length).toBe(2);
});

test('should render the first album row correctly', async () => {
  customRender(<TracksTable />);

  const firstRow = await screen.findAllByRole('row');

  expect(await within(firstRow[1]).findByRole('cell', { name: 'Pink Floyd' })).toBeInTheDocument();
  expect(await within(firstRow[1]).findByRole('cell', { name: 'Money' })).toBeInTheDocument();
  expect(await within(firstRow[1]).findByRole('cell', { name: '5:00' })).toBeInTheDocument();
  expect(await within(firstRow[1]).findByRole('cell', { name: '100' })).toBeInTheDocument();
});
