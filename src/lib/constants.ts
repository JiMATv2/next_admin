// API and Endpoint Configuration
export const PHX_HTTP_PROTOCOL = 'http://';  // or 'http://' if not using HTTPS
export const PHX_ENDPOINT = 'localhost:4000';  // Replace with your actual API endpoint

// Cookie Names
export const PHX_COOKIE = 'phx_cookie';  // Replace with your actual cookie name

// Other Constants
export const API_VERSION = 'v1';
export const DEFAULT_LANGUAGE = 'en';

// Timeouts (in milliseconds)
export const API_TIMEOUT = 30000;  // 30 seconds

// Feature Flags
export const ENABLE_FEATURE_X = true;
export const ENABLE_FEATURE_Y = false;

// Environment-specific constants (you might want to use environment variables for these)
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const DEBUG_MODE = !IS_PRODUCTION;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// Routes
export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const DASHBOARD_ROUTE = '/dashboard';

// Local Storage Keys
export const USER_PREFERENCES_KEY = 'user_preferences';
export const AUTH_TOKEN_KEY = 'auth_token';