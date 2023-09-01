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
        reSendOtp: {
            requestType: 'post',
            url: '/user/resendOTP',
            responseInterface: []
        },
        otpVerify: {
            requestType: 'post',
            url: '/user/verifyOTP',
            responseInterface: []
        },
        resetPassword: {
            requestType: 'post',
            url: '/user/reset/password',
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