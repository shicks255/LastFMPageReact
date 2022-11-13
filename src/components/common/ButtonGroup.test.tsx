import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonGroup from './ButtonGroup';
import customRender from '@/mocks/utils';

test('should render buttonGroup', async () => {
  customRender(<ButtonGroup />);

  const buttons = await screen.findAllByRole('button');
  expect(buttons.length).toBe(3);
  expect(buttons[0].classList).toContain('font-semibold');
});

test.skip('should handle clicking button', async () => {
  customRender(<ButtonGroup />);

  const buttons = await screen.findAllByRole('button');
  //   console.log(buttons);
  userEvent.click(buttons[1]);

  //   screen.debug();
  expect(await screen.findByText('Ranks')).toHaveClass('font-semibold');
});
