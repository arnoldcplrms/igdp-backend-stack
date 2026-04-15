export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomPhone(index: number) {
  return `+63917${String(1000000 + index).slice(1)}`;
}

export function shuffle<T>(arr: T[]) {
  return arr
    .map((v) => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
}

export function shuffles<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function getFullName(a: any) {
  return `${a.firstName ?? ''} ${a.lastName ?? ''}`.trim() || `Account-${a.id}`;
}
