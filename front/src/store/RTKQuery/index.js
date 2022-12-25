import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:7070/api'}),
    endpoints: (build) => ({
        getTopSales: build.query({
            query: () => '/top-sales'

        }),
        getCategories: build.query({
            query: () => '/categories'
        }),
        getCatalogList: build.query({
            query: (catalogTabs) => ({
                url: `items${catalogTabs !== 11?`?categoryId=${catalogTabs}`: ''}`
            }),
        }),
        getInfoItem: build.query({
            query: (value) => `/items/${value}`
        }),
        addOrder: build.mutation({
            query: (body) => ({
                url: '/order',
                method: 'POST',
                body
            })
        }),
        getOrderList: build.query({
            query: () =>  '/orderList',
            keepUnusedDataFor: 5,
        }),

        deleteOrderList: build.mutation({
            query: () => ({
                url: `/deleteOrderList`,
                method: 'DELETE',
            })
        }),
        getCoincidenceList: build.query({
            query: (obj) =>  `/itemsList/${obj}`
        }),
        getFiltersList: build.query({
            query: () =>  `/filters`
        })
    })
})

export const {
  useGetTopSalesQuery,
  useGetCategoriesQuery,
  useGetCatalogListQuery,
  useGetInfoItemQuery,
  useAddOrderMutation,
  useGetOrderListQuery,
  useDeleteOrderListMutation,
  useGetCoincidenceListQuery,
  useGetFiltersListQuery,
} = dataApi;
