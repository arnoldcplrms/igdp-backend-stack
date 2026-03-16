import { PAGE_SIZE_COUNT } from 'src/common/constants';

export const MAX_RESULTS_LIMIT = PAGE_SIZE_COUNT;
export const DEFAULT_RESULTS_LIMIT = PAGE_SIZE_COUNT;

export function clampPaginationLimit(
  limit?: number,
  defaultLimit: number = DEFAULT_RESULTS_LIMIT,
): number {
  const normalized = Number.isFinite(limit)
    ? Number(limit)
    : Number(defaultLimit);

  if (normalized < 1) {
    return 1;
  }

  return Math.min(normalized, MAX_RESULTS_LIMIT);
}

export function toOverfetchTake(
  limit?: number,
  defaultLimit: number = DEFAULT_RESULTS_LIMIT,
): number {
  return clampPaginationLimit(limit, defaultLimit) + 1;
}
