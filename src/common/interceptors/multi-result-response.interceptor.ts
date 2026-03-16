import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { clampPaginationLimit } from 'src/common/utils/pagination.util';
import { PAGE_SIZE_COUNT } from 'src/common/constants';

type QueryValue = string | string[] | undefined;

type MultiResultMeta = {
  page: number;
  limit: number;
  hasMore: boolean;
};

type MultiResultResponse<T> = {
  data: T[];
  meta: MultiResultMeta;
};

@Injectable()
export class MultiResultResponseInterceptor<T> implements NestInterceptor<
  T,
  T | MultiResultResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<T | MultiResultResponse<T>> {
    const request = context
      .switchToHttp()
      .getRequest<{ query?: Record<string, QueryValue> }>();

    return next.handle().pipe(
      map((response: T) => {
        if (!Array.isArray(response)) {
          return response;
        }

        const query = request?.query ?? {};
        const limit = this.resolveLimit(query);
        const page = this.resolvePage(query, limit);
        const hasMore = response.length > limit;

        return {
          data: response.slice(0, limit),
          meta: {
            page,
            limit,
            hasMore,
          },
        };
      }),
    );
  }

  private resolveLimit(query: Record<string, QueryValue>) {
    const rawLimit =
      this.toNumber(query.pageSize) ??
      this.toNumber(query.limit) ??
      this.toNumber(query.take);

    return clampPaginationLimit(rawLimit, PAGE_SIZE_COUNT);
  }

  private resolvePage(query: Record<string, QueryValue>, limit: number) {
    const page = this.toNumber(query.page);

    if (page && page > 0) {
      return page;
    }

    const skip = this.toNumber(query.skip);

    if (skip !== undefined && skip >= 0) {
      return Math.floor(skip / limit) + 1;
    }

    return 1;
  }

  private toNumber(value: QueryValue) {
    const candidate = Array.isArray(value) ? value[0] : value;

    if (!candidate) {
      return undefined;
    }

    const parsed = Number.parseInt(candidate, 10);

    return Number.isNaN(parsed) ? undefined : parsed;
  }
}
