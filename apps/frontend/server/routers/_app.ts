import { z } from 'zod';
import { procedure, router } from '../trpc';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { AppRouter as BackendAppRouter } from 'apps/backend/src/trpc/trpc.service';

const client = createTRPCProxyClient<BackendAppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3333/api/trpc',
    }),
  ],
});

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async ({ input }) => {
      console.log('Frontend: Calling backend...');
      return client.hello.query(input);
      // const result = await delay(input.text, 1000);
      // return {
      //   greeting: `Hello ${result} from Frontend`,
      // };
    }),
});

export const appCaller = appRouter.createCaller({});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
