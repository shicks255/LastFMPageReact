import { fireEvent, screen } from '@testing-library/react';

import ProfileModal from './ProfileModal';
import customRender from '@/mocks/utils';

test('should render profile', async () => {
  customRender(<ProfileModal />);
  const input = screen.getByText('Enter a new Username to display their stats');
  expect(input).toBeInTheDocument();
});

test('should be able to enter a username', async () => {
  customRender(<ProfileModal />);
  const input = screen.getByPlaceholderText('Username');

  fireEvent.change(input, { target: { value: 'newUser' } });
  expect(input).toHaveValue('newUser');
});

// test('should be able to enter a username and hit submit', async () => {
//   customRender(<ProfileModal />);
//   const input = screen.getByPlaceholderText('Username');

//   fireEvent.change(input, { target: { value: 'newUser' } });

//   const submitButton = screen.getByText('Submit');
//   fireEvent.click(submitButton);
//   screen.debug();
//   const i = await screen.findByPlaceholderText('Username');
//   expect(i).toHaveValue('');
// });
