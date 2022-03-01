import { ReactElement } from 'react';

import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { ApiContextProvider } from '@/contexts/ApiContext';
import { LocalStateProvider } from '@/contexts/LocalStateContext';
import { ModalContextProvider } from '@/contexts/ModalContext';

const customRender = (
  ui: ReactElement,
  route?: string,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const queryClient = new QueryClient();
  return render(
    <MemoryRouter>
      <LocalStateProvider>
        <QueryClientProvider client={queryClient}>
          <ApiContextProvider>
            <ModalContextProvider>{ui}</ModalContextProvider>
          </ApiContextProvider>
        </QueryClientProvider>
      </LocalStateProvider>
    </MemoryRouter>,
    options
  );
};

export default customRender;
