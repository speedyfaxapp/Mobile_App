export type LoginType = 'fb' | 'google' | 'apple' | '';

export interface User {
  txtAttachEmailToFax: string;
  txtCreditUpdate: number;
  txtDateAdded: string;
  txtDeviceId: string;
  txtEmail: string;
  txtEmailNotification: string;
  txtFreeCredit: string;
  txtLoginType: LoginType | null;
  txtName: string | null;
  txtOtp: number | null;
  txtOtpVerify: number | null;
  txtPassword: string;
  txtPhone: string | null;
  txtPushNotification: string;
  txtRole: string;
  txtSocialMediaId: string | null;
  txtStatus: string;
  txtTotalCredit: string | null;
  txtUID: number;
  accessToken: string;
}
