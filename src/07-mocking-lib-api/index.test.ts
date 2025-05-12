import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  let getMock: jest.Mock;
  let dataResponseMock: AxiosResponse<{ id: number; test: string }>;
  beforeEach(() => {
    jest.clearAllMocks();
    dataResponseMock = {
      data: { id: 1, test: 'Test property' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    getMock = jest.fn().mockResolvedValue(dataResponseMock);
    (axios.create as jest.Mock).mockReturnValue({ get: getMock });
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const relativePath = '/posts';
    await throttledGetDataFromApi(relativePath);
    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    await throttledGetDataFromApi(relativePath);
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toStrictEqual(dataResponseMock.data);
  });
});
