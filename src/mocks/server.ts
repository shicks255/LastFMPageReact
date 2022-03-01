import { setupServer } from 'msw/node';

import lastFmHandlers from '@/mocks/handlers/lastFmHandler';
import musicApiHandlers from '@/mocks/handlers/musicApiHandler';

const allHandlers = [...musicApiHandlers, ...lastFmHandlers];

const server = setupServer(...allHandlers);

export default server;
