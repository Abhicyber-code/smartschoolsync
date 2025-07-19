
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.189.184:4000/api';

// 🔹 Axios client configured with baseURL and default headers
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// 🔒 Automatically inject token into every request
apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('parentToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

/**
 * 🔐 Login parent user and persist token + userId.
 */
export const loginParent = async (email, password) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

        const userId = data?.data?.user?._id;
        const token = data?.data?.token;

        if (!userId || !token) {
            throw new Error('Invalid login response. Missing userId or token.');
        }

        await AsyncStorage.multiSet([
            ['parentUserId', userId],
            ['parentToken', token],
        ]);

        return data;
    } catch (error) {
        console.error('❌ Parent login failed:', error?.response?.data || error.message);
        throw error;
    }
};

/**
 * 👨‍👧 Fetch students linked to the logged-in parent.
 */
export const fetchParentStudent = async () => {
    try {
        const userId = await AsyncStorage.getItem('parentUserId');
        if (!userId) throw new Error('Parent user ID is missing in storage.');

        const { data } = await apiClient.get(`/students/parent/${userId}`);
        return data?.data || [];
    } catch (error) {
        console.error('❌ Failed to fetch parent’s students:', error?.response?.data || error.message);
        throw error;
    }
};

/**
 * 🕓 Fetch daycare history for a specific student in a date range.
 */
export const fetchDaycareHistory = async (studentId, fromDate, toDate) => {
    if (!studentId || !fromDate || !toDate) {
        throw new Error('Student ID and date range are required.');
    }

    try {
        const token = await AsyncStorage.getItem('parentToken');
        if (!token) throw new Error('Authentication token not found in storage.');

        const url = `${API_BASE_URL}/daycare/history/${studentId}?fromDate=${fromDate}&toDate=${toDate}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json?.message || 'Failed to fetch daycare history.');
        }

        return json?.data || [];
    } catch (error) {
        console.error('❌ Daycare history fetch failed:', error.message);
        throw error;
    }
};
