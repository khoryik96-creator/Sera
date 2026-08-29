export function validReaderTimestamp(value: unknown): value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return false;
  return !Number.isNaN(new Date(value).getTime());
}

export function uniqueStrings(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

export function uniqueBy<T>(values: readonly T[], key: (value: T) => string): boolean {
  const seen = new Set<string>();
  for (const value of values) {
    const id = key(value);
    if (seen.has(id)) return false;
    seen.add(id);
  }
  return true;
}
