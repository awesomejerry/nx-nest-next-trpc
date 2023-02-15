import { z } from 'zod';
import { procedure, router } from '../trpc';

function delay(value: any, timeout: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, timeout);
  });
}

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const result = await delay(input.text, 1000);
      return {
        greeting: `Hello ${result}`,
      };
    }),
});

export const appCaller = appRouter.createCaller({});

// export type definition of API
export type AppRouter = typeof appRouter;
