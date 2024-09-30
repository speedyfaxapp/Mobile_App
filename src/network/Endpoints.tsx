enum Endpoints {
  Login = '/api/user/userLoginWithMobileEmail',
  LoginWithSocilMedia = '/api/user/userLoginWithSocialMedia',
  ChangePassword = '/api/user/changePassword',
  ForgetPasswordOtp = '/api/user/forgetPasswordOtp',
  LoginOtpVerify = '/api/user/loginOtpVerify',
  ResetPassword = '/api/user/updatePassword',
  NewFax = '/api/fax/pamfax_api',
  History = '/api/fax/getfaxalldata',
  FaxDetails = '/api/fax/getfaxdata',
  ResendFax = '/api/fax/resendFax',
  SettingProfile = '/api/user/profile',
  DeleteFax = '/api/fax/deleteFax',
  DeleteAccount = '/api/user/deleteMyAccount',
  GetUserPlan = '/api/payment/getUserPlan',
  // SubscribePlan = '/api/payment/appPurchasePlan',
  SubscribePlan = '/api/payment/addSubscriptionPlan',
  RestorePlan = '/api/payment/restorePlan',
  // CheckSubscriptionStatus = '/api/payment/checkPurchasePlan',
  CheckSubscriptionStatus = '/api/payment/getUserPlan',
  postPromoCode = '/api/user/redeemPromoCode',
}

export default Endpoints;
