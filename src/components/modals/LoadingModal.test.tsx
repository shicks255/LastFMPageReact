import { screen } from '@testing-library/react';

import LoadingModal from '@/components/modals/LoadingModal';
import customRender from '@/mocks/utils';

test('should render loading spinner', async () => {
  const { container } = customRender(<LoadingModal />);

  const loadingSpinner = container.getElementsByClassName('fa-compact-disc');

  expect(loadingSpinner[0]).toBeInTheDocument();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
