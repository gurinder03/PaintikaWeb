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
        },
        homeList: {
            requestType: 'post',
            url: '/home/category/list',
            responseInterface: []
        },
        relatedData: {
            requestType: 'post',
            url: '/home/related/list',
            responseInterface: []
        },
        productList: {
            requestType: 'post',
            url: '/home/list',
            responseInterface: []
        },
        addToCart: {
            requestType: 'post',
            url: '/cart/add',
            responseInterface: []
        },
        cartListData: {
            requestType: 'post',
            url: '/cart/list',
            responseInterface: []
        },
        removeToCart: {
            requestType: 'post',
            url: '/cart/remove',
            responseInterface: []
        },
        uploadPainting: {
            requestType: 'post',
            url: '/art/add',
            responseInterface: []
        },
        getSingleUser: {
            requestType: 'get',
            url: '/user/view/{{id}}',
            responseInterface: []
        },
        // Call All admin api's
        userList: {
            requestType: 'post',
            url: '/user/admin/list',
            responseInterface: []
        },
        adminCategoryList: {
            requestType: 'post',
            url: '/category/list',
            responseInterface: []
        },
        addCategroy: {
            requestType: 'post',
            url: '/category/add',
            responseInterface: []
        },
        singleViewCategory: {
            requestType: 'get',
            url: '/category/view/{{id}}',
            responseInterface: []
        },
        removeCategory: {
            requestType: 'delete',
            url: '/category/remove/{{id}}',
            responseInterface: []
        }
    },
    defaultDomain: environment.API_URL
};

export default api;