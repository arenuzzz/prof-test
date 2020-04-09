import axios from 'axios';

import { isDev, PROFILER_ENDPOINT } from '@root/settings/env';
import { SearchType } from '@features/search/search.constants';

import { createProfilerApi } from './profiler.api';

const profilerApi = createProfilerApi({
  endpoint: PROFILER_ENDPOINT,
  axios,
});

if (isDev) {
  // import('./mock').then(({ mockAxiosApi }) => {
  //   mockAxiosApi(profilerApi.api);
  // });
}

// profilerApi
//   .getProfilesAutocompleteResults({ groupId: 20, initialsParts: 'Rofl' })
//   .then((data) => {
//     console.log('data', data);
//   });

export { profilerApi };
export * from './profiler.types';
export * from './profiler.constants';
