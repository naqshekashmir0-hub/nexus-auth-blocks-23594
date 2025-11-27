// Auth API endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/v1/admin/login',
  REGISTER: '/api/v1/admin/register',
  LOGOUT: '/api/v1/admin/logout',
  REFRESH_TOKEN: '/api/v1/admin/refresh',
  VERIFY_EMAIL: '/api/v1/admin/verify-email',
  FORGOT_PASSWORD: '/api/v1/admin/forgot-password',
  RESET_PASSWORD: '/api/v1/admin/reset-password',
  ME: '/api/v1/admin/me',
} as const;

// Brand API endpoints
export const BRAND_ENDPOINTS = {
  CREATE: '/api/v1/admin/add-brand',
  LIST: '/api/v1/admin/brands',
  UPDATE: '/api/v1/admin/update-brand',
  DELETE: '/api/v1/admin/delete-brand',
} as const;
