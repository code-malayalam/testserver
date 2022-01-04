const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

const APP_STATE = {
    CHECKING: 'CHECKING',
    LOGGED_OUT: 'LOGGED_OUT',
    LOGGED_IN: 'LOGGED_IN',
    REGISTERING: 'REGISTERING',
    BLOCKED: 'BLOCKED'
};

const getError = (message) => {
    return {
        status: ERROR,
        message
    };
};

const getSuccess = (obj) => {
    return {
        status: SUCCESS,
        ...obj
    };
};

const getResponse = (success = {}, error = 'Unknown Error', check = () => true) => {
    return check() ? getSuccess(success) : getError(error);
};

const getState = (otp) => {
    switch (otp) {
    case '0':
        return APP_STATE.BLOCKED;
    case '1':
        return APP_STATE.LOGGED_IN;
    default:
        return APP_STATE.REGISTERING;
    }
};

const obj = {
    getOtp: (data) => getResponse(
        {
            txnId: '12345'
        },
        'Something went wrong',
        () => data.phoneNumber !== '1111111111',
    ),
    login: (data) => getResponse(
        {
            userKey: 'UK12345678',
            appState: getState(data.otp)
        },
        'Invalid Otp',
        () => data.otp !== '11111',
    ),
    check: () => getResponse(
        {
            appState: APP_STATE.LOGGED_IN
        },
    ),
};

module.exports = obj;
