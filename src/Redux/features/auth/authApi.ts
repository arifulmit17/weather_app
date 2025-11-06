// src/services/authApi.ts

import { api } from "@/services/baseApi.js";



export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { access_token: string; refreshToken: string; user: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
