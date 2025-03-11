import { createTuyau } from "@tuyau/client";

import { api } from '@repo/server/api'

export const client = createTuyau({ 
  api,
  // @ts-ignore 
  baseUrl: import.meta.env.VITE_API_URL,
})