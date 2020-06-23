export function updateProfileRequest(data) {
  return { type: '@user/UPDATE_PROFILE_REQUEST', payload: { data } };
}

export function updateProfileSuccess(profile) {
  return { type: '@user/UPDATE_PROFILE_SUCCESS', payload: { profile } };
}

export function updateProfileFailure() {
  return { type: '@user/UPDATE_PROFILE_FAILURE' };
}

export function hideTabBar() {
  return { type: '@user/HIDE_TAB_BAR' };
}

export function showTabBar() {
  return { type: '@user/SHOW_TAB_BAR' };
}
