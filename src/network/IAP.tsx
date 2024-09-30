import {Alert, EmitterSubscription, Platform} from 'react-native';
import {
  getSubscriptions,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestSubscription,
  Subscription,
  finishTransaction,
  acknowledgePurchaseAndroid,
  getAvailablePurchases,
  validateReceiptIos,
  initConnection,
  clearTransactionIOS,
  Purchase,
  SubscriptionAndroid,
  clearProductsIOS,
  getReceiptIOS,
  getPendingPurchasesIOS,
  requestPurchase,
} from 'react-native-iap';
import {
  updateCreditCount,
  updateSubscriptionStatus,
  updateSubscriptions,
} from '../store/slices/SubscriptionSlice';
import {store} from '../store/Store';
import {
  updateSubscriptionOnServer,
  restorePurchaseOnServer,
} from './service/HomeService';

type ProductId =
  | 'com.reed.speedyfax.yearly'
  | 'com.reed.speedyfax.monthly'
  | 'com.reed.speedyfax.weekly';

interface Product {
  productId: ProductId;
  duration: number;
  title: string;
}

export const IAP_PRODUCTS: Product[] = Platform.select({
  ios: [
    {
      title: 'Yearly',
      productId: 'com.reed.speedyfax.yearly',
      duration: 365 * 24 * 60 * 60 * 1000,
    },
    {
      title: 'Monthly',
      productId: 'com.reed.speedyfax.monthly',
      duration: 30 * 24 * 60 * 60 * 1000,
    },
    {
      title: 'Weekly',
      productId: 'com.reed.speedyfax.weekly',
      duration: 7 * 24 * 60 * 60 * 1000,
    },
  ],
  android: [],
  default: [],
});

export interface SubscriptionResponseIOS {
  quantity: string;
  product_id: string;
  transaction_id: string;
  original_transaction_id: string;
  purchase_date: string;
  purchase_date_ms: string;
  purchase_date_pst: string;
  original_purchase_date: string;
  original_purchase_date_ms: string;
  original_purchase_date_pst: string;
  expires_date: string;
  expires_date_ms: string;
  expires_date_pst: string;
  web_order_line_item_id: string;
  is_trial_period: string;
  is_in_intro_offer_period: string;
  in_app_ownership_type: string;
}

class IAPManager {
  private purchaseUpdatedListener?: EmitterSubscription;
  private purchaseErrorListener?: EmitterSubscription;
  private timer?: NodeJS.Timeout;
  private lastTransactionRecipe?: string;

  private static _instance: IAPManager = new IAPManager();

  static get shared(): IAPManager {
    return IAPManager._instance;
  }

  private constructor() {}

  setup = async () => {
    if (Platform.OS == 'ios') {
      await clearProductsIOS();
      await clearTransactionIOS();
    }
    await initConnection();
    // this.isSubscriptionActive();
    this.fetchIAPSubscritions();
    // this.addListeners();
  };

  // Add listeners
  addListeners = async () => {
    if (this.purchaseUpdatedListener == null) {
      this.purchaseUpdatedListener = purchaseUpdatedListener(async purchase => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          if (this.lastTransactionRecipe === receipt) return;
          this.lastTransactionRecipe = receipt;
          console.log('IAP: purchaseUpdatedListener finishTransaction');
          try {
            if (Platform.OS == 'android' && purchase.purchaseToken != null) {
              await acknowledgePurchaseAndroid({
                token: purchase.purchaseToken,
              });
            }
            await finishTransaction({purchase: purchase});
            this.isSubscriptionActive();
          } catch (error) {}
        }
      });
      this.purchaseErrorListener = purchaseErrorListener(async error => {
        console.log('IAP: purchaseErrorListener: ', error);
      });
    }
  };

  isSubscriptionActive = async () => {
    let isSubValid = false;
    let lastAvailablePurchase: Purchase | undefined = undefined;
    if (Platform.OS === 'ios') {
      const availablePurchases = await getAvailablePurchases();
      const sortedAvailablePurchases = availablePurchases.sort(
        (a, b) => b.transactionDate - a.transactionDate,
      );
      if (sortedAvailablePurchases.length > 0) {
        lastAvailablePurchase = sortedAvailablePurchases[0];
        const latestAvailableReceipt = lastAvailablePurchase.transactionReceipt;
        const validReceipt = await this.validateReceipt(latestAvailableReceipt);
        console.log('IAP: latestReceiptInfo: ', validReceipt);
        isSubValid = !!validReceipt;
        if (isSubValid) {
          this.runSubscriptionTimer(Number(validReceipt?.expires_date_ms ?? 0));
        }
      }
    } else if (Platform.OS === 'android') {
      // When an active subscription expires, it does not show up in
      // available purchases anymore, therefore we can use the length
      // of the availablePurchases array to determine whether or not
      // they have an active subscription.
      const availablePurchases = await getAvailablePurchases();
      for (let i = 0; i < availablePurchases.length; i++) {
        const availablePurchase = availablePurchases[i];
        const purchasedProduct = IAP_PRODUCTS.find(
          i => i.productId == availablePurchase.productId,
        );
        if (purchasedProduct != null) {
          lastAvailablePurchase = availablePurchase;
          const transactionDate = new Date(
            availablePurchase.transactionDate,
          ).getTime();
          const expirationMillis = transactionDate + purchasedProduct.duration;
          this.runSubscriptionTimer(expirationMillis);
          isSubValid = true;
          break;
        }
      }
    }
    console.log(
      'IAP: Current Subscription: ',
      isSubValid ? 'Active' : 'InActive',
    );
    return isSubValid;
  };

  runSubscriptionTimer = (expirationMillis: number) => {
    const diff = Number(expirationMillis) - Date.now();
    console.log('IAP: Expiration Time: ', expirationMillis, diff);
    this.timer = setTimeout(() => this.isSubscriptionActive(), diff);
  };

  fetchIAPSubscritions = async () => {
    try {
      // const receipt = await getReceiptIOS({forceRefresh: false});
      // if (receipt) {
      //   const response = await this.validateReceipt(receipt);
      //   console.log(response);
      // }
      const skus = IAP_PRODUCTS.map(i => i.productId);
      const products: Subscription[] = await getSubscriptions({
        skus: skus,
      });
      console.log('Product fetched: ', products.length);
      store.dispatch(updateSubscriptions(products));
      return products;
    } catch (err) {
      console.warn(err);
    }
  };

  getOfferToken = (productId: string) => {
    if (Platform.OS == 'android') {
      const subscription = store.getState().subscription
        .subscriptions as SubscriptionAndroid[];
      const currentProduct = subscription.find(
        product => productId === product.productId,
      );
      return currentProduct?.subscriptionOfferDetails?.[0].offerToken;
    }
    return undefined;
  };

  validateReceipt = async (transactionReceipt?: string) => {
    const receipt = transactionReceipt ?? (await getReceiptIOS({}));
    if (receipt) {
      const decodedReceipt = await validateReceiptIos({
        receiptBody: {
          'receipt-data': receipt,
          password: '2e5f16bdb3ef45fe95d78edc895bf331',
        },
      });
      if (typeof decodedReceipt !== 'boolean') {
        const {
          latest_receipt: latest_receipt,
          latest_receipt_info: latestReceiptInfo,
          pending_renewal_info: pending_renewal_info,
          ...rest
        } = decodedReceipt;
        // console.log('Apple Response: ', latestReceiptInfo);
        // console.log('pending_renewal_info: ', pending_renewal_info);
        console.log(JSON.stringify(rest));
        const validReceipt = latestReceiptInfo?.find((receipt: any) => {
          const expirationInMilliseconds = Number(receipt.expires_date_ms);
          const nowInMilliseconds = Date.now();
          return expirationInMilliseconds > nowInMilliseconds;
        });
        return validReceipt;
      }
    }
  };

  requestSubscriptionIOS = async (sku: string, isEnabled: boolean) => {
    await clearTransactionIOS();
    const userId = store.getState().auth.user?.txtUID ?? 0;
    try {
      const response = await requestSubscription({
        sku: sku,
        appAccountToken: `${userId}`,
      });
      if (response && !Array.isArray(response) && response.transactionReceipt) {
        var planLocal = 2;
        if (sku == 'com.reed.speedyfax.weekly') {
          planLocal = 1;
        } else if (sku == 'com.reed.speedyfax.monthly') {
          planLocal = 2;
        } else {
          planLocal = 3;
        }
        await updateSubscriptionOnServer(
          userId,
          response.transactionReceipt,
          planLocal,
          response.transactionId,
          isEnabled,
          response.original_transaction_id,
        );
        await finishTransaction({purchase: response});
        return response.transactionReceipt;
      }
      throw Error('Receipt not found');
    } catch (error) {
      throw error;
    }
  };
  onPurchaseCredit = async (sku: string) => {
    const userId = store.getState().auth.user?.txtUID ?? 0;
    try {
      const response = await requestPurchase({
        sku: sku,
        appAccountToken: `${userId}`,
      });
      if (response && !Array.isArray(response) && response.transactionReceipt) {
        await finishTransaction({purchase: response});
        return response.transactionReceipt;
      }
      throw Error('Receipt not found');
    } catch (error) {
      throw error;
    }
  };
  restorePurchase = async () => {
    try {
      const receipt = await getReceiptIOS({forceRefresh: true});
      if (receipt) {
        const response = await restorePurchaseOnServer(receipt);
        store.dispatch(updateCreditCount(parseInt(response?.data)));
        return response;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  };
}

export default IAPManager;
