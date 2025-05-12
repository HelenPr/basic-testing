import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'value';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Error message';
    const throwErrorFn = () => throwError(errorMessage);
    expect(throwErrorFn).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    const throwErrorFn = () => throwError();
    expect(throwErrorFn).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const errorMessage = 'This is my awesome custom error!';
    try {
      throwCustomError();
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(MyAwesomeError);
        expect(error.message).toBe(errorMessage);
      } else {
        throw new Error('Caught unknown exception');
      }
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const errorMessage = 'This is my awesome custom error!';
    try {
      await rejectCustomError();
    } catch (error) {
      if (error instanceof MyAwesomeError) {
        expect(error.message).toBe(errorMessage);
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });
});
