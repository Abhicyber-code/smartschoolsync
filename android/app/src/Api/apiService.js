import AsyncStorage from '@react-native-async-storage/async-storage';
import { myAxiosPostRequest } from './baseApi';
import Toast from 'react-native-toast-message';

export const markInOut = async (studentId, action, setLoading) => {
    try {
        setLoading(true);
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWMzMDcwYTEwZWI1ZTY5YTFhYTZhZiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0OTEyMDE3NCwiZXhwIjoxNzQ5MTM4MTc0fQ.SdS5BqD4Hwcc9cNGk7NvAArfR9pkvqRWUjMdTjaE_9Y";

        const res = await myAxiosPostRequest(
            'daycare/checkinout',
            { studentId, action },
            { Authorization: `Bearer ${token}` }
        );

        setLoading(false);

        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res.data?.message || `Marked ${action.toUpperCase()} successfully`,
            position: 'bottom',
            visibilityTime: 3000,
        });

        return res.data;
    } catch (error) {
        setLoading(false);
        const message = error.response?.data?.message || `Failed to mark ${action.toUpperCase()}`;
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: message,
            position: 'bottom',
            visibilityTime: 4000,
        });
        throw error;
    }
};
