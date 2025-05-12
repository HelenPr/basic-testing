import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test.each([
    [{ a: 2, b: 3, action: Action.Add }, 5],
    [{ a: 2, b: -3, action: Action.Add }, -1],
    [{ a: 2, b: Infinity, action: Action.Add }, Infinity],
  ])('should add two numbers', (input, expectedResult) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expectedResult);
  });

  test.each([
    [{ a: 3, b: 2, action: Action.Subtract }, 1],
    [{ a: 3, b: -2, action: Action.Subtract }, 5],
    [{ a: 3, b: Infinity, action: Action.Subtract }, -Infinity],
  ])('should subtract two numbers', (input, expectedResult) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expectedResult);
  });

  test.each([
    [{ a: 5, b: 5, action: Action.Multiply }, 25],
    [{ a: 5, b: 0, action: Action.Multiply }, 0],
    [{ a: 5, b: Infinity, action: Action.Multiply }, Infinity],
  ])('should multiply two numbers', (input, expectedResult) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expectedResult);
  });

  test.each([
    [{ a: 25, b: 5, action: Action.Divide }, 5],
    [{ a: 25, b: 0, action: Action.Divide }, Infinity],
    [{ a: 25, b: Infinity, action: Action.Divide }, 0],
  ])('should divide two numbers', (input, expectedResult) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expectedResult);
  });

  test.each([
    [{ a: 2, b: 5, action: Action.Exponentiate }, 32],
    [{ a: 2, b: -3, action: Action.Exponentiate }, 0.125],
    [{ a: 2, b: Infinity, action: Action.Exponentiate }, Infinity],
  ])('should exponentiate two numbers', (input, expectedResult) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expectedResult);
  });

  test.each([
    [{ a: 2, b: 5, action: '&' }, null],
    [{ a: 2, b: 5, action: '//' }, null],
  ])('should return null for invalid action', (input, expectedResult) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expectedResult);
  });

  test.each([
    [{ a: [], b: NaN, action: Action.Add }, null],
    [{ a: null, b: 0, action: Action.Subtract }, null],
  ])('should return null for invalid arguments', (input, expectedResult) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expectedResult);
  });
});
