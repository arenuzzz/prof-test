import * as _ from 'lodash';
import { createStore, createEffect, createEvent } from '@lib/effector';
import { ResponseResult, Error, profilerApi } from '@api/profiler';
import { TrueCallerData } from '../search.types';
import { mockTrueCallerData } from './__mocks__/truecaller';

type FetchingStore<T> = {
  isLoading: boolean;
  data: T | null;
  error: null | Error;
};

type TrueCallerDataResult = ResponseResult<TrueCallerData>;

export const fxCheckPhone = createEffect<string, TrueCallerDataResult, any>();

export const $trueCallerData = createStore<FetchingStore<TrueCallerData>>({
  isLoading: false,
  data: null,
  error: null,
});

$trueCallerData
  .on(fxCheckPhone, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  }))
  .on(fxCheckPhone.done, (state, { result }) => ({
    ...state,
    isLoading: false,
    error: result[0],
    data: result[1],
  }));

const mockData: ResponseResult<TrueCallerData> = [null, mockTrueCallerData];

const checkPhoneNumberMock = (
  phoneNumber
): Promise<ResponseResult<TrueCallerData>> =>
  new Promise((resolve) => {
    // console.log('checkPhoneNumberMock api', phoneNumber);
    setTimeout(() => {
      resolve(mockData);
    }, 300);
  });

// fxCheckPhone.use((phoneNumber) => checkPhoneNumberMock(phoneNumber));
fxCheckPhone.use((phoneNumber) => profilerApi.checkPhoneNumber(phoneNumber));
// const throttleCheckPhoneNumber = _.throttle(checkPhoneNumberMock, 1000);

// fxCheckPhone.finally.watch((data) => console.log('phoneData', data));
// $trueCallerData.watch((data) => console.log('____DATA', data));
