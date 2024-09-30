import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Slices} from '../../constants/Slices';
import {Purchase, Subscription} from 'react-native-iap';
import {SubscriptionResponseIOS} from '../../network/IAP';

interface SubscriptionSliceState {
  subscriptions: Subscription[];
  isActiveSubscription: boolean;
  activeSubscription?: SubscriptionResponseIOS;
  creditCount: number;
  isRemindMe: boolean;
  isRatingSubmit: boolean;
}

const initialState: SubscriptionSliceState = {
  subscriptions: [],
  isActiveSubscription: false,
  creditCount: 0,
  isRemindMe: false,
  isRatingSubmit: false,
};

export const subscriptionSlice = createSlice({
  name: Slices.auth,
  initialState,
  reducers: {
    updateCreditCount: (state, action: PayloadAction<number>) => {
      state.creditCount = action.payload;
    },
    updateSubscriptions: (state, action: PayloadAction<Subscription[]>) => {
      state.subscriptions = action.payload;
    },
    updateSubscriptionStatus: (
      state,
      action: PayloadAction<{
        isActive: boolean;
        subscription?: SubscriptionResponseIOS;
      }>,
    ) => {
      state.isActiveSubscription = action.payload.isActive;
      state.activeSubscription = action.payload.subscription;
    },
    updateRemindMe: (state, action: PayloadAction<boolean>) => {
      state.isRemindMe = action.payload;
    },
    updateRatingSubmission: (state, action: PayloadAction<boolean>) => {
      state.isRatingSubmit = action.payload;
    },
    clearSubscriptionSlice: () => initialState,
  },
});

export const {
  updateSubscriptions,
  updateSubscriptionStatus,
  updateCreditCount,
  updateRemindMe,
  updateRatingSubmission,
  clearSubscriptionSlice,
} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
