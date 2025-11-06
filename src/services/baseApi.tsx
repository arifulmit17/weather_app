// src/services/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


import type { RootState } from "@/Redux/store/store.js";
import { tokenManager } from "@/lib/tokenManager.js";
import { logout } from "@/Redux/features/auth/authSlice.js";


const baseUrl = "http://127.0.0.1/api";
// const baseUrl = "http://192.168.0.8:8000/api";

// Common headers for JSON requests
const getCommonHeaders = (token: string | null, isFormData = false) => {
  const headers = new Headers({
    'Accept': 'application/json',
  });

  if (!isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'same-origin',
  prepareHeaders: (headers, { getState }) => {
    const token = tokenManager.getAccessToken() || (getState() as RootState).auth.token;

    if (!token) {
      console.warn('[api.baseQuery] No auth token found');
    }

    // RTK Query headers object does not know if payload is FormData, so we skip Content-Type
    // The actual check is done in baseQuery below
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",

  baseQuery: async (args, apiObj, extraOptions) => {
    const token = tokenManager.getAccessToken();
    if (!token && apiObj.endpoint !== 'login') {
      console.warn('[api.baseQuery] Request blocked - no token:', apiObj.endpoint);
      apiObj.dispatch(logout());
      window.location.href = '/login';
      return { error: { status: 401, data: 'No auth token' } };
    }

    // Adjust headers for FormData
    if (typeof args === 'object' && args !== null && args.body instanceof FormData) {
      // Don't set Content-Type for FormData
      const headers = getCommonHeaders(token, true);
      const newArgs = { ...args, headers };
      return await rawBaseQuery(newArgs, apiObj, extraOptions);
    }

    // Otherwise, normal JSON request
    const headers = getCommonHeaders(token);
    if (typeof args === 'object' && args !== null) {
      args = { ...args, headers };
    }

    return await rawBaseQuery(args, apiObj, extraOptions);
  },

  tagTypes: ["User", "Brand", "Category", "Product", "Order", "Branch", 'Country', "Unit", "BranchTransfer", "Employee", "Client", "Supplier","SalesCommission","CommercialInvoice","TermCondition"],
  endpoints: () => ({}),
});
