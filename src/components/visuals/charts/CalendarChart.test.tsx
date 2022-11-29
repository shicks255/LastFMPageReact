import { screen } from '@testing-library/react';

import Calendar from '@/components/visuals/Calendar';
import customRender from '@/mocks/utils';

test('should render calendar', async () => {
  customRender(<Calendar />);

  expect(await screen.findByText('Scrobble Calendar')).toBeInTheDocument();
});
