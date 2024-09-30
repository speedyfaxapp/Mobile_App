import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import ENV from '../../network/Env';
import SharedPreference from '../../storage/SharedPreference';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {removeLoggedInUser} from '../helper/user';

interface AppleCredentialsProps {
  userFirstName: string | null | undefined;
  userLastName: string | null | undefined;
  userEmail: string;
  identityToken: string;
}
class SocialLogin {
  public static configure = () => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'android'
          ? ENV.WEB_CLIENT_ID_ANDROID
          : ENV.WEB_CLIENT_ID_IOS,
    });
  };

  public static loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);

      return result;
    } catch (error) {
      throw error;
    }
  };

  public static firebaseSignOut = async () => {
    try {
      await removeLoggedInUser();
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser != null) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      if (auth().currentUser != null) {
        await auth().signOut();
      }
    } catch (error) {
      throw error;
    }
  };

  public static appleLogin = async () => {
    return Platform.select({
      ios: SocialLogin.iosAppleLogin(),
      android: SocialLogin.androidAppleLogin(),
    });
  };
  public static iosAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }
      if (typeof appleAuthRequestResponse.email === 'string') {
        const appleProps: AppleCredentialsProps = {
          userFirstName: appleAuthRequestResponse.fullName?.givenName,
          userLastName: appleAuthRequestResponse.fullName?.familyName,
          userEmail: appleAuthRequestResponse.email,
          identityToken: appleAuthRequestResponse.identityToken,
        };
        await SharedPreference.setItem(
          'apple_login',
          JSON.stringify(appleProps),
        );
      }
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      const res = await auth().signInWithCredential(appleCredential);
      return res;
    } catch (error) {
      throw error;
    }
  };

  public static androidAppleLogin = async () => {
    // Generate secure, random values for state and nonce

    // Configure the request
    console.log('isSupported', appleAuth.isSupported);
    appleAuthAndroid.configure({
      clientId: 'THE SAME SERVICE ID AS APPLE DEV AND FIREBASE CONSOLE',
      redirectUri: 'THIS IS THE SAME AS APPLE DEV CONSOLE',
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      nonce: 'rawNonce',
      state: 'state',
    });
    const response = await appleAuthAndroid.signIn();
    if (response.state === 'state') {
      const credentials = auth.AppleAuthProvider.credential(
        // response.id_token,
        'rawNonce', // Passing the rawNonce here do the trick.
      );
      return auth().signInWithCredential(credentials);
    }
  };
}

export default SocialLogin;
