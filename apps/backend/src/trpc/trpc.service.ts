import { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

function delay(value: any, timeout: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, timeout);
  });
}

@Injectable()
export class TrpcService {
  // Singleton scope is used for injection by default so `t` is created only once
  t = initTRPC.create()

  appRouter = this.t.router({
    hello: this.t.procedure
      .input(
        z.object({
          text: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const result = await delay(input.text, 1000);
        return {
          greeting: `Hello ${result} from Backend`,
        };
      }),
  })


  applyMiddleware(app: NestExpressApplication) {
    app.use(
      "/api/trpc",
      createExpressMiddleware({
        router: this.appRouter,
      })
    )
  }
}

export type AppRouter = TrpcService[`appRouter`];
