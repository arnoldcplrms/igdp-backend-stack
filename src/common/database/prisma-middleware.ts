import { Prisma } from '@prisma/client';

export function createUpdatedAtMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    // Only intercept update operations
    if (params.action === 'update' || params.action === 'updateMany') {
      // Create a date in Philippine timezone (UTC+8)
      const now = new Date();
      const philippineOffset = 8 * 60; // Philippine time is UTC+8 (in minutes)
      const philippineTime = new Date(now.getTime() + (philippineOffset * 60 * 1000));
      
      // Set updatedAt for the data being updated
      if (params.args.data) {
        params.args.data.updatedAt = philippineTime;
      }
    }
    
    return next(params);
  };
}
