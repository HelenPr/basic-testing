import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const delay = 1000;
    doStuffByTimeout(callback, delay);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const delay = 1000;
    doStuffByTimeout(callback, delay);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;
    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    const intervalTicks = 3;
    doStuffByInterval(callback, interval);
    jest.advanceTimersToNextTimer(intervalTicks);
    expect(callback).toHaveBeenCalledTimes(intervalTicks);
    jest.useRealTimers();
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const mockPath = 'test.txt';
    await readFileAsynchronously(mockPath);
    expect(join).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    const mockPath = 'nonexistent.txt';
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(mockPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPath = 'test.txt';
    const mockContent = Buffer.from('test content');
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(mockContent);
    const result = await readFileAsynchronously(mockPath);
    expect(result).toBe(mockContent.toString());
    expect(readFile).toHaveBeenCalledWith(join(__dirname, mockPath));
  });
});
