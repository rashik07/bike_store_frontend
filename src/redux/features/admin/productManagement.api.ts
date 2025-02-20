import { TProduct, TQueryParam, TResponseRedux } from "../../../types";

import { baseApi } from "../../api/baseApi";

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
          url: "/products",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return { data: response.data, meta: response.meta };
      },
      // providesTags: [ 'products' ],
    }),

    getProductById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
    }),


    addProductManagement: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductManagementMutation,
  useDeleteProductMutation,
} = productManagementApi;
