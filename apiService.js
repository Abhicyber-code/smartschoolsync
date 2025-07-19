

// apiService.js

import axios from 'axios';

// ✅ Base configuration
const API_BASE_URL = 'http://192.168.189.184:4000/api';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDZkMWZkOGY3Y2M5OGNkYjE5NDgxNiIsInJvbGUiOiJURUFDSEVSIiwiaWF0IjoxNzQ5NzkyOTI2LCJleHAiOjE3NDk4MTA5MjZ9.u8hhwGXTfz7TrigrGE2CD4pc62uw4sb4dRIyQ07DuAw'; // Shortened for security

console.log('🔐 Using Auth Token:', AUTH_TOKEN);

// ✅ Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

// ✅ Utility for consistent error logging
const handleApiError = (label, error) => {
    const message = error?.response?.data?.message || error.message || 'Unknown error';
    console.error(`❌ ${label}:`, message);
    throw new Error(message);
};

// ✅ Mark student as IN
export const markStudentIn = async (studentId) => {
    try {
        console.log('🟢 Marking IN:', studentId);
        const response = await axiosInstance.post('/daycare/checkinout', {
            studentId,
            action: 'in',
        });
        return response.data;
    } catch (error) {
        handleApiError('markStudentIn', error);
    }
};

// ✅ Mark student as OUT
export const markStudentOut = async (studentId) => {
    try {
        console.log('🔴 Marking OUT:', studentId);
        const response = await axiosInstance.post('/daycare/checkinout', {
            studentId,
            action: 'out',
        });
        return response.data;
    } catch (error) {
        handleApiError('markStudentOut', error);
    }
};

// ✅ Get daycare history (dynamic)
export const getDaycareHistory = async (studentId, fromDate, toDate) => {
    const url = `/daycare/history/${studentId}?fromDate=${fromDate}&toDate=${toDate}`;
    console.log('📡 Fetching daycare history:', url);

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        handleApiError('getDaycareHistory', error);
    }
};

// ✅ Fetch student list for class & section
export const getStudentList = async (studentClass = 'Nursery', section = 'A') => {
    const query = `/students?class=${studentClass}&section=${section}`;
    try {
        const response = await axiosInstance.get(query);
        console.log('📦 Student List Fetched');
        return response.data?.data || [];
    } catch (error) {
        handleApiError('getStudentList', error);
    }
};

// ✅ Fetch daycare history for a fixed student (for dev/testing only)
export const fetchDaycareHistoryForTest = async (fromDate, toDate) => {
    const HARD_CODED_ID = '6843c950d576ddb89177bbcd'; // ⚠️ Only for development
    return await getDaycareHistory(HARD_CODED_ID, fromDate, toDate);
};
