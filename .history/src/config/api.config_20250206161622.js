// src/config/api.config.js

const API_CONFIG = {
    // Base URL for your backend API
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    
    // Authentication endpoints
    AUTH: {
        SIGNUP: '/api/auth/signup',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        REFRESH_TOKEN: '/api/auth/refresh-token',
    },
    
    // Social auth credentials
    SOCIAL_AUTH: {
        GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
    },
    
    // API version
    API_VERSION: 'v1',
    
    // Request timeout in milliseconds
    TIMEOUT: 15000,
};

// Headers configuration
export const getHeaders = (token = null) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

export default API_CONFIG;