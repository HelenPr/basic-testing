import { simpleCalculator, Action } from './index';

const testCasesForAddAction = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: -7, action: Action.Add, expected: -2 },
  { a: 5, b: Infinity, action: Action.Add, expected: Infinity },
];

const testCasesForSubtractAction = [
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 0, b: 2, action: Action.Subtract, expected: -2 },
  { a: 0, b: Infinity, action: Action.Subtract, expected: -Infinity },
];

const testCasesForDivideAction = [
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 100, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 100, action: Action.Divide, expected: 0 },
  { a: 100, b: Infinity, action: Action.Divide, expected: 0 },
];

const testCasesForMultiplyAction = [
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: -10, b: 2, action: Action.Multiply, expected: -20 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },
  { a: 100, b: Infinity, action: Action.Multiply, expected: Infinity },
];

const testCasesForExponentiateAction = [
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 2, b: -3, action: Action.Exponentiate, expected: 0.125 },
  { a: 2, b: Infinity, action: Action.Exponentiate, expected: Infinity },
];

const testCasesForActions = [
  ...testCasesForAddAction,
  ...testCasesForSubtractAction,
  ...testCasesForDivideAction,
  ...testCasesForMultiplyAction,
  ...testCasesForExponentiateAction,
];

const testCasesForInvalidArgs = [
  { a: '15', b: 5, action: Action.Add, expected: null },
  { a: 5, b: '2', action: Action.Subtract, expected: null },
  { a: undefined, b: 7, action: Action.Divide, expected: null },
  { a: null, b: 4, action: Action.Multiply, expected: null },
  { a: 1, b: [], action: Action.Exponentiate, expected: null },
];

const testCasesForInvalidAction = [
  { a: 10, b: 5, action: 'invalid', expected: null },
  { a: 12, b: 2, action: '%', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCasesForActions)(
    'should return $expected when $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test.each(testCasesForInvalidArgs)(
    'should return null for invalid arguments: a = $a, b = $b, action = $action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test.each(testCasesForInvalidAction)(
    'should return null for invalid action: action = $action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
