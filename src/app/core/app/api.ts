import { environment } from 'src/environments/environment';


const api = {
    endpoints: {
        login: {
            requestType: 'post',
            url: '/user/login',
            responseInterface: []
        },
        socialLogin: {
            requestType: 'post',
            url: '/user/social/login',
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
        addPreorder: {
            requestType: 'post',
            url: '/preorder/add',
            responseInterface: []
        },
        listPreorder: {
            requestType: 'post',
            url: '/preorder/list',
            responseInterface: []
        },
        checkoutOrder: {
            requestType: 'post',
            url: '/order/checkout',
            responseInterface: []
        },
        orderList: {
            requestType: 'post',
            url: '/order/user/list',
            responseInterface: []
        },
        addOrder: {
            requestType: 'post',
            url: '/order/add',
            responseInterface: []
        },
        delAddress: {
            requestType: 'post',
            url: '/address/add',
            responseInterface: []
        },
        delAddressList: {
            requestType: 'post',
            url: '/address/list',
            responseInterface: []
        },
        delAddressUpdate: {
            requestType: 'put',
            url: '/address/update/{{id}}',
            responseInterface: []
        },
        deleteAddress: {
            requestType: 'delete',
            url: '/address/remove/{{id}}',
            responseInterface: []
        },
        getSingleAddress: {
            requestType: 'get',
            url: '/address/view/{{id}}',
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
        userStatusUpdate: {
            requestType: 'put',
            url: '/user/admin/update/status/{{id}}',
            responseInterface: []
        },
        orderView: {
            requestType: 'get',
            url: '/order/view/{{id}}',
            responseInterface: []
        },
        updateUser: {
            requestType: 'post',
            url: '/user/update',
            responseInterface: []
        },      
        userPassChange: {
            requestType: 'post',
            url: '/user/change/password',
            responseInterface: []
        },      
        // Call All admin api's
        userList: {
            requestType: 'post',
            url: '/user/admin/list',
            responseInterface: []
        },
        adminLogin: {
            requestType: 'get',
            url: '/user/admin/login?passcode={{id}}',
            responseInterface: []
        },
        updateArtStatus: {
            requestType: 'put',
            url: '/art/admin/update/status/{{id}}',
            responseInterface: []
        },
        adminCategoryList: {
            requestType: 'post',
            url: '/category/list',
            responseInterface: []
        },
        adminSetting: {
            requestType: 'get',
            url: '/setting/view',
            responseInterface: []
        },
        updateAdminSetting: {
            requestType: 'post',
            url: '/setting/update',
            responseInterface: []
        },
        adminOrderList: {
            requestType: 'post',
            url: '/order/admin/user/list',
            responseInterface: []
        },
        artistOrderList: {
            requestType: 'post',
            url: '/order/admin/artist/list',
            responseInterface: []
        },
        orderArtView: {
            requestType: 'get',
            url: '/order/view/artist/{{id}}',
            responseInterface: []
        },
        adminArtList: {
            requestType: 'post',
            url: '/art/admin/list',
            responseInterface: []
        },
        adminArtView: {
            requestType: 'get',
            url: '/art/admin/view/{{id}}',
            responseInterface: []
        },
        adminUserView: {
            requestType: 'get',
            url: '/user/view/{{id}}',
            responseInterface: []
        },
        addCategroy: {
            requestType: 'post',
            url: '/category/add',
            responseInterface: []
        },
        updateCategroy: {
            requestType: 'post',
            url: '/category/update',
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