import { TQueryParam, TResponseRedux } from '../../../types';

import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    signup: builder.mutation({
      query: (data) => ({
        url: '/users/create-customer',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,

  useChangePasswordMutation,
} = userManagementApi;
