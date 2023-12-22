function isEven(num: number) {
  return num % 2 === 0;
}
console.log(isEven(2));

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('isEven', () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(1)).toBe(false);
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
    expect(isEven(4)).toBe(true);
  });
}
