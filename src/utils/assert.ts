export function assertValue<T>(value: T, key?: string): asserts value {
  if (typeof value === 'undefined' || value === null) {
    throw new Error(`${key ?? 'Value'} is not defined!`);
  }
}
