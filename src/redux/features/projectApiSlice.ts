import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectApiSlice = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://michiley.com/api/endpoint/graphql' }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ search, page, limit, order, sort }) => ({
        url: '',
        method: 'POST',
        body: {
          query: `
            query Projects($search: String, $page: Int, $limit: Int, $order: SortOrder, $sort: String) {
              getProjects(search: $search, page: $page, limit: $limit, order: $order, sort: $sort) {
                projects {
                  _id
                  projectTitle
                  thumbnailImage
                  floorNo
                  bedroomNo
                  bathroomNo
                  balconyNo
                  unitNo
                  flatSize
                  projectType
                  projectStatus
                  projectLocation {
                    address
                  }
                  images {
                    id
                    path
                    caption
                  }
                  category {
                    categoryName
                  }
                  salesStatus
                  landArea
                  cctvAccessRole
                  carParkingSlot
                  projectFeatures {
                    name
                  }
                  facilities {
                    facility
                  }
                }
                meta {
                  page
                  limit
                  total
                  totalPage
                }
              }
            }
          `,
          variables: { search, page, limit, order, sort },
        },
      }),
    }),
  }),
});

export const { useGetProjectsQuery } = projectApiSlice;
