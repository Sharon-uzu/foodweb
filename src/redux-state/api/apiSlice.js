import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://scanorder-server.vercel.app/api/v1/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('authToken'); // ✅ Consistent key usage
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      console.log('Attached token:', token);
    } else {
      console.log('No token found');
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    // Register a new user
    signup: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Create a new service
    createService: builder.mutation({
      query: (serviceData) => ({
        url: 'user/createService',
        method: 'POST',
        body: serviceData,
      }),
    }),

    // Fetch services for the logged-in user
    getServices: builder.query({
      query: (userId) => `user/services/${userId}`,
    }),
    
    

  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateServiceMutation,
  useGetServicesQuery,
} = apiSlice;
