// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CommonActions } from '@react-navigation/native';
// import axios from 'axios';
// import { Alert } from 'react-native';

// let navigationRef = null;

// export const setNavigationRef = (ref) => {
//   navigationRef = ref;
// };


// //url:'https://jsonplaceholder.typicode.com/posts'

// const BASE_URL = 'http://192.168.1.4:4000/api/';

// export const myAxiosGetRequest = async (request, data, headers) => {
//   console.log("request,data, headers", request, data, headers);
//   try {
//     const res = await axios({
//       method: 'get',
//       // url: 'http://44.201.253.127:4000/api/'
//       url: BASE_URL + request,
//       data: data,
//       headers: headers
//     });
//     return res;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       // Token invalid or expired
//       Alert.alert('Session expired', 'Please log in again.');
//       await AsyncStorage.setItem('isLoggedIn', 'false');
//       if (navigationRef) {
//         navigationRef.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [{ name: 'Login' }],
//           })
//         );
//       }
//     }

//     return Promise.reject(error)
//   }

// }

// export const myAxiosPostRequest = async (request, data, headers) => {
//   console.log("request,data, headers", request, data, headers);
//   const res = await axios({
//     method: 'post',
//     // url: 'http://44.201.253.127:4000/api/'
//     url: BASE_URL + request,
//     data: data,
//     headers: headers
//   });
//   return res;
// }

// export const myAxiosPutRequest = async (request, data, headers) => {
//   console.log("request,data, headers", request, data, headers);
//   const res = await axios({
//     method: 'put',
//     // url: 'http://44.201.253.127:4000/api/'
//     url: BASE_URL + request,
//     data: data,
//     headers: headers
//   });
//   return res;
// }



import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';

let navigationRef = null;


export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

const BASE_URL = 'http://192.168.1.4:4000/api/';

const HARDCODED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWMzMDcwYTEwZWI1ZTY5YTFhYTZhZiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0OTIwNjY2OSwiZXhwIjoxNzQ5MjI0NjY5fQ.w7bLKt9LL4TM8ohSjSTmA_nFBJYvgUZGE8I6eyWG1QA';

const getAuthHeaders = (extraHeaders = {}) => ({
  Authorization: `Bearer ${HARDCODED_TOKEN}`,
  ...extraHeaders,
});

const handleAuthError = async (error) => {
  if (error.response && error.response.status === 401) {
    Alert.alert('Session expired', 'Please log in again.');
    await AsyncStorage.setItem('isLoggedIn', 'false');
    if (navigationRef) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
  }
};

export const myAxiosGetRequest = async (request, params = {}, headers = {}) => {
  try {
    const res = await axios.get(BASE_URL + request, {
      params, // query params go here
      headers: getAuthHeaders(headers),
    });
    return res;
  } catch (error) {
    await handleAuthError(error);
    return Promise.reject(error);
  }
};

export const myAxiosPostRequest = async (request, data = {}, headers = {}) => {
  try {
    const res = await axios.post(BASE_URL + request, data, {
      headers: getAuthHeaders(headers),
    });
    return res;
  } catch (error) {
    await handleAuthError(error);
    return Promise.reject(error);
  }
};

export const myAxiosPutRequest = async (request, data = {}, headers = {}) => {
  try {
    const res = await axios.put(BASE_URL + request, data, {
      headers: getAuthHeaders(headers),
    });
    return res;
  } catch (error) {
    await handleAuthError(error);
    return Promise.reject(error);
  }
};
