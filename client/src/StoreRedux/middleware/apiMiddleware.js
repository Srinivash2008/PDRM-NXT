// middleware/apiMiddleware.js
import axios from 'axios';
import * as API from '../constants/actionTypes';
import { jwtDecode } from 'jwt-decode';

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);

    if (action.type === API.API) {
        const { url, method, data, onSuccess, onError, label, headers, params } = action.payload;
        const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

        // Pre-checks (handle asynchronously)
        preApiCallCheck({ url, method, params })
            .then(() => {
                const token = sessionStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decoded.exp < currentTime) {
                        dispatch({ type: 'LOGOUT' });
                        dispatch(API.setLoading(params?.page, params?.loading, false))
                        dispatch(API.showNotification({ type: 'error', message: "Token has expired" }));
                        return;
                    }
                }

                // dispatch({ type: `${label}_START` });

                return axios({
                    url,
                    method,
                    [dataOrParams]: data,
                    headers: headers || {},
                    params: params,
                });
            })
            .then((response) => {

                if (response?.data?.success) {
                    dispatch(onSuccess(response?.data));
                } else {
                    if (response) {
                        dispatch(onError(response?.data));
                    }

                }
            })
            .catch((error) => {
                dispatch(onError({ message: error?.message, ...params }));
            });
    }
};

// Pre-check function for API calls
const preApiCallCheck = async ({ url, method, params }) => {
    // Check URL validity
    if (!url || typeof url !== 'string') {
        throw new Error('Invalid API URL.');
    }

    // Validate method
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!validMethods.includes(method)) {
        throw new Error('Invalid HTTP method.');
    }

    // Validate params for GET and DELETE methods
    if (['GET', 'DELETE'].includes(method) && params) {
        if (typeof params !== 'object') {
            throw new Error('Params must be an object for GET/DELETE requests.');
        }
    }

    // Health check
    await checkServerAvailability(url, method);
};

// Check server availability
const checkServerAvailability = async (url, method) => {
    const healthCheckUrl = `${import.meta.env.VITE_SOCKET_URL}/health?url=${url}&method=${method}`; // Assuming there's a health endpoint
    try {
        await axios.head(healthCheckUrl);
    } catch (error) {
        throw new Error('Server is unavailable.');
    }
};

// Handle errors
const handleError = (error, params) => {
    console.log(error.message, "erorrrrrrrrrr");
    console.log(params, "params")

    // if (error?.response) {
    //     return error?.response?.data?.message || 'An error occurred';
    // } else if (error?.request) {
    //     return 'No response from server';
    // }
    // return error?.message || 'Request setup error';
};

export default apiMiddleware;
