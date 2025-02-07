// src/services/authService.js

import API_CONFIG, { getHeaders } from '../config/api.config';

class AuthService {
    static async signup(userData) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.SIGNUP}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // Store user data and token if needed
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    static async login(credentials) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.LOGIN}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store user data and token
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.LOGOUT}`, {
                method: 'POST',
                headers: getHeaders(token),
            });

            // Clear local storage
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Logout error:', error);
            // Still remove token even if API call fails
            localStorage.removeItem('token');
        }
    }
}

export default AuthService;