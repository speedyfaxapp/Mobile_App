import appleAuth from '@invertase/react-native-apple-authentication';

export const AppleLoginHelper = async () => {
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // Note: it appears putting FULL_NAME first is important, see issue #293
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        console.log("apple login response", appleAuthRequestResponse?.user)
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
            console.log("apple login response", credentialState)
            return appleAuthRequestResponse;
        }


        // const apple = await appleAuthAndroid.signIn();
    } catch (error) {
        console.log(error);
        return null;
    }
};