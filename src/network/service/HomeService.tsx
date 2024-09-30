import APIRequest from '../../models/interfaces/api/APIRequest';
import Toast from '../../utility/toast/Toast';
import APIManager from '../APIManager';
import Endpoints from '../Endpoints';
import History from '../../models/interfaces/HistoryResponce';
import {store} from '../../store/Store';
import {User} from '../../models/interfaces/api/response/OTPVerificationResponse';
import {removeLoggedInUser, saveLoggedInUser} from '../../utility/helper/user';
import {updateUser} from '../../store/slices/AuthSlice';
import {SubscriptionResponseIOS} from '../IAP';
import SharedPreference from '../../storage/SharedPreference';
import {updateSubscriptionStatus} from '../../store/slices/SubscriptionSlice';
import {Platform} from 'react-native';

export const sendNewFax = async (params: FormData) => {
  try {
    const request: APIRequest = {
      url: Endpoints.NewFax,
      method: 'POST',
      body: params,
      headers: {'Content-Type': 'multipart/form-data'},
    };
    const response = await APIManager.makeRequest<History[]>(request);
    return response;
  } catch (e) {
    console.log(e);
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const history = async () => {
  try {
    const userId = store.getState().auth.user?.txtUID ?? '';
    const request: APIRequest = {
      url: Endpoints.History + `/${userId}`,
      method: 'GET',
    };
    const response = await APIManager.makeRequest<History[]>(request);
    return response;
  } catch (e) {
    console.log(e);
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const faxDetails = async (params: {txtOrderNo: string | number}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.FaxDetails + `/${params.txtOrderNo}`,
      method: 'GET',
    };
    const response = await APIManager.makeRequest<History[]>(request);
    return response;
  } catch (e) {
    console.log(e);
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const resendFax = async (params: {
  txtOrderNo: string | number;
  txtDeviceId: string;
}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.ResendFax,
      method: 'POST',
      body: params,
    };
    const response = await APIManager.makeRequest<History[]>(request);
    return response;
  } catch (e) {
    console.log(e);
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const postPromoCode = async (params: {promoCode: string | number}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.postPromoCode,
      method: 'POST',
      body: params,
    };
    const response = await APIManager.makeRequest(request);
    console.log(response);

    return response;
  } catch (e) {
    console.log(e);

  }
};

export const settingProfile = async () => {
  try {
    const request: APIRequest = {
      url: Endpoints.SettingProfile,
      method: 'POST',
    };
    const response = await APIManager.makeRequest<History[]>(request);
    // updateLoginUser(response?.data);
    return response;
  } catch (e) {
    console.log(e);
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const deleteFax = async (params: {txtOrderNo: number}) => {
  try {
    const request: APIRequest = {
      url: Endpoints.DeleteFax + '/' + params.txtOrderNo,
      method: 'PUT',
      body: params,
    };

    const response = await APIManager.makeRequest<History[]>(request);
    return response;
  } catch (e) {
    console.log(e);
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const deleteAccount = async () => {
  try {
    const request: APIRequest = {
      url: Endpoints.DeleteAccount,
      method: 'PUT',
      body: {},
    };

    const response = await APIManager.makeRequest<History[]>(request);
    return response;
  } catch (e) {
    console.log(e);
    Toast.showToast((e as Error).message, 'Failure');
    throw e;
  }
};

export const userPlane = async () => {
  try {
    const request: APIRequest = {
      url: Endpoints.GetUserPlan,
      method: 'GET',
    };
    const response = await APIManager.makeRequest<History[]>(request);
    return response;
  } catch (e) {
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

export const updateSubscriptionOnServer = async (
  userId: any,
  receipt: string,
  planLocal: any,
  txtPaymentId: any,
  isEnabled: boolean,
  original_transaction_id: string,
) => {
  try {
    const request: APIRequest = {
      url: Endpoints.SubscribePlan,
      method: 'POST',
      body: {
        userId: userId,
        txtPlanId: planLocal,
        txtStatus: 'success',
        txtPaymentId: txtPaymentId,
        txtOriginalId: original_transaction_id,
        isFreeTrial: isEnabled ? 1 : 0,
        receipt_data: receipt,
        os: Platform.OS,
      },
    };
    const response = await APIManager.makeRequest<SubscriptionResponseIOS>(
      request,
    );
    await syncSubscriptionLocally(response.data);
    return response;
  } catch (e) {
    throw e;
  }
};
export const restorePurchaseOnServer = async (receipt: string ,purchaseHistory:any ,) => {
  try {
    const request: APIRequest = {
      url: Endpoints.RestorePlan,
      method: 'POST',
      body: {
        receipt_data: receipt,
        result1:purchaseHistory,
      
        os: Platform.OS,
        
      },
    };
    const response = await APIManager.makeRequest<SubscriptionResponseIOS>(
      request,
    );
    await syncSubscriptionLocally(response.data);
    return response;
  } catch (e) {
    throw e;
  }
};
export const fetchSubscriptionFromServer = async () => {
  try {
    const request: APIRequest = {
      url: Endpoints.CheckSubscriptionStatus,
    };
    const response = await APIManager.makeRequest<SubscriptionResponseIOS>(
      request,
    );
    await syncSubscriptionLocally(response.data);
    return response;
  } catch (e) {
    throw e;
  }
};

const syncSubscriptionLocally = async (data?: SubscriptionResponseIOS) => {
  if (data != null) {
    await SharedPreference.setItem('active_subscription', JSON.stringify(data));
  } else {
    await SharedPreference.removeItem('active_subscription');
  }
  store.dispatch(
    updateSubscriptionStatus({isActive: data != null, subscription: data}),
  );
};
