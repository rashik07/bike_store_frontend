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
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/products',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addProductManagement: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      
      }),
    }),
    // getAcademicFaculties: builder.query({
    //   query: () => {
    //     return { url: '/academic-faculties', method: 'GET' };
    //   },
    //   transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    // addAcademicFaculty: builder.mutation({
    //   query: (data) => ({
    //     url: '/academic-faculties/create-academic-faculty',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    // getAcademicDepartments: builder.query({
    //   query: () => {
    //     return { url: '/academic-departments', method: 'GET' };
    //   },
    //   transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    // addAcademicDepartment: builder.mutation({
    //   query: (data) => ({
    //     url: '/academic-departments/create-academic-department',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductManagementMutation,
  // useGetAcademicDepartmentsQuery,
  // useGetAcademicFacultiesQuery,
} = productManagementApi;
