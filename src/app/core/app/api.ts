import { environment } from 'src/environments/environment';


const api = {
    endpoints: {
        login: {
            requestType: 'post',
            url: '/user/login',
            responseInterface: []
        },
        sendOtp: {
            requestType: 'post',
            url: '/user/forgot/password',
            responseInterface: []
        },
        userSignup: {
            requestType: 'post',
            url: '/user/signup',
            responseInterface: []
        }
    },
    defaultDomain: environment.API_URL
};

export default api;