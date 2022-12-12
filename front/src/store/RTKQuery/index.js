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
    })
})

export const {
    useGetTopSalesQuery,
    useGetCategoriesQuery,
    useGetCatalogListQuery,
} = dataApi;
