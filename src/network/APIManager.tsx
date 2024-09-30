import {ContinousBaseGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import APIRequest from '../models/interfaces/api/APIRequest';
import APIResponse from '../models/interfaces/api/response/APIResponse';
import {getLoggedInUserDetails} from '../utility/helper/user';
import ENV from './Env';

const defaultHeaders: Record<string, any> = {
  'Content-Type': 'application/json',
};

class APIManager {
  private constructor() {}

  private static isFormData = (data: object | undefined): data is FormData => {
    return (data as FormData)?.append !== undefined;
  };

  private static getFetchBody = (request: APIRequest) => {
    if (request.body == null) {
      return undefined;
    }
    return APIManager.isFormData(request.body)
      ? request.body
      : JSON.stringify(request.body);
  };

  static makeRequest = async <T,>(
    request: APIRequest,
    useDebug: boolean = true,
  ): Promise<APIResponse<T>> => {
    // Extract Data
    const method = request.method ?? 'GET';
    const body = APIManager.getFetchBody(request);

    //const url = `${ENV.BASE_URL}${request.url}`;
    const url = `http://64.227.130.159:5004${request.url}`;

    const headers = {...defaultHeaders, ...request.headers};
    try {
      const userInfo = await getLoggedInUserDetails();
      if (userInfo != null && userInfo.accessToken != null) {
        headers['authorization'] = 'Bearer ' + userInfo.accessToken;
      }
      // Fetch API Data
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
        signal: request.abort?.signal,
      });
      // Debug Handle
      const responseJson = await response.json();
      const responseData = responseJson as APIResponse<T>;
      if (useDebug) {
        this.printRequest({url, method, headers, body}, response, responseJson);
      }
      if (responseData.code != 200) {
        const errMsg =
          responseData.message ??
          (response.statusText.length > 0
            ? response.statusText
            : 'Unknown error');
        throw new Error(errMsg);
      }
      return responseData;
    } catch (error) {
      if (useDebug) {
        this.printRequest({url, method, headers, body});
      }
      throw error;
      // let isCancelled = error.message === 'Aborted';
      // if (!isCancelled) {
      //   throw error;
      // }
    }
  };

  static async printRequest(
    request: APIRequest,
    response?: Response,
    responseData?: any,
  ) {
    console.log('*****************************************************');
    // console.log('URL: ', request.url);
    // console.log('Method: ', request.method);
    // console.log('Headers: ', request.headers);
    // console.log('Body: ', request.body);
    if (response != null) {
      // console.log('Status Code: ', response?.status);
      // console.log('Response Json: ', responseData);
    }
    console.log('*****************************************************');
  }
}

export default APIManager;
