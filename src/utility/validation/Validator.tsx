class Validator {
  private constructor() {}

  static isValidMobileNumber = (mobileNumber?: string): boolean => {
    const regex = new RegExp(/^[0-9]{10}$/);
    return regex.test(mobileNumber ?? '');
  };

  static isValidEmail = (email?: string): boolean => {
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return regex.test(email ?? '');
  };

  static isValidName = (name?: string): boolean => {
    const regex = new RegExp(/^.{5,}$/);
    return regex.test(name ?? '');
  };

  static isValidAddress = (adderss?: string): boolean => {
    const regex = new RegExp(/^.{5,}$/);
    return regex.test(adderss ?? '');
  };

  static isValidPincode = (pincode?: string): boolean => {
    const regex = new RegExp(/^[1-9][0-9]{5}$/);
    return regex.test(pincode ?? '');
  };

  static isValidAccount = (account?: string): boolean => {
    const regex = new RegExp(/^[0-9]{10,16}$/);
    return regex.test(account ?? '');
  };

  static isValidAmount = (amount?: string): boolean => {
    const tempAmount = amount ?? '';
    const decimalCount = tempAmount.split('.').length - 1;
    if (decimalCount > 1) {
      return false;
    }
    const regex = new RegExp(/(?:\d*\.\d{1,2}|\d+)$/);
    return regex.test(tempAmount);
  };

  static isValidIBAN = (ibanNumber?: string): boolean => {
    const regex = new RegExp(/^.{10,16}$/);
    return regex.test(ibanNumber ?? '');
  };

  static isValidPassword = (password?: string): boolean => {
    const regex = new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    );
    return regex.test(password ?? '');
  };
}

export default Validator;
