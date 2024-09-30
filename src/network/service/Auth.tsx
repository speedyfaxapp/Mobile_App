import APIRequest from '../../models/interfaces/api/APIRequest';
import Toast from '../../utility/toast/Toast';
import APIManager from '../APIManager';
import Endpoints from '../Endpoints';
import LoginResponse from '../../models/interfaces/api/response/LoginResponse';
import SharedPreference from '../../storage/SharedPreference';
import {store} from '../../store/Store';
import {updateUser} from '../../store/slices/AuthSlice';
import {User} from '../../models/interfaces/api/response/OTPVerificationResponse';
import ForgotPasswordResponse from '../../models/interfaces/api/response/ForgotPasswordResponse';
import {removeLoggedInUser, saveLoggedInUser} from '../../utility/helper/user';
import {fetchSubscriptionFromServer} from './HomeService';

export const loginAccount = async (params: {
  username: string;
  password: string;
  txtDeviceId: string;
}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.Login,
      method: 'POST',
      body: params,
    };
    const response = await APIManager.makeRequest<LoginResponse>(request);
    return response;
  } catch (e) {
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const loginWithSocilMedia = async (prem: {
  txtDeviceId: string;
  email: string;
  type: string;
  social_media_id: string;
  fcm_token: string;
}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.LoginWithSocilMedia,
      method: 'POST',
      body: prem,
    };
    console.log('url========>>>', request.url);

    const response = await APIManager.makeRequest<User>(request);
    console.log(response);
    const user = response.data;
    if (user != null) {
      // Use a callback to update the store before resolving the promise
      await new Promise<void>(resolve => {
        // Update the store and resolve the promise when done
        store.dispatch(updateUser(user));
        resolve();
      });

      // Continue with other asynchronous tasks
      await SharedPreference.setItem('user', JSON.stringify(response.data));
      await fetchSubscriptionFromServer();
    }
    return response;
  } catch (e) {
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const forgotPassword = async (params: {username: string}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.ForgetPasswordOtp,
      method: 'POST',
      body: params,
    };
    const response = await APIManager.makeRequest<ForgotPasswordResponse>(
      request,
    );
    return response;
  } catch (e) {
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const otpVerification = async (params: {
  txtDeviceId: string;
  username: string;
  password?: string;
  txtTotalCredit: string | null;
}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.LoginOtpVerify,
      method: 'POST',
      body: params,
    };
    const response = await APIManager.makeRequest<User>(request);
    const user = response.data;
    if (user != null) {
      await SharedPreference.setItem('user', JSON.stringify(response.data));
      store.dispatch(updateUser(user));
      await fetchSubscriptionFromServer();
    }
    return response;
  } catch (e) {
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const resetPassword = async (params: {
  user_id: number;
  password: string;
}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.ResetPassword,
      method: 'POST',
      body: params,
    };
    const response = await APIManager.makeRequest<User>(request);
    const user = response.data;
    updateLoginUser(user);
    // if (user != null) {
    //   await SharedPreference.setItem('user', JSON.stringify(response.data));
    //   store.dispatch(updateUser(user));
    // }
    return response;
  } catch (e) {
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const changesPassword = async (params: {
  new_password: string;
  old_password: string;
  // userId: string;
}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.ChangePassword,
      method: 'PUT',
      body: params,
    };
    const response = await APIManager.makeRequest<User>(request);
    return response;
  } catch (e) {
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

const updateLoginUser = async (data: User | undefined) => {
  if (data == null) {
    await removeLoggedInUser();
  } else {
    await saveLoggedInUser(data);
  }
  store.dispatch(updateUser(data));
};
