import { Prisma } from '@prisma/client';

const MANILA_OFFSET_MINUTES = 8 * 60;

function toManilaLocalDate(date: Date): Date {
  return new Date(date.getTime() + MANILA_OFFSET_MINUTES * 60 * 1000);
}

export function createUpdatedAtMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    // Only intercept update operations
    if (params.action === 'update' || params.action === 'updateMany') {
      // Set updatedAt for the data being updated
      if (params.args.data) {
        params.args.data.updatedAt = toManilaLocalDate(new Date());
      }
    }

    return next(params);
  };
}
