import MockAdapter from 'axios-mock-adapter';
import { AxiosStatic, AxiosInstance } from 'axios';

export function mockAxiosApi(axios: AxiosStatic | AxiosInstance) {
  const mock = new MockAdapter(axios);

  // mock.onGet('/users/email').reply(200, {
  //   data: true,
  //   error: null,
  // });
}
