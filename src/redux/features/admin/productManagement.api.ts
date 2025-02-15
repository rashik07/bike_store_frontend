


import {
  TProduct,
  TQueryParam,
  TResponseRedux,
} from '../../../types';

import { baseApi } from '../../api/baseApi';

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/products',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    addProductManagement: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductManagementMutation,
} = productManagementApi;
