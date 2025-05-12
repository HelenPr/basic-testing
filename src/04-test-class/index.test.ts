jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  random: jest.fn(),
}));

import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const testValue = 500;
    const account = getBankAccount(testValue);
    expect(account.getBalance()).toBe(testValue);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 600;
    const balance = 500;
    const errorMessage = `Insufficient funds: cannot withdraw more than ${balance}`;
    const account = getBankAccount(balance);
    try {
      account.withdraw(withdrawAmount);
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(InsufficientFundsError);
        expect(error.message).toBe(errorMessage);
      } else {
        throw new Error('Caught unknown exception');
      }
    }
  });

  test('should throw error when transferring more than balance', () => {
    const amountToTransfer = 600;
    const balance = 500;
    const errorMessage = `Insufficient funds: cannot withdraw more than ${balance}`;
    const accountFrom = getBankAccount(balance);
    const accountTo = getBankAccount(balance);
    try {
      accountFrom.transfer(amountToTransfer, accountTo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(InsufficientFundsError);
        expect(error.message).toBe(errorMessage);
      } else {
        throw new Error('Caught unknown exception');
      }
    }
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 500;
    const amountToTransfer = 200;
    const account = getBankAccount(balance);
    const errorMessage = 'Transfer failed';

    try {
      account.transfer(amountToTransfer, account);
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(TransferFailedError);
        expect(error.message).toBe(errorMessage);
      } else {
        throw new Error('Caught unknown exception');
      }
    }
  });

  test('should deposit money', () => {
    const balance = 500;
    const account = getBankAccount(balance);
    const depositAmount = 200;
    const newBalance = 700;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const balance = 500;
    const account = getBankAccount(balance);
    const withdrawAmount = 200;
    const newBalance = 300;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const balance = 500;
    const transferAmount = 200;
    const accountFrom = getBankAccount(balance);
    const accountTo = getBankAccount(balance);
    const newBalanceFrom = 300;
    const newBalanceTo = 700;
    accountFrom.transfer(transferAmount, accountTo);
    expect(accountFrom.getBalance()).toBe(newBalanceFrom);
    expect(accountTo.getBalance()).toBe(newBalanceTo);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 0;
    const account = getBankAccount(balance);
    const fetchedBalance = 100;
    (random as jest.Mock)
      .mockReturnValueOnce(fetchedBalance)
      .mockReturnValueOnce(1);

    const result = await account.fetchBalance();
    expect(result).toBe(fetchedBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 0;
    const account = getBankAccount(balance);
    const fetchedBalance = 100;
    (random as jest.Mock)
      .mockReturnValueOnce(fetchedBalance)
      .mockReturnValueOnce(1);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 0;
    const account = getBankAccount(balance);
    const errorMessage = 'Synchronization failed';
    (random as jest.Mock).mockReturnValueOnce(42).mockReturnValueOnce(0);

    try {
      await account.synchronizeBalance();
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(SynchronizationFailedError);
        expect(error.message).toBe(errorMessage);
      } else {
        throw new Error('Caught unknown exception');
      }
    }
  });
});
