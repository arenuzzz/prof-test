import { SearchActionButtonType } from './../../features/search/search.constants';
import * as _ from 'lodash';
import qs from 'qs';
import { AxiosResponse } from 'axios';
import { SearchVariant } from '@features/search/search.constants';
import * as types from './profiler.types';
import { COMPANY_DOMAIN_NAME } from '../../settings/env';
import { mockApi } from './__mocks__/api';

export const createProfilerApi: types.CreateProfilerApi = ({
  endpoint,
  axios,
}) => {
  const api = axios.create({
    baseURL: endpoint,
    headers: {
      'Content-Type': 'application/json',
    },
    // validateStatus: () => true,
  });

  // const requestErrorHandlerInterceptor = api.interceptors.request.use(function(
  //   config
  // ) {
  //   return config;
  // },
  // _handleInterceptorError);

  // const responseErrorHandlerInterceptor = api.interceptors.response.use(
  //   function(response) {
  //     const error = response.data.error;

  //     if (error) {
  //       console.error('Response Error', error);
  //     }

  //     return response;
  //   },
  //   _handleInterceptorError
  // );

  // function _handleInterceptorError(error) {
  //   console.error('Error', error);
  //   console.error('Response error', error.response);

  //   if (error.response && error.response.data && error.response.data) {
  //     return Promise.resolve<{ data: types.Response<any> }>(
  //       error.response.data
  //     );
  //   }

  //   const customError = {
  //     message: error.message,
  //     error: error.message,
  //     status: error.request.status,
  //   };

  //   console.error('Custom error', customError);

  //   return Promise.resolve<{ data: types.Response<any> }>({
  //     data: { error: customError },
  //   });
  // }

  const signIn: types.SignIn = (params) => {
    return api
      .post<types.SignInData>('/auth/login', params)
      .then(_handleResponse);
  };

  const signUp: types.SignUp = (params) => {
    return api
      .post<types.SignUpData>('/auth/signup', params)
      .then(_handleResponse);
  };

  const getSession: types.GetSession = () => {
    return api.get<types.GetSessionData>('/users/me').then(_handleResponse);
  };

  const checkRegisteredEmail: types.CheckRegisteredEmail = (email) => {
    return api
      .post<types.CheckRegisteredEmailData>(`/validate/email/${email}/exist`)
      .then(_handleResponse);
  };

  const getCountries: types.GetCountries = () => {
    return api
      .get<types.GetCountriesData>(`/countries.json`, { baseURL: '' })
      .then((res) => [null, res.data]);
  };

  const checkPhoneNumber: types.CheckPhoneNumber = (phoneNumber) => {
    return api
      .get<types.CheckPhoneNumberData>(
        `/profiles/phones/${encodeURIComponent(phoneNumber)}`
      )
      .then(_handleResponse);
  };

  // type SParams = {
  //   type: 'INSTAGRAM' | 'TELEGRAM';
  //   value: string;
  // };

  // const getProfiles = (data: SParams) => {
  //   return api.post('http://46.101.98.38:8080/api/parse', data).then((res) => {
  //     return res.data;
  //   });
  // };

  const getProfilesResults: types.GetProfilesResults = (params) => {
    return api
      .get<types.GetProfilesResultsData>(`/profiles`, {
        params,
      })
      .then((res) => res.data);
  };

  const getProfilesAutocompleteResults: types.GetProfilesAutocompleteResults = (
    params
  ) => {
    // return mockApi.getGroupProfilesAutocompleteResults(params);

    return api
      .get<types.GetProfilesAutocompleteResultsData>(`/profiles/autocomplete`, {
        params,
      })
      .then((res) => res.data);
  };

  const getProfilesCounts: types.GetProfilesCounts = (params) => {
    return api
      .get<types.GetProfilesCountsData>(`/profiles/count`, { params })
      .then((res) => res.data);
  };

  const getProfilesAllCounts: types.GetProfilesAllCounts = (params) => {
    return axios
      .all([
        getProfilesCounts({ ...params, isBackground: false }),
        getProfilesCounts({ ...params, isBackground: true }),
      ])
      .then(
        axios.spread((externalData, backgroundData) => {
          return {
            [SearchVariant.EXTERNAL]: externalData,
            [SearchVariant.BACKGROUND]: backgroundData,
          };
        })
      );
  };

  const setProfileToBgSearch: types.SetProfileToBgSearch = (params) => {
    return api
      .post<types.SetProfileToBgSearchData>(`/profiles/background`, params)
      .then((res) => res.data);
  };

  const delProfileFromBgSearch: types.DelProfileFromBgSearch = (params) => {
    return api
      .delete<types.DelProfileFromBgSearchData>(`/profiles`, {
        params,
        paramsSerializer: _paramsSerializer,
      })
      .then((res) => res.data);
  };

  const setTrackedProfiles: types.SetTrackedProfiles = ({ ids: data }) => {
    return api
      .post<types.SetTrackedProfilesData>(`/profiles`, data)
      .then((res) => res.data);
  };

  const getCoordinatesByPlace: types.GetCoordinatesByPlace = (params) => {
    return api
      .get<types.GetCoordinatesByPlaceData>(`/profiles/coordinates`, {
        params,
      })
      .then((res) => res.data);
  };

  const getCompanyPermissions: types.GetCompanyPermissions = () => {
    const name = COMPANY_DOMAIN_NAME;

    return api
      .get<types.GetCompanyPermissionsData>(`/companies/${name}/permissions`)
      .then((res) => res.data);
  };

  const getGroupsResults: types.GetGroupsResults = (params) => {
    return api
      .get<types.GetGroupsResultsData>(`/groups/search`, {
        params,
        paramsSerializer: _paramsSerializer,
      })
      .then((res) => res.data);
  };

  const getGroupById: types.GetGroupById = (id) => {
    return api
      .get<types.GetGroupByIdData>(`/groups/${id}`, {
        // params: { id },
      })
      .then((res) => res.data);
  };

  const getGroupsCounts: types.GetGroupsCounts = (params) => {
    return api
      .get<types.GetGroupsCountsData>(`/groups/search/count`, {
        params,
        paramsSerializer: _paramsSerializer,
      })
      .then((res) => res.data);
  };

  const getAllGroupsCounts: types.GetAllGroupsCounts = (params) => {
    return axios
      .all([
        getGroupsCounts({ ...params, searchType: SearchVariant.EXTERNAL }),
        getGroupsCounts({ ...params, searchType: SearchVariant.INTERNAL }),
      ])
      .then(
        axios.spread((externalData, internalData) => {
          return {
            [SearchVariant.EXTERNAL]: externalData,
            [SearchVariant.INTERNAL]: internalData,
          };
        })
      );
  };

  const setTrackedGroups: types.SetTrackedGroups = ({ ids }) => {
    return api
      .put<types.SetTrackedGroupsData>(`/groups`, null, {
        params: { ids },
        paramsSerializer: _paramsSerializer,
      })
      .then((res) => res.data);
  };

  const setStatusGroups: types.SetStatusGroups = ({ ids, type }) => {
    if (type === SearchActionButtonType.DELETE) {
      return api
        .delete<types.SetStatusGroupsData>(`/groups`, {
          params: { ids },
          paramsSerializer: _paramsSerializer,
        })
        .then((res) => res.data);
    }

    return Promise.resolve({});
  };

  const getMessagesCount: types.GetMessagesCount = (params) => {
    return api
      .get<types.GetMessagesCountData>(`/messages/search/count`, {
        params,
        paramsSerializer: _paramsSerializer,
      })
      .then((res) => res.data);
  };

  const getMessages: types.GetMessages = (params) => {
    return api
      .get<types.GetMessagesData>(`/messages/search`, {
        params,
        paramsSerializer: _paramsSerializer,
      })
      .then((res) => res.data);
  };

  const sendMessage: types.SendMessage = (data) => {
    return api
      .post<types.SendMessageData>(`/messages`, data)
      .then((res) => res.data);
  };

  return {
    api,
    signIn,
    signUp,
    getSession,
    checkRegisteredEmail,
    getCountries,
    checkPhoneNumber: _.memoize(checkPhoneNumber),
    getProfilesResults,
    getProfilesAutocompleteResults,
    getProfilesCounts,
    getProfilesAllCounts,
    setProfileToBgSearch,
    delProfileFromBgSearch,
    setTrackedProfiles,
    getCoordinatesByPlace,
    getCompanyPermissions,
    getGroupsResults,
    getGroupById,
    getAllGroupsCounts,
    getGroupsCounts,
    setTrackedGroups,
    setStatusGroups,
    getMessagesCount,
    getMessages,
    sendMessage,
  };

  function _paramsSerializer(params) {
    return qs.stringify(params, { indices: false });
  }

  function _handleResponse<T>(
    res: AxiosResponse<types.Response<T>>
  ): types.ResponseResult<T> {
    return [res.data.error || null, res.data.data || null];
  }
};
