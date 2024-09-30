import SharedPreference from '../../storage/SharedPreference';

export async function isUserLoggedIn() {
  const userDetails = await SharedPreference.getItem<
    Record<string, string> | undefined
  >('user');
  if (userDetails == null) {
    return false;
  } else {
    return true;
  }
}

export async function getLoggedInUserDetails() {
  const userDetails = await SharedPreference.getItem<
    Record<string, string> | undefined
  >('user');
  return userDetails;
}

export async function saveLoggedInUser(userInfo?: string | {}) {
  if (userInfo == null) {
    return;
  }
  await SharedPreference.setItem(
    'user',
    typeof userInfo == 'string' ? userInfo : JSON.stringify(userInfo),
  );
}

export async function removeLoggedInUser() {
  await SharedPreference.removeItem('user');
}
